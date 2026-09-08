'use client';

import React, { useRef, useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { FormAlert } from '@/components/ui/FormAlert';
import { useUser } from '@/hooks/useUser';
import { Admission, AdmissionDocumentType } from '../schema';
import { useAddDocument } from '../hooks/useAdmissions';
import { DOCUMENT_TYPE, formatSize } from '../utils/admissionHelpers';
import { parseApiError } from '../utils/parseApiError';

interface Props {
    admission: Admission;
    open: boolean;
    onClose: () => void;
}

export function DocumentUploadModal({ admission, open, onClose }: Props) {
    const { data: user } = useUser();
    const mutation = useAddDocument();
    const inputRef = useRef<HTMLInputElement>(null);

    const [file, setFile] = useState<File | null>(null);
    const [documentType, setDocumentType] = useState<AdmissionDocumentType>('PIECE_IDENTIE');
    const [documentName, setDocumentName] = useState('');
    const [error, setError] = useState<string | null>(null);

    const submit = async () => {
        setError(null);
        if (!file) return setError('Sélectionnez un fichier à téléverser.');
        try {
            await mutation.mutateAsync({
                admissionId: admission.id,
                numeroAdmission: admission.admissionNumber,
                patientId: admission.patientId,
                numeroPatient: admission.numeroPatient,
                documentType,
                documentName: documentName.trim() || file.name,
                createdBy: user?.id ?? '',
                file,
            });
            onClose();
        } catch (e) {
            setError(parseApiError(e).globalMessage);
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Attacher un document"
            description={`Admission ${admission.admissionNumber}`}
            icon={Upload}
            footer={
                <>
                    <Button variant="secondary" onClick={onClose} disabled={mutation.isPending}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={submit} isLoading={mutation.isPending}>
                        Téléverser
                    </Button>
                </>
            }
        >
            <div className="space-y-4 pb-2">
                <FormAlert variant="danger" message={error} onClose={() => setError(null)} />

                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />

                {file ? (
                    <div className="flex items-center gap-3 p-3 rounded-2xl border border-primary/20 bg-primary/5">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary border border-border/8 flex items-center justify-center shrink-0">
                            <FileText size={18} />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-surface-text truncate">{file.name}</p>
                            <p className="text-[11px] text-muted">{formatSize(file.size)}</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setFile(null)}
                            className="p-1.5 rounded-lg text-muted hover:text-surface-text hover:bg-hover/6 transition-colors cursor-pointer"
                        >
                            <X size={15} />
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        className="w-full flex flex-col items-center justify-center gap-2 py-8 rounded-2xl border-2 border-dashed border-border/12 hover:border-primary/30 hover:bg-hover/4 transition-colors cursor-pointer"
                    >
                        <Upload size={22} className="text-muted" />
                        <span className="text-xs text-muted">Cliquez pour choisir un fichier</span>
                    </button>
                )}

                <Select
                    label="Type de document"
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value as AdmissionDocumentType)}
                >
                    {DOCUMENT_TYPE.map((t) => (
                        <option key={t.value} value={t.value}>
                            {t.label}
                        </option>
                    ))}
                </Select>

                <Input
                    label="Nom du document"
                    placeholder="Laisser vide pour utiliser le nom du fichier"
                    value={documentName}
                    onChange={(e) => setDocumentName(e.target.value)}
                />
            </div>
        </Modal>
    );
}

export default DocumentUploadModal;
