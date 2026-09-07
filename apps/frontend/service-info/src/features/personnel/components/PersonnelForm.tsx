'use client';

import React, { useState } from 'react';
import {
    User,
    Mail,
    Phone,
    Hash,
    Briefcase,
    Building2,
    Shield,
    Sparkles,
    Key,
    Check,
    Loader2,
    UserPlus,
} from 'lucide-react';
import { AgentInput, AgentUser, personnelType, Genre, PendingDocument } from '../schema';
import { useGetRoles, useCreateAgent, useUploadUserDocument } from '../hooks/useApiPeronnel';
import { parseApiError } from '../utils/parseApiError';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { FormAlert } from '@/components/ui/FormAlert';
import { PersonnelCreatedModal } from './PersonnelCreatedModal';
import { PersonnelDocumentsUpload } from './PersonnelDocumentsUpload';

const PERSONNEL_TYPES: { value: personnelType; label: string; prefix: string }[] = [
    { value: 'MEDECIN', label: 'Médecin', prefix: 'MED' },
    { value: 'INFIRMIER', label: 'Infirmier(ère)', prefix: 'INF' },
    { value: 'AIDE_SOIGNANT', label: 'Aide-soignant(e)', prefix: 'AS' },
    { value: 'SAGE_FEMME', label: 'Sage-femme', prefix: 'SF' },
    { value: 'AGENT_ADMISSION', label: "Agent d'admission", prefix: 'ADM' },
    { value: 'SECRETAIRE_MEDICALE', label: 'Secrétaire médicale', prefix: 'SEC' },
    { value: 'PHARMACIEN', label: 'Pharmacien(ne)', prefix: 'PHAR' },
    { value: 'TECHNICIEN_LABO', label: 'Technicien labo', prefix: 'LAB' },
    { value: 'BRANCARDIER', label: 'Brancardier', prefix: 'BRAN' },
    { value: 'CAISSIER', label: 'Caissier(ère)', prefix: 'CAIS' },
    { value: 'ADMIN', label: 'Administrateur SI', prefix: 'ADM-SI' },
    { value: 'SUPER_ADMIN', label: 'Super Admin', prefix: 'SUP' },
    { value: 'AUTRE', label: 'Autre fonction', prefix: 'AGT' },
];

const HOSPITAL_SERVICES = [
    'Urgences',
    'Médecine Interne',
    'Pédiatrie',
    'Gynécologie-Obstétrique',
    'Chirurgie Générale',
    'Cardiologie',
    'Radiologie & Imagerie',
    'Laboratoire / Analyses',
    'Pharmacie Hospitalière',
    'Admissions & Facturation',
    'Direction / SI',
];

