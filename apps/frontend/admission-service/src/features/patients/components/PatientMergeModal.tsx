'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Merge, ArrowRight, TriangleAlert, Check } from 'lucide-react';
import {
    MergeFieldsToKeep,
    MotifFusion,
    Patient,
    PatientIdentityInput,
} from '../schema';
import { useMergePatients } from '../hooks/usePatients';
import { comparePatients, ChampCompare } from '../utils/duplicateMatching';
import { fullName } from '../utils/patientHelpers';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { FormAlert } from '@/components/ui/FormAlert';
import { useUser } from '@/hooks/useUser';

interface PatientMergeModalProps {
    /** Dossiers à fusionner, dans l'ordre où ils ont été présentés. */
    pair: { a: Patient; b: Patient } | null;
    onClose: () => void;
    onMerged?: () => void;
}

const MOTIFS: { value: MotifFusion; label: string }[] = [
    { value: 'DOUBLON_MANUEL', label: 'Doublon constaté manuellement' },
    { value: 'DOUBLON_DETECTE_SIMILARITE', label: 'Doublon détecté par similarité' },
    { value: 'DOUBLON_REGULARISATION', label: 'Doublon issu d’une régularisation' },
];

function display(value: unknown): string {
    if (value == null || value === '') return '—';
    return String(value);
}

