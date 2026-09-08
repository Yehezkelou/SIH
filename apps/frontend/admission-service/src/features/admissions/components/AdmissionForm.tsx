'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    BedDouble,
    User,
    CalendarClock,
    Stethoscope,
    Users,
    CreditCard,
    Plus,
    Trash2,
    MapPin,
    NotebookTabs,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { FormAlert } from '@/components/ui/FormAlert';
import { useUser } from '@/hooks/useUser';
import { ROUTES } from '@/config/routes';
import type { Patient } from '@/features/patients/schema';
import {
    AdmissionStatus,
    AdmissionType,
    CompanionDraft,
    CreateAdmissionInput,
    EncounterStatus,
    PayerDraft,
    Relationship,
    AdmissionPayerType,
} from '../schema';
import { useCreateAdmission } from '../hooks/useAdmissions';
import {
    ADMISSION_STATUS,
    ADMISSION_TYPE,
    ENCOUNTER_STATUS,
    PAYER_TYPE,
    RELATIONSHIP,
    toIso,
} from '../utils/admissionHelpers';
import { parseApiError } from '../utils/parseApiError';
import { PatientPicker } from './PatientPicker';

const emptyCompanion: CompanionDraft = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    relationship: 'OTHER',
    address: '',
};

const emptyPayer: PayerDraft = {
    name: '',
    payerType: 'INSURANCE',
    policyNumber: '',
    coveragePercentage: 100,
    coverageLimit: 0,
    validUntil: '',
};

// Le backend n'ouvre un séjour que pour ces statuts (cf. repository).
const needsEncounter = (s: AdmissionStatus) => s === 'ADMITTED' || s === 'REGISTERED';

function SectionCard({
    icon: Icon,
    title,
    subtitle,
    action,
    children,
}: {
    icon: typeof BedDouble;
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-surface border border-border/8 rounded-2xl shadow-xs overflow-hidden">
            <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-border/8">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary border border-border/8 flex items-center justify-center shrink-0">
                        <Icon size={16} />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-surface-text">{title}</h3>
                        {subtitle && <p className="text-[11px] text-muted">{subtitle}</p>}
                    </div>
                </div>
                {action}
            </div>
            <div className="p-5">{children}</div>
        </div>
    );
}