export function PersonnelForm() {
    // 1. Hooks API
    const { data: rolesData, isLoading: isLoadingRoles } = useGetRoles();
    const createAgentMutation = useCreateAgent();
    const uploadDocMutation = useUploadUserDocument();

    // 2. État du formulaire agent
    const initialFormState: AgentInput = {
        nom: '',
        prenom: '',
        email: '',
        matricule: '',
        genre: 'M',
        telephone: '',
        personnelType: 'MEDECIN',
        serviceAffectation: '',
        specialite: '',
        numeroOrdre: '',
        roleIds: [],
        tempPassword: '',
    };

    const [form, setForm] = useState<AgentInput>(initialFormState);
    const [autoPassword, setAutoPassword] = useState(true);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [serverError, setServerError] = useState<string | null>(null);

    // 3. État des documents justificatifs joints
    const [documents, setDocuments] = useState<PendingDocument[]>([]);
    const [isUploadingDocs, setIsUploadingDocs] = useState(false);
    const [uploadProgressText, setUploadProgressText] = useState<string | undefined>(undefined);

    // 4. État modale de succès
    const [createdResult, setCreatedResult] = useState<{
        agent: AgentUser;
        temporaryPassword?: string;
        documentsCount?: number;
    } | null>(null);

    // Suggestion de matricule RH selon le métier
    const handleSuggestMatricule = () => {
        const typeConfig = PERSONNEL_TYPES.find((t) => t.value === form.personnelType);
        const prefix = typeConfig?.prefix || 'AGT';
        const year = new Date().getFullYear();
        const rand = Math.floor(100 + Math.random() * 900);
        setForm((prev) => ({ ...prev, matricule: `${prefix}-${year}-${rand}` }));
        setErrors((prev) => ({ ...prev, matricule: '' }));
    };

    // Validation locale avant envoi
    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!form.nom.trim()) newErrors.nom = 'Le nom de famille est obligatoire';
        if (!form.prenom.trim()) newErrors.prenom = 'Le prénom est obligatoire';
        if (!form.email.trim()) {
            newErrors.email = "L'adresse email est obligatoire";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = 'Format d’email invalide (ex: prenom.nom@hopital.local)';
        }
        if (!form.matricule.trim()) newErrors.matricule = 'Le matricule RH est obligatoire';
        if (!form.roleIds || form.roleIds.length === 0) {
            newErrors.roles = 'Sélectionnez au moins un rôle pour cet agent';
        }
        if (!autoPassword && form.tempPassword && form.tempPassword.length < 8) {
            newErrors.tempPassword = 'Le mot de passe doit contenir au moins 8 caractères';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const toggleRole = (roleId: string) => {
        setForm((prev) => {
            const exists = prev.roleIds.includes(roleId);
            const roleIds = exists
                ? prev.roleIds.filter((id) => id !== roleId)
                : [...prev.roleIds, roleId];
            return { ...prev, roleIds };
        });
        setErrors((prev) => ({ ...prev, roles: '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setServerError(null);

        if (!validate()) return;

        const payload: AgentInput = {
            ...form,
            nom: form.nom.trim(),
            prenom: form.prenom.trim(),
            matricule: form.matricule.trim(),
            email: form.email.trim().toLowerCase(),
            tempPassword: autoPassword ? undefined : form.tempPassword?.trim() || undefined,
        };

        try {
            const response = await createAgentMutation.mutateAsync(payload);
            const createdAgent = response.user;

            // Upload des pièces justificatives si l'utilisateur en a joint
            let uploadedCount = 0;
            if (documents.length > 0 && createdAgent?.id) {
                setIsUploadingDocs(true);
                for (let i = 0; i < documents.length; i++) {
                    const doc = documents[i];
                    setUploadProgressText(
                        `Téléversement du justificatif ${i + 1}/${documents.length} (${doc.file.name})...`
                    );
                    try {
                        await uploadDocMutation.mutateAsync({
                            userId: createdAgent.id,
                            file: doc.file,
                            documentType: doc.documentType,
                            numeroDocument: doc.numeroDocument,
                            dateDelivrance: doc.dateDelivrance,
                            dateExpiration: doc.dateExpiration,
                        });
                        uploadedCount++;
                    } catch (uploadErr) {
                        console.error(`Erreur d'upload pour le document ${doc.file.name}:`, uploadErr);
                    }
                }
                setIsUploadingDocs(false);
                setUploadProgressText(undefined);
            }

            setCreatedResult({
                agent: response.user,
                temporaryPassword: response.temporaryPassword,
                documentsCount: uploadedCount,
            });
        } catch (err) {
            setIsUploadingDocs(false);
            setUploadProgressText(undefined);
            const parsed = parseApiError(err);
            setServerError(parsed.globalMessage);
            if (Object.keys(parsed.fieldErrors).length > 0) {
                setErrors((prev) => ({ ...prev, ...parsed.fieldErrors }));
            }
        }
    };

    const handleResetForm = () => {
        setForm(initialFormState);
        setDocuments([]);
        setIsUploadingDocs(false);
        setUploadProgressText(undefined);
        setErrors({});
        setServerError(null);
        setCreatedResult(null);
    };

    return (
        <div className="space-y-6">
            {/* Alerte d'erreur serveur (ex: doublon email, matricule déjà pris, 403) */}
            <FormAlert
                variant="danger"
                title="Échec de l'enregistrement"
                message={serverError}
                onClose={() => setServerError(null)}
            />

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Colonne gauche (7 col sur 12): Formulaire agent */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* 1. CARTE IDENTITÉ CIVILE & CONTACT */}
                        <div className="bg-surface border border-border/8 rounded-2xl p-6 shadow-xs space-y-4">
                    <div className="flex items-center gap-2.5 pb-3 border-b border-border/8">
                        <User size={18} className="text-primary" />
                        <div>
                            <h2 className="text-sm font-semibold text-surface-text">Identité civile & Coordonnées</h2>
                            <p className="text-xs text-muted">Informations personnelles du collaborateur</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Nom */}
                        <Input
                            label="Nom de famille"
                            required
                            placeholder="ex: KOUASSI"
                            value={form.nom}
                            onChange={(e) => setForm({ ...form, nom: e.target.value })}
                            error={errors.nom}
                        />

                        {/* Prénom */}
                        <Input
                            label="Prénom(s)"
                            required
                            placeholder="ex: Jean-Marc"
                            value={form.prenom}
                            onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                            error={errors.prenom}
                        />

                        {/* Genre */}
                        <div>
                            <label className="block text-xs font-semibold text-surface-text mb-1.5">Genre</label>
                            <div className="flex items-center gap-2">
                                {(['M', 'F'] as Genre[]).map((g) => (
                                    <button
                                        key={g}
                                        type="button"
                                        onClick={() => setForm({ ...form, genre: g })}
                                        className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                                            form.genre === g
                                                ? 'bg-primary text-primary-text border-primary font-semibold'
                                                : 'bg-page text-muted border-border/8 hover:bg-hover/6'
                                        }`}
                                    >
                                        {g === 'M' ? 'Homme' : 'Femme'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Téléphone */}
                        <Input
                            label="Téléphone direct"
                            type="tel"
                            icon={Phone}
                            placeholder="07 00 00 00 00"
                            value={form.telephone || ''}
                            onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                        />

                        {/* Email professionnel */}
                        <div className="sm:col-span-2">
                            <Input
                                label="Adresse email professionnelle"
                                required
                                type="email"
                                icon={Mail}
                                placeholder="prenom.nom@hopital.local"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                error={errors.email}
                                helperText="Sert d'identifiant unique pour la connexion au portail"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. CARTE MÉTIER & AFFECTATION */}
                <div className="bg-surface border border-border/8 rounded-2xl p-6 shadow-xs space-y-4">
                    <div className="flex items-center gap-2.5 pb-3 border-b border-border/8">
                        <Briefcase size={18} className="text-primary" />
                        <div>
                            <h2 className="text-sm font-semibold text-surface-text">Métier & Affectation Hospitalière</h2>
                            <p className="text-xs text-muted">Corps de métier, matricule et rattachement de service</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Type de personnel */}
                        <Select
                            label="Corps de métier"
                            required
                            icon={Briefcase}
                            options={PERSONNEL_TYPES}
                            value={form.personnelType}
                            onChange={(e) => setForm({ ...form, personnelType: e.target.value as personnelType })}
                            error={errors.personnelType}
                        />

                        {/* Matricule RH avec action suggérer */}
                        <Input
                            label="Matricule RH"
                            required
                            icon={Hash}
                            placeholder="ex: MED-2026-042"
                            value={form.matricule}
                            onChange={(e) => setForm({ ...form, matricule: e.target.value.toUpperCase() })}
                            error={errors.matricule}
                            rightAction={
                                <button
                                    type="button"
                                    onClick={handleSuggestMatricule}
                                    className="flex items-center gap-1 text-[11px] font-semibold text-info hover:underline cursor-pointer"
                                >
                                    <Sparkles size={12} /> Suggérer
                                </button>
                            }
                        />

                        {/* Service d'affectation */}
                        <Select
                            label="Service d'affectation"
                            icon={Building2}
                            options={[
                                { value: '', label: 'Sélectionner un service hospitalier...' },
                                ...HOSPITAL_SERVICES.map((s) => ({ value: s, label: s })),
                            ]}
                            value={form.serviceAffectation || ''}
                            onChange={(e) => setForm({ ...form, serviceAffectation: e.target.value })}
                            error={errors.serviceAffectation}
                        />

                        {/* Spécialité */}
                        <Input
                            label="Spécialité / Domaine"
                            placeholder="ex: Cardiologie, Pédiatrie..."
                            value={form.specialite || ''}
                            onChange={(e) => setForm({ ...form, specialite: e.target.value })}
                        />
                    </div>
                </div>

                {/* 3. CARTE RÔLES & HABILITATIONS */}
                <div className="bg-surface border border-border/8 rounded-2xl p-6 shadow-xs space-y-4">
                    <div className="flex items-center gap-2.5 pb-3 border-b border-border/8">
                        <Shield size={18} className="text-primary" />
                        <div>
                            <h2 className="text-sm font-semibold text-surface-text">Rôles & Habilitations Système</h2>
                            <p className="text-xs text-muted">Droits d'accès attribués à l'agent dans le SIH</p>
                        </div>
                    </div>

                    {errors.roles && (
                        <p className="text-xs text-danger font-medium">{errors.roles}</p>
                    )}

                    {isLoadingRoles ? (
                        <div className="flex items-center gap-2 text-xs text-muted py-4">
                            <Loader2 size={16} className="animate-spin" />
                            <span>Chargement des rôles disponibles...</span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                            {rolesData?.data?.map((role) => {
                                const isSelected = form.roleIds.includes(role.id);
                                return (
                                    <button
                                        key={role.id}
                                        type="button"
                                        onClick={() => toggleRole(role.id)}
                                        className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 cursor-pointer ${
                                            isSelected
                                                ? 'bg-primary/5 border-primary text-surface-text ring-1 ring-primary'
                                                : 'bg-page border-border/8 text-muted hover:bg-hover/6 hover:text-surface-text'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-semibold text-surface-text">{role.libelle}</span>
                                            <div
                                                className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                                                    isSelected ? 'bg-primary border-primary text-primary-text' : 'border-border/12 bg-surface'
                                                }`}
                                            >
                                                {isSelected && <Check size={11} />}
                                            </div>
                                        </div>
                                        <span className="text-[11px] text-muted line-clamp-2">
                                            {role.description || role.code}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* Mot de passe temporaire */}
                    <div className="pt-4 border-t border-border/8 space-y-3">
                        <label className="flex items-center gap-2 text-xs text-surface-text cursor-pointer">
                            <input
                                type="checkbox"
                                checked={autoPassword}
                                onChange={(e) => setAutoPassword(e.target.checked)}
                                className="rounded border-border/8 text-primary focus:ring-primary/20"
                            />
                            <span className="font-semibold">
                                Générer automatiquement un mot de passe temporaire sécurisé (recommandé)
                            </span>
                        </label>

                        {!autoPassword && (
                            <div className="max-w-md">
                                <Input
                                    label="Mot de passe temporaire initial"
                                    type="password"
                                    icon={Key}
                                    placeholder="Minimum 8 caractères"
                                    value={form.tempPassword || ''}
                                    onChange={(e) => setForm({ ...form, tempPassword: e.target.value })}
                                    error={errors.tempPassword}
                                />
                            </div>
                        )}
                    </div>
                </div>

                        {/* Bouton de soumission animé */}
                        <div className="flex items-center justify-end gap-3 pt-2">
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                icon={UserPlus}
                                isLoading={createAgentMutation.isPending || isUploadingDocs}
                            >
                                {isUploadingDocs
                                    ? 'Téléversement des justificatifs...'
                                    : createAgentMutation.isPending
                                    ? 'Création du compte...'
                                    : "Créer l'agent hospitalier"}
                            </Button>
                        </div>
                    </div>

                    {/* Colonne droite (5 col sur 12): Justificatifs & Dossier RH */}
                    <div className="lg:col-span-5 lg:sticky lg:top-6 space-y-4">
                        <PersonnelDocumentsUpload
                            documents={documents}
                            onChange={setDocuments}
                            isUploading={isUploadingDocs}
                            uploadProgressText={uploadProgressText}
                        />
                    </div>
                </div>
            </form>

            {/* Modale de succès avec identifiants à copier */}
            <PersonnelCreatedModal
                agent={createdResult?.agent || null}
                temporaryPassword={createdResult?.temporaryPassword}
                documentsCount={createdResult?.documentsCount}
                isOpen={Boolean(createdResult)}
                onResetForm={handleResetForm}
            />
        </div>
    );
}

export default PersonnelForm;
