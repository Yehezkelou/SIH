'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FilePlus2, UserSearch } from 'lucide-react';
import { useCreatePatient } from '../hooks/usePatients';
import { useDuplicateSearch } from '../hooks/useDuplicateSearch';
import { PatientDuplicateAlert } from './PatientDuplicateAlert';
import { CreatePatientInput, Genre, SearchPatientParams } from '../schema';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { FormAlert } from '@/components/ui/FormAlert';
import { useUser } from '@/hooks/useUser';
import { ROUTES } from '@/config/routes';

interface FormState {
    nom: string;
    prenom: string;
    age: string;
    genre: Genre;
    dateNaissance: string;
    lieuNaissance: string;
    email: string;
    numero: string;
    numeroSecondaire: string;
    conctactUrgence: string;
    numSecuSocial: string;
    numIdentityNational: string;
    numeroPassport: string;
    numeroCMU: string;
    nomPere: string;
    nomMere: string;
    tuteur: string;
    numeroPere: string;
    numeroMere: string;
    numeroTuteur: string;
}

const EMPTY: FormState = {
    nom: '', prenom: '', age: '', genre: 'M', dateNaissance: '', lieuNaissance: '',
    email: '', numero: '', numeroSecondaire: '', conctactUrgence: '',
    numSecuSocial: '', numIdentityNational: '', numeroPassport: '', numeroCMU: '',
    nomPere: '', nomMere: '', tuteur: '', numeroPere: '', numeroMere: '', numeroTuteur: '',
};