export function AdmissionForm() {
    const router = useRouter();
    const { data: user } = useUser();
    const mutation = useCreateAdmission();

    const [patient, setPatient] = useState<Patient | null>(null);
    const [type, setType] = useState<AdmissionType | ''>('');
    const [status, setStatus] = useState<AdmissionStatus>('PENDING');
    const [reason, setReason] = useState('');
    const [admissionDate, setAdmissionDate] = useState('');
    const [expectedDischarge, setExpectedDischarge] = useState('');
    const [doctorId, setDoctorId] = useState('');

    const [encounterStatus, setEncounterStatus] = useState<EncounterStatus>('ENCOUNTER_PENDING');
    const [departmentId, setDepartmentId] = useState('');
    const [roomId, setRoomId] = useState('');
    const [bedId, setBedId] = useState('');

    const [companions, setCompanions] = useState<CompanionDraft[]>([]);
    const [payers, setPayers] = useState<PayerDraft[]>([]);

    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const setCompanion = (i: number, patch: Partial<CompanionDraft>) =>
        setCompanions((prev) => prev.map((c, idx) => (idx === i ? { ...c, ...patch } : c)));
    const setPayer = (i: number, patch: Partial<PayerDraft>) =>
        setPayers((prev) => prev.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setFieldErrors({});

        const errs: Record<string, string> = {};
        if (!patient) errs.patient = 'Sélectionnez un patient.';
        if (!type) errs.admissionType = "Le type d'admission est requis.";

        // Lignes accompagnants : ignorer les vides, valider les partielles.
        const cleanCompanions = companions.filter(
            (c) => c.firstName || c.lastName || c.phoneNumber || c.address
        );
        cleanCompanions.forEach((c, i) => {
            if (!c.firstName || !c.lastName || !c.phoneNumber || !c.address)
                errs[`companion_${i}`] = 'Renseignez tous les champs de cet accompagnant.';
        });

        const cleanPayers = payers.filter((p) => p.name || p.policyNumber);
        cleanPayers.forEach((p, i) => {
            if (!p.name || !p.policyNumber || !p.validUntil)
                errs[`payer_${i}`] = 'Nom, n° de police et date de validité sont requis.';
        });

        if (Object.keys(errs).length > 0) {
            setFieldErrors(errs);
            setError('Certaines informations sont manquantes ou invalides.');
            return;
        }

        const payload: CreateAdmissionInput = {
            patientId: patient!.id,
            numeroPatient: patient!.uniquePatientId,
            admission: {
                admissionType: type as AdmissionType,
                admissionStatus: status,
                doctorId: doctorId.trim() || undefined,
                reason: reason.trim() || undefined,
                admissionDate: toIso(admissionDate),
                expectedDischarge: toIso(expectedDischarge),
            },
            companions: cleanCompanions.length ? cleanCompanions : undefined,
            payers: cleanPayers.length
                ? cleanPayers.map((p) => ({
                      ...p,
                      coveragePercentage: Number(p.coveragePercentage) || 0,
                      coverageLimit: Number(p.coverageLimit) || 0,
                  }))
                : undefined,
            encouter: needsEncounter(status)
                ? {
                      encouterStatus: encounterStatus,
                      currentDepartementId: departmentId.trim() || undefined,
                      currentRoomId: roomId.trim() || undefined,
                      currentBedId: bedId.trim() || undefined,
                  }
                : undefined,
            createdBy: user?.id ?? '',
        };

        try {
            const created = await mutation.mutateAsync(payload);
            router.push(ROUTES.ADMISSION_DETAIL(created.id, created.admissionNumber));
        } catch (err) {
            const parsed = parseApiError(err);
            setError(parsed.globalMessage);
            setFieldErrors((prev) => ({ ...prev, ...parsed.fieldErrors }));
        }
    };

    return (
        <form onSubmit={submit} className="space-y-5">
            <FormAlert variant="danger" message={error} onClose={() => setError(null)} />

            <SectionCard icon={User} title="Patient" subtitle="Dossier concerné par l'admission">
                <PatientPicker selected={patient} onSelect={setPatient} error={fieldErrors.patient} />
            </SectionCard>

            <SectionCard icon={BedDouble} title="Admission" subtitle="Type, statut et motif de la venue">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                        label="Type d'admission"
                        required
                        icon={Stethoscope}
                        value={type}
                        error={fieldErrors.admissionType}
                        onChange={(e) => setType(e.target.value as AdmissionType)}
                    >
                        <option value="">Sélectionner…</option>
                        {ADMISSION_TYPE.map((t) => (
                            <option key={t.value} value={t.value}>
                                {t.label}
                            </option>
                        ))}
                    </Select>

                    <Select
                        label="Statut initial"
                        value={status}
                        onChange={(e) => setStatus(e.target.value as AdmissionStatus)}
                    >
                        {ADMISSION_STATUS.filter((s) =>
                            ['PENDING', 'PRE_ADMITTED', 'REGISTERED', 'ADMITTED'].includes(s.value)
                        ).map((s) => (
                            <option key={s.value} value={s.value}>
                                {s.label}
                            </option>
                        ))}
                    </Select>

                    <Input
                        label="Date d'admission prévue"
                        type="datetime-local"
                        icon={CalendarClock}
                        value={admissionDate}
                        onChange={(e) => setAdmissionDate(e.target.value)}
                    />
                    <Input
                        label="Sortie prévisionnelle"
                        type="datetime-local"
                        icon={CalendarClock}
                        value={expectedDischarge}
                        onChange={(e) => setExpectedDischarge(e.target.value)}
                    />

                    <Input
                        label="Médecin (UUID personnel)"
                        icon={Stethoscope}
                        placeholder="Optionnel"
                        value={doctorId}
                        error={fieldErrors.doctorId}
                        onChange={(e) => setDoctorId(e.target.value)}
                    />
                </div>

                <div className="mt-4 space-y-1.5">
                    <label className="text-xs font-semibold text-surface-text">Motif de l'admission</label>
                    <textarea
                        rows={2}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Motif clinique ou administratif…"
                        className="w-full py-2.5 px-3.5 text-xs bg-page rounded-xl text-surface-text placeholder:text-muted/70 border border-border/8 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                    />
                </div>
            </SectionCard>

            {needsEncounter(status) && (
                <SectionCard
                    icon={MapPin}
                    title="Séjour & localisation"
                    subtitle="Un séjour est ouvert automatiquement pour ce statut"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Select
                            label="Statut du séjour"
                            value={encounterStatus}
                            onChange={(e) => setEncounterStatus(e.target.value as EncounterStatus)}
                        >
                            {ENCOUNTER_STATUS.map((s) => (
                                <option key={s.value} value={s.value}>
                                    {s.label}
                                </option>
                            ))}
                        </Select>
                        <Input label="Département (UUID)" placeholder="Optionnel" value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} />
                        <Input label="Chambre (UUID)" placeholder="Optionnel" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
                        <Input label="Lit (UUID)" placeholder="Optionnel" value={bedId} onChange={(e) => setBedId(e.target.value)} />
                    </div>
                </SectionCard>
            )}

            <SectionCard
                icon={Users}
                title="Accompagnants"
                subtitle="Proches à contacter"
                action={
                    <Button type="button" variant="secondary" size="sm" icon={Plus} onClick={() => setCompanions((p) => [...p, { ...emptyCompanion }])}>
                        Ajouter
                    </Button>
                }
            >
                {companions.length === 0 ? (
                    <p className="text-xs text-muted">Aucun accompagnant. Cliquez sur « Ajouter » pour en déclarer un.</p>
                ) : (
                    <div className="space-y-4">
                        {companions.map((c, i) => (
                            <div key={i} className="rounded-xl border border-border/8 p-4 bg-page/40 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-semibold text-muted uppercase tracking-wide">
                                        Accompagnant {i + 1}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setCompanions((p) => p.filter((_, idx) => idx !== i))}
                                        className="p-1 rounded-lg text-muted hover:text-danger-text hover:bg-danger/10 transition-colors cursor-pointer"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <Input label="Prénom" value={c.firstName} onChange={(e) => setCompanion(i, { firstName: e.target.value })} />
                                    <Input label="Nom" value={c.lastName} onChange={(e) => setCompanion(i, { lastName: e.target.value })} />
                                    <Input label="Téléphone" value={c.phoneNumber} onChange={(e) => setCompanion(i, { phoneNumber: e.target.value })} />
                                    <Select
                                        label="Lien de parenté"
                                        value={c.relationship}
                                        onChange={(e) => setCompanion(i, { relationship: e.target.value as Relationship })}
                                    >
                                        {RELATIONSHIP.map((r) => (
                                            <option key={r.value} value={r.value}>
                                                {r.label}
                                            </option>
                                        ))}
                                    </Select>
                                    <div className="md:col-span-2">
                                        <Input label="Adresse" value={c.address} onChange={(e) => setCompanion(i, { address: e.target.value })} />
                                    </div>
                                </div>
                                {fieldErrors[`companion_${i}`] && (
                                    <p className="text-[11px] text-danger">{fieldErrors[`companion_${i}`]}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </SectionCard>

            <SectionCard
                icon={CreditCard}
                title="Prise en charge & payeurs"
                subtitle="Assurances et garants"
                action={
                    <Button type="button" variant="secondary" size="sm" icon={Plus} onClick={() => setPayers((p) => [...p, { ...emptyPayer }])}>
                        Ajouter
                    </Button>
                }
            >
                {payers.length === 0 ? (
                    <p className="text-xs text-muted">Aucun payeur déclaré.</p>
                ) : (
                    <div className="space-y-4">
                        {payers.map((p, i) => (
                            <div key={i} className="rounded-xl border border-border/8 p-4 bg-page/40 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-semibold text-muted uppercase tracking-wide">Payeur {i + 1}</span>
                                    <button
                                        type="button"
                                        onClick={() => setPayers((prev) => prev.filter((_, idx) => idx !== i))}
                                        className="p-1 rounded-lg text-muted hover:text-danger-text hover:bg-danger/10 transition-colors cursor-pointer"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <Input label="Nom / assurance" value={p.name} onChange={(e) => setPayer(i, { name: e.target.value })} />
                                    <Select
                                        label="Type de payeur"
                                        value={p.payerType}
                                        onChange={(e) => setPayer(i, { payerType: e.target.value as AdmissionPayerType })}
                                    >
                                        {PAYER_TYPE.map((t) => (
                                            <option key={t.value} value={t.value}>
                                                {t.label}
                                            </option>
                                        ))}
                                    </Select>
                                    <Input label="N° de police" value={p.policyNumber} onChange={(e) => setPayer(i, { policyNumber: e.target.value })} />
                                    <Input
                                        label="Couverture (%)"
                                        type="number"
                                        min={0}
                                        max={100}
                                        value={p.coveragePercentage}
                                        onChange={(e) => setPayer(i, { coveragePercentage: Number(e.target.value) })}
                                    />
                                    <Input
                                        label="Plafond de couverture"
                                        type="number"
                                        min={0}
                                        value={p.coverageLimit}
                                        onChange={(e) => setPayer(i, { coverageLimit: Number(e.target.value) })}
                                    />
                                    <Input label="Valide jusqu'au" type="date" value={p.validUntil} onChange={(e) => setPayer(i, { validUntil: e.target.value })} />
                                </div>
                                {fieldErrors[`payer_${i}`] && (
                                    <p className="text-[11px] text-danger">{fieldErrors[`payer_${i}`]}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </SectionCard>

            <div className="flex items-center justify-between gap-3 pt-1">
                <p className="text-[11px] text-muted flex items-center gap-1.5">
                    <NotebookTabs size={13} />
                    Les documents s'ajoutent depuis la fiche après création.
                </p>
                <div className="flex items-center gap-2">
                    <Button type="button" variant="secondary" onClick={() => router.push(ROUTES.ADMISSIONS)}>
                        Annuler
                    </Button>
                    <Button type="submit" variant="primary" icon={BedDouble} isLoading={mutation.isPending}>
                        Créer l'admission
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default AdmissionForm;
