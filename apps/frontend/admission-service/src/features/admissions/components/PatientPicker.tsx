'use client';

import React, { useEffect, useState } from 'react';
import { Search, UserCheck, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { useSearchPatients } from '@/features/patients/hooks/usePatients';
import { fullName, initials } from '@/features/patients/utils/patientHelpers';
import type { Patient } from '@/features/patients/schema';

interface Props {
    selected: Patient | null;
    onSelect: (patient: Patient | null) => void;
    error?: string;
}

export function PatientPicker({ selected, onSelect, error }: Props) {
    const [term, setTerm] = useState('');
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const h = setTimeout(() => setQuery(term.trim()), 300);
        return () => clearTimeout(h);
    }, [term]);

    const isNumber = /^[A-Za-z]*\d{3,}$/.test(query);
    const { data, isFetching } = useSearchPatients({
        limit: 6,
        uniquePatientId: query && isNumber ? query : undefined,
        nom: query && !isNumber ? query : undefined,
    });

    const results = query ? data?.patients ?? [] : [];

    if (selected) {
        return (
            <div className="flex items-center gap-3 p-3 rounded-2xl border border-primary/20 bg-primary/5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-surface-text border border-border/8 flex items-center justify-center font-bold text-xs shrink-0">
                    {initials(selected)}
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-surface-text truncate flex items-center gap-1.5">
                        <UserCheck size={14} className="text-success-text" />
                        {fullName(selected)}
                    </p>
                    <p className="text-[11px] text-muted font-mono">{selected.uniquePatientId}</p>
                </div>
                <button
                    type="button"
                    onClick={() => onSelect(null)}
                    className="p-1.5 rounded-lg text-muted hover:text-surface-text hover:bg-hover/6 transition-colors cursor-pointer"
                    aria-label="Changer de patient"
                >
                    <X size={15} />
                </button>
            </div>
        );
    }

    return (
        <div className="relative">
            <Input
                icon={Search}
                placeholder="Rechercher un patient par nom ou n° de dossier…"
                value={term}
                error={error}
                onChange={(e) => setTerm(e.target.value)}
                onFocus={() => setOpen(true)}
                rightAction={isFetching ? <Loader2 size={14} className="animate-spin text-muted" /> : undefined}
            />

            {open && query && (
                <div className="absolute z-20 mt-1.5 w-full rounded-2xl border border-border/8 bg-surface shadow-xl overflow-hidden">
                    {results.length === 0 ? (
                        <p className="px-4 py-3 text-xs text-muted">
                            {isFetching ? 'Recherche…' : 'Aucun patient trouvé pour cette recherche.'}
                        </p>
                    ) : (
                        results.map((p) => (
                            <button
                                key={p.id}
                                type="button"
                                onClick={() => {
                                    onSelect(p);
                                    setOpen(false);
                                    setTerm('');
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-hover/6 transition-colors cursor-pointer border-b border-border/8 last:border-0"
                            >
                                <div className="w-8 h-8 rounded-lg bg-primary/8 border border-border/8 flex items-center justify-center font-bold text-[10px] text-surface-text shrink-0">
                                    {initials(p)}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-semibold text-surface-text truncate">{fullName(p)}</p>
                                    <p className="text-[10px] text-muted font-mono">{p.uniquePatientId}</p>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default PatientPicker;