export function PatientForm() {
    const router = useRouter();
    const { data: currentUser } = useUser();
    const createMutation = useCreatePatient();

    const [form, setForm] = useState<FormState>(EMPTY);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [serverError, setServerError] = useState<string | null>(null);
    /** Doublon certain reconnu et assumé par l'agent : débloque l'envoi. */
    const [duplicateAcknowledged, setDuplicateAcknowledged] = useState(false);

    const set = (field: keyof FormState) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
        setErrors((prev) => ({ ...prev, [field]: '' }));
        // Toute modification remet en cause l'acquittement précédent : le
        // doublon reconnu ne portait pas forcément sur cette nouvelle saisie.
        setDuplicateAcknowledged(false);
    };

    // Projection de la saisie vers les critères de recherche. Recalculée à
    // chaque frappe ; le hook se charge du différé et de la mise en cache.
    const draft: SearchPatientParams = useMemo(
        () => ({
            nom: form.nom.trim() || undefined,
            prenom: form.prenom.trim() || undefined,
            dateNaissance: form.dateNaissance || undefined,
            numero: form.numero.trim() || undefined,
            email: form.email.trim() || undefined,
            numSecuSocial: form.numSecuSocial.trim() || undefined,
            numIdentityNational: form.numIdentityNational.trim() || undefined,
            numeroPassport: form.numeroPassport.trim() || undefined,
            numCMU: form.numeroCMU.trim() || undefined,
        }),
        [form]
    );

    const duplicates = useDuplicateSearch(draft);
    const isBlocked = duplicates.hasExactMatch && !duplicateAcknowledged;

    const validate = () => {
        const next: Record<string, string> = {};
        if (form.nom.trim().length < 3) next.nom = 'Le nom doit faire au moins 3 caractères.';
        if (form.prenom.trim().length < 3) next.prenom = 'Le prénom doit faire au moins 3 caractères.';
        if (!form.age) next.age = "L'âge est obligatoire.";
        else if (Number(form.age) < 0 || Number(form.age) > 130) next.age = 'Âge invalide.';
        if (!form.dateNaissance) next.dateNaissance = 'La date de naissance est obligatoire.';
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setServerError(null);
        if (!validate()) return;

        const payload: CreatePatientInput = {
            identity: {
                nom: form.nom.trim(),
                prenom: form.prenom.trim(),
                age: Number(form.age),
                genre: form.genre,
                dateNaissance: form.dateNaissance,
                ...(form.lieuNaissance.trim() && { lieuNaissance: form.lieuNaissance.trim() }),
            },
            famille: {
                ...(form.nomPere.trim() && { nomPere: form.nomPere.trim() }),
                ...(form.nomMere.trim() && { nomMere: form.nomMere.trim() }),
                ...(form.tuteur.trim() && { tuteur: form.tuteur.trim() }),
                ...(form.numeroPere.trim() && { numeroPere: form.numeroPere.trim() }),
                ...(form.numeroMere.trim() && { numeroMere: form.numeroMere.trim() }),
                ...(form.numeroTuteur.trim() && { numeroTuteur: form.numeroTuteur.trim() }),
            },
            contact: {
                ...(form.email.trim() && { email: form.email.trim() }),
                ...(form.numero.trim() && { numero: form.numero.trim() }),
                ...(form.numeroSecondaire.trim() && { numeroSecondaire: form.numeroSecondaire.trim() }),
                ...(form.conctactUrgence.trim() && { conctactUrgence: form.conctactUrgence.trim() }),
            },
            uniqueIdentity: {
                ...(form.numSecuSocial.trim() && { numSecuSocial: form.numSecuSocial.trim() }),
                ...(form.numIdentityNational.trim() && { numIdentityNational: form.numIdentityNational.trim() }),
                ...(form.numeroPassport.trim() && { numeroPassport: form.numeroPassport.trim() }),
                ...(form.numeroCMU.trim() && { numeroCMU: form.numeroCMU.trim() }),
            },
            CreatedBy: { createdBy: currentUser?.id },
        };

        try {
            const response = await createMutation.mutateAsync({ patient: payload });
            const created = response.data;
            router.push(
                created?.uniquePatientId ? ROUTES.PATIENT_DETAIL(created.uniquePatientId) : ROUTES.PATIENTS
            );
        } catch (err) {
            const response = (err as { response?: { data?: { message?: string } } }).response;
            setServerError(
                response?.data?.message || (err as Error).message || 'La création du dossier a échoué.'
            );
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
            <div className="lg:col-span-2 space-y-5">
                <FormAlert variant="danger" message={serverError} onClose={() => setServerError(null)} />

                <section className="bg-surface border border-border/8 rounded-2xl p-5 shadow-xs space-y-4">
                    <h2 className="text-sm font-bold text-surface-text pb-3 border-b border-border/8">
                        Identité civile
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input label="Nom" required value={form.nom} onChange={set('nom')} error={errors.nom} placeholder="ex: KOUASSI" />
                        <Input label="Prénom" required value={form.prenom} onChange={set('prenom')} error={errors.prenom} placeholder="ex: Aya" />
                        <Input label="Date de naissance" type="date" required value={form.dateNaissance} onChange={set('dateNaissance')} error={errors.dateNaissance} />
                        <Input label="Âge" type="number" required value={form.age} onChange={set('age')} error={errors.age} placeholder="ex: 32" />
                        <Select label="Genre" value={form.genre} onChange={set('genre')} options={[{ value: 'M', label: 'Masculin' }, { value: 'F', label: 'Féminin' }]} />
                        <Input label="Lieu de naissance" value={form.lieuNaissance} onChange={set('lieuNaissance')} placeholder="ex: Abidjan" />
                    </div>
                </section>

                <section className="bg-surface border border-border/8 rounded-2xl p-5 shadow-xs space-y-4">
                    <div className="pb-3 border-b border-border/8">
                        <h2 className="text-sm font-bold text-surface-text">Identifiants uniques</h2>
                        <p className="text-[11px] text-muted mt-0.5">
                            Un seul de ces numéros suffit à reconnaître formellement un dossier existant.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input label="N° sécurité sociale" value={form.numSecuSocial} onChange={set('numSecuSocial')} />
                        <Input label="N° identité nationale" value={form.numIdentityNational} onChange={set('numIdentityNational')} />
                        <Input label="N° passeport" value={form.numeroPassport} onChange={set('numeroPassport')} />
                        <Input label="N° CMU" value={form.numeroCMU} onChange={set('numeroCMU')} />
                    </div>
                </section>

                <section className="bg-surface border border-border/8 rounded-2xl p-5 shadow-xs space-y-4">
                    <h2 className="text-sm font-bold text-surface-text pb-3 border-b border-border/8">Contact</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input label="Téléphone" value={form.numero} onChange={set('numero')} placeholder="07 00 00 00 00" helperText="Préfixe attendu : 01, 05 ou 07." />
                        <Input label="Téléphone secondaire" value={form.numeroSecondaire} onChange={set('numeroSecondaire')} />
                        <Input label="Email" type="email" value={form.email} onChange={set('email')} />
                        <Input label="Contact d’urgence" value={form.conctactUrgence} onChange={set('conctactUrgence')} />
                    </div>
                </section>

                <section className="bg-surface border border-border/8 rounded-2xl p-5 shadow-xs space-y-4">
                    <h2 className="text-sm font-bold text-surface-text pb-3 border-b border-border/8">Filiation</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input label="Nom du père" value={form.nomPere} onChange={set('nomPere')} />
                        <Input label="Téléphone du père" value={form.numeroPere} onChange={set('numeroPere')} />
                        <Input label="Nom de la mère" value={form.nomMere} onChange={set('nomMere')} />
                        <Input label="Téléphone de la mère" value={form.numeroMere} onChange={set('numeroMere')} />
                        <Input label="Tuteur" value={form.tuteur} onChange={set('tuteur')} />
                        <Input label="Téléphone du tuteur" value={form.numeroTuteur} onChange={set('numeroTuteur')} />
                    </div>
                </section>

                <div className="flex items-center justify-end gap-3">
                    <Button type="button" variant="secondary" onClick={() => router.push(ROUTES.PATIENTS)}>
                        Annuler
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        icon={FilePlus2}
                        isLoading={createMutation.isPending}
                        disabled={isBlocked}
                    >
                        Créer le dossier
                    </Button>
                </div>
            </div>

            {/* Panneau de doublons, actualisé au fil de la saisie */}
            <aside className="lg:sticky lg:top-0 space-y-3">
                <div className="flex items-center gap-2">
                    <UserSearch size={15} className="text-primary" />
                    <h2 className="text-sm font-bold text-surface-text">Doublons potentiels</h2>
                </div>

                <PatientDuplicateAlert
                    candidates={duplicates.candidates}
                    hasExactMatch={duplicates.hasExactMatch}
                    isSearching={duplicates.isSearching}
                    isArmed={duplicates.isArmed}
                />

                {duplicates.hasExactMatch && (
                    <label className="flex items-start gap-2.5 p-3 rounded-xl bg-surface border border-border/8 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={duplicateAcknowledged}
                            onChange={(e) => setDuplicateAcknowledged(e.target.checked)}
                            className="mt-0.5 accent-primary shrink-0"
                        />
                        <span className="text-[11px] text-surface-text leading-relaxed">
                            J’ai vérifié ces dossiers : il s’agit bien d’un <strong>patient différent</strong>.
                            Je crée un nouveau dossier en connaissance de cause.
                        </span>
                    </label>
                )}
            </aside>
        </form>
    );
}

export default PatientForm;