export function PatientMergeModal({ pair, onClose, onMerged }: PatientMergeModalProps) {
    const { data: currentUser } = useUser();
    const mergeMutation = useMergePatients();

    /** Quel dossier survit. L'autre sera absorbé puis archivé. */
    const [targetSide, setTargetSide] = useState<'a' | 'b'>('a');
    const [motif, setMotif] = useState<MotifFusion>('DOUBLON_MANUEL');
    /** Pour chaque champ divergent, de quel côté vient la valeur retenue. */
    const [choices, setChoices] = useState<Record<string, 'a' | 'b'>>({});
    const [serverError, setServerError] = useState<string | null>(null);
    const [confirmed, setConfirmed] = useState(false);

    const comparison = useMemo(
        () => (pair ? comparePatients(pair.a, pair.b) : []),
        [pair]
    );

    /** Seuls les champs qui divergent réellement demandent un arbitrage. */
    const divergents = comparison.filter((c) => !c.identical);

    if (!pair) return null;

    const target = targetSide === 'a' ? pair.a : pair.b;
    const source = targetSide === 'a' ? pair.b : pair.a;

    const valueFor = (champ: ChampCompare) => {
        const side = choices[champ.key] ?? targetSide;
        const raw = side === 'a' ? champ.valueA : champ.valueB;
        // Un champ vide du côté choisi ne doit pas effacer la valeur de l'autre.
        if (raw == null || raw === '') {
            return side === 'a' ? champ.valueB : champ.valueA;
        }
        return raw;
    };

    const buildChampsAConserver = (): MergeFieldsToKeep => {
        const groups: Partial<Record<ChampCompare['group'], Record<string, unknown>>> = {};
        for (const champ of comparison) {
            const value = valueFor(champ);
            if (value == null || value === '') continue;
            const bucket = groups[champ.group] ?? {};
            bucket[champ.key] = value;
            groups[champ.group] = bucket;
        }

        const result: MergeFieldsToKeep = {};

        // `identity` n'est envoyé que complet : le serveur lit tous ses champs,
        // et un bloc partiel produirait une identité tronquée.
        const identity = groups.identity;
        if (identity?.nom && identity?.prenom && identity?.dateNaissance) {
            result.identity = {
                nom: String(identity.nom),
                prenom: String(identity.prenom),
                age: Number(identity.age ?? target.age),
                genre: (identity.genre ?? target.genre) as PatientIdentityInput['genre'],
                dateNaissance: String(identity.dateNaissance),
                ...(identity.lieuNaissance ? { lieuNaissance: String(identity.lieuNaissance) } : {}),
            };
        }
        if (groups.famille) result.famille = groups.famille as MergeFieldsToKeep['famille'];
        if (groups.contact) {
            const { contactUrgence, ...rest } = groups.contact as Record<string, unknown>;
            // Le schéma de fusion réutilise la clé mal orthographiée du schéma
            // de création : `conctactUrgence`.
            result.contact = {
                ...rest,
                ...(contactUrgence ? { conctactUrgence: String(contactUrgence) } : {}),
            } as MergeFieldsToKeep['contact'];
        }
        if (groups.uniqueIdentity) {
            const { numCMU, ...rest } = groups.uniqueIdentity as Record<string, unknown>;
            result.uniqueIdentity = {
                ...rest,
                ...(numCMU ? { numeroCMU: String(numCMU) } : {}),
            } as MergeFieldsToKeep['uniqueIdentity'];
        }
        return result;
    };

    const handleMerge = async () => {
        setServerError(null);
        try {
            await mergeMutation.mutateAsync({
                sourcePatientId: source.id,
                targetPatientId: target.id,
                mergeBy: currentUser?.id,
                motifFusion: motif,
                ChampsAConserver: buildChampsAConserver(),
            });
            onMerged?.();
            onClose();
        } catch (err) {
            const response = (err as { response?: { data?: { message?: string; detail?: string } } })
                .response;
            setServerError(
                response?.data?.detail ||
                    response?.data?.message ||
                    (err as Error).message ||
                    'La fusion a échoué.'
            );
        }
    };

    const SideButton = ({ side, patient }: { side: 'a' | 'b'; patient: Patient }) => (
        <button
            type="button"
            onClick={() => setTargetSide(side)}
            className={`flex-1 text-left p-3 rounded-xl border transition-all cursor-pointer ${
                targetSide === side
                    ? 'bg-success/10 border-success/30'
                    : 'bg-page border-border/8 hover:border-border/12'
            }`}
        >
            <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-surface-text truncate">
                    {fullName(patient)}
                </span>
                {targetSide === side && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-success-text shrink-0">
                        <Check size={11} /> Conservé
                    </span>
                )}
            </div>
            <span className="font-mono text-[10px] text-muted">{patient.uniquePatientId}</span>
        </button>
    );

    return (
        <AnimatePresence>
            <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 12 }}
                    transition={{ duration: 0.2 }}
                    className="w-full max-w-3xl bg-surface border border-border/8 rounded-3xl p-6 shadow-2xl space-y-5 my-8 max-h-[92vh] flex flex-col"
                >
                    <div className="flex items-start justify-between gap-3 shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0">
                                <Merge size={20} />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-surface-text">
                                    Fusionner deux dossiers
                                </h3>
                                <p className="text-xs text-muted">
                                    {divergents.length} champ{divergents.length > 1 ? 's' : ''} à arbitrer
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-1.5 rounded-xl text-muted hover:text-surface-text hover:bg-hover/6 transition-colors cursor-pointer"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <FormAlert variant="danger" message={serverError} onClose={() => setServerError(null)} />

                    <div className="overflow-y-auto pr-1 flex-1 space-y-5">
                        {/* Choix du dossier survivant */}
                        <section className="space-y-2">
                            <h4 className="text-xs font-semibold text-surface-text">
                                Dossier conservé
                            </h4>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <SideButton side="a" patient={pair.a} />
                                <SideButton side="b" patient={pair.b} />
                            </div>
                            <p className="text-[11px] text-muted">
                                Le dossier <strong>{source.uniquePatientId}</strong> sera absorbé puis
                                archivé. Ses pièces justificatives sont rattachées au dossier conservé.
                            </p>
                        </section>

                        {/* Arbitrage champ par champ */}
                        {divergents.length > 0 && (
                            <section className="space-y-2">
                                <h4 className="text-xs font-semibold text-surface-text">
                                    Valeurs divergentes
                                </h4>
                                <div className="rounded-2xl border border-border/8 overflow-hidden">
                                    {divergents.map((champ, index) => {
                                        const chosen = choices[champ.key] ?? targetSide;
                                        return (
                                            <div
                                                key={champ.key}
                                                className={`grid grid-cols-[1fr_auto_1fr] items-center gap-2 p-2.5 text-[11px] ${
                                                    index > 0 ? 'border-t border-border/8' : ''
                                                } ${champ.complementary ? 'bg-info/5' : ''}`}
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setChoices((p) => ({ ...p, [champ.key]: 'a' }))
                                                    }
                                                    className={`text-left p-2 rounded-lg border transition-all cursor-pointer truncate ${
                                                        chosen === 'a'
                                                            ? 'bg-primary/10 border-primary/30 text-surface-text font-semibold'
                                                            : 'bg-page border-border/8 text-muted hover:text-surface-text'
                                                    }`}
                                                >
                                                    {display(champ.valueA)}
                                                </button>

                                                <span className="text-[10px] text-muted text-center px-1 shrink-0 w-28 truncate">
                                                    {champ.label}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setChoices((p) => ({ ...p, [champ.key]: 'b' }))
                                                    }
                                                    className={`text-left p-2 rounded-lg border transition-all cursor-pointer truncate ${
                                                        chosen === 'b'
                                                            ? 'bg-primary/10 border-primary/30 text-surface-text font-semibold'
                                                            : 'bg-page border-border/8 text-muted hover:text-surface-text'
                                                    }`}
                                                >
                                                    {display(champ.valueB)}
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                                <p className="text-[11px] text-muted">
                                    Les lignes teintées sont renseignées d’un seul côté : la fusion
                                    enrichit le dossier conservé.
                                </p>
                            </section>
                        )}

                        <Select
                            label="Motif de la fusion"
                            value={motif}
                            onChange={(e) => setMotif(e.target.value as MotifFusion)}
                            options={MOTIFS}
                        />

                        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-warning/10 border border-warning/20 text-warning-text">
                            <TriangleAlert size={15} className="shrink-0 mt-0.5" />
                            <label className="flex items-start gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={confirmed}
                                    onChange={(e) => setConfirmed(e.target.checked)}
                                    className="mt-0.5 accent-primary shrink-0"
                                />
                                <span className="text-[11px] leading-relaxed">
                                    Je confirme qu’il s’agit du <strong>même patient</strong>. La fusion
                                    est tracée dans le journal d’audit mais n’est pas réversible depuis
                                    cette interface.
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-4 border-t border-border/8 shrink-0">
                        <span className="text-[11px] text-muted inline-flex items-center gap-1.5 min-w-0">
                            <span className="font-mono truncate">{source.uniquePatientId}</span>
                            <ArrowRight size={12} className="shrink-0" />
                            <span className="font-mono truncate">{target.uniquePatientId}</span>
                        </span>
                        <div className="flex items-center gap-2.5 shrink-0">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={onClose}
                                disabled={mergeMutation.isPending}
                            >
                                Annuler
                            </Button>
                            <Button
                                type="button"
                                variant="primary"
                                icon={Merge}
                                onClick={handleMerge}
                                disabled={!confirmed}
                                isLoading={mergeMutation.isPending}
                            >
                                Fusionner
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default PatientMergeModal;
