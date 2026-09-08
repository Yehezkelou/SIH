'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Siren, TriangleAlert, Clock } from 'lucide-react';
import { useCreatePatientProvisoire } from '../hooks/usePatients';
import {
    CreatePatientProvisoirInput,
    Genre,
    MOTIFS_DOSSIER_PROVISOIRE,
    MotifDossierProvisoire,
} from '../schema';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { FormAlert } from '@/components/ui/FormAlert';
import { useUser } from '@/hooks/useUser';
import { ROUTES } from '@/config/routes';

const DELAI_HEURES = 48;

export function PatientProvisoireForm() {
    const router = useRouter();
    const { data: currentUser } = useUser();
    const createMutation = useCreatePatientProvisoire();

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [age, setAge] = useState('');
    const [genre, setGenre] = useState<Genre>('M');
    const [motif, setMotif] = useState<MotifDossierProvisoire | ''>('');
    const [serviceCreation, setServiceCreation] = useState('');
    const [signalement, setSignalement] = useState('');
    const [numero, setNumero] = useState('');
    const [contactUrgence, setContactUrgence] = useState('');

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [serverError, setServerError] = useState<string | null>(null);

    const validate = () => {
        const next: Record<string, string> = {};
        if (!motif) next.motif = "Le motif d'ouverture est obligatoire : il justifie l'absence d'identité complète.";
        if (!signalement.trim() && (!nom.trim() || !prenom.trim())) {
            next.signalement =
                "Sans nom ni prénom, un signalement est indispensable pour retrouver le patient (vêtements, lieu, circonstances).";
        }
        if (age && (Number(age) < 0 || Number(age) > 130)) next.age = 'Âge invalide.';
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setServerError(null);

        if (!currentUser?.id) {
            setServerError("Votre session n'est pas identifiée : impossible de tracer l'auteur du dossier.");
            return;
        }
        if (!validate()) return;

        // Les champs d'identité laissés vides sont omis : le serveur applique
        // alors ses valeurs par défaut (PATIENT-NOM-X, etc.) plutôt que de
        // recevoir des chaînes vides qui masqueraient l'anonymat du dossier.
        const payload: CreatePatientProvisoirInput = {
            identity: {
                ...(nom.trim() && { nom: nom.trim() }),
                ...(prenom.trim() && { prenom: prenom.trim() }),
                ...(age && { age: Number(age) }),
                genre,
            },
            urgence: {
                motifProvisoir: motif as MotifDossierProvisoire,
                ...(serviceCreation.trim() && { serviceCreation: serviceCreation.trim() }),
                ...(signalement.trim() && { signalement: signalement.trim() }),
            },
            ...((numero.trim() || contactUrgence.trim()) && {
                contact: {
                    ...(numero.trim() && { numero: numero.trim() }),
                    ...(contactUrgence.trim() && { contactUrgence: contactUrgence.trim() }),
                },
            }),
            createdBy: currentUser.id,
        };

        try {
            const response = await createMutation.mutateAsync(payload);
            const created = response.data;
            router.push(
                created?.uniquePatientId
                    ? ROUTES.PATIENT_DETAIL(created.uniquePatientId)
                    : ROUTES.PATIENTS
            );
        } catch (err) {
            const response = (err as { response?: { data?: { message?: string } } }).response;
            setServerError(
                response?.data?.message ||
                    (err as Error).message ||
                    "L'ouverture du dossier provisoire a échoué."
            );
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <FormAlert variant="danger" message={serverError} onClose={() => setServerError(null)} />

            {/* Rappel du cadre : un dossier provisoire est une dérogation encadrée */}
            <div className="flex items-start gap-2.5 p-4 rounded-2xl bg-warning/10 border border-warning/20 text-warning-text">
                <TriangleAlert size={16} className="shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                    <p className="font-bold text-xs mb-0.5">Dossier d’identité incomplète</p>
                    <p>
                        Réservé aux situations où l’identité ne peut pas être établie à l’admission.
                        Le dossier reçoit un NDPU provisoire (préfixe <span className="font-mono">PPI</span>)
                        et devra être régularisé.
                    </p>
                    <p className="inline-flex items-center gap-1 mt-1.5 font-semibold">
                        <Clock size={11} />
                        Délai de régularisation : {DELAI_HEURES} h
                    </p>
                </div>
            </div>

            {/* Motif d'ouverture */}
            <section className="bg-surface border border-border/8 rounded-2xl p-5 shadow-xs space-y-4">
                <h2 className="text-sm font-bold text-surface-text pb-3 border-b border-border/8">
                    Motif d’ouverture
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                        label="Motif"
                        required
                        value={motif}
                        onChange={(e) => {
                            setMotif(e.target.value as MotifDossierProvisoire);
                            setErrors((prev) => ({ ...prev, motif: '' }));
                        }}
                        error={errors.motif}
                        options={[
                            { value: '', label: 'Sélectionner un motif…' },
                            ...MOTIFS_DOSSIER_PROVISOIRE.map((m) => ({ value: m.value, label: m.label })),
                        ]}
                    />

                    <Input
                        label="Service à l’origine"
                        placeholder="ex: Urgences, SMUR, Réanimation"
                        value={serviceCreation}
                        onChange={(e) => setServiceCreation(e.target.value)}
                        helperText="Service qui prend en charge le patient à l’arrivée."
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-surface-text mb-1.5">
                        Signalement
                    </label>
                    <textarea
                        rows={3}
                        placeholder="Éléments permettant de reconnaître le patient : âge apparent, vêtements, signes distinctifs, lieu et circonstances de la prise en charge…"
                        value={signalement}
                        onChange={(e) => {
                            setSignalement(e.target.value);
                            setErrors((prev) => ({ ...prev, signalement: '' }));
                        }}
                        maxLength={1000}
                        className="w-full text-xs bg-page rounded-xl p-3 text-surface-text placeholder:text-muted/60 border border-border/8 focus:border-border/12 focus:ring-2 focus:ring-primary/10 focus:outline-none transition-all resize-none"
                    />
                    {errors.signalement ? (
                        <p className="text-[11px] text-danger-text font-medium mt-1">{errors.signalement}</p>
                    ) : (
                        <p className="text-[11px] text-muted mt-1">
                            {signalement.length}/1000 — indispensable si l’identité est inconnue.
                        </p>
                    )}
                </div>
            </section>

            {/* Identité partielle */}
            <section className="bg-surface border border-border/8 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="pb-3 border-b border-border/8">
                    <h2 className="text-sm font-bold text-surface-text">Identité connue</h2>
                    <p className="text-[11px] text-muted mt-0.5">
                        Laissez vide ce que vous ignorez : le service posera une valeur provisoire
                        plutôt qu’une information inventée.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Input label="Nom" placeholder="Inconnu" value={nom} onChange={(e) => setNom(e.target.value)} />
                    <Input label="Prénom" placeholder="Inconnu" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                    <Input
                        label="Âge estimé"
                        type="number"
                        placeholder="ex: 45"
                        value={age}
                        onChange={(e) => {
                            setAge(e.target.value);
                            setErrors((prev) => ({ ...prev, age: '' }));
                        }}
                        error={errors.age}
                    />
                    <Select
                        label="Genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value as Genre)}
                        options={[
                            { value: 'M', label: 'Masculin' },
                            { value: 'F', label: 'Féminin' },
                        ]}
                    />
                </div>
            </section>

            {/* Contact d'un proche */}
            <section className="bg-surface border border-border/8 rounded-2xl p-5 shadow-xs space-y-4">
                <h2 className="text-sm font-bold text-surface-text pb-3 border-b border-border/8">
                    Contact accompagnant
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        label="Téléphone"
                        placeholder="07 00 00 00 00"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        helperText="Préfixe opérateur attendu : 01, 05 ou 07."
                    />
                    <Input
                        label="Contact d’urgence"
                        placeholder="Proche ayant accompagné le patient"
                        value={contactUrgence}
                        onChange={(e) => setContactUrgence(e.target.value)}
                    />
                </div>
            </section>

            <div className="flex items-center justify-end gap-3">
                <Button type="button" variant="secondary" onClick={() => router.push(ROUTES.PATIENTS)}>
                    Annuler
                </Button>
                <Button type="submit" variant="primary" icon={Siren} isLoading={createMutation.isPending}>
                    Ouvrir le dossier provisoire
                </Button>
            </div>
        </form>
    );
}

export default PatientProvisoireForm;
