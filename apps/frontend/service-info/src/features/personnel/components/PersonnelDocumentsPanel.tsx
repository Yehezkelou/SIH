'use client';

import React, { useRef, useState } from 'react';
import {
    FileText,
    FileImage,
    File as FileGeneric,
    Trash2,
    UploadCloud,
    Loader2,
    CalendarClock,
} from 'lucide-react';
import {
    USER_DOCUMENT_TYPES,
    UserDocumentType,
    AgentDocument,
} from '../schema';
import { useGetUserDocuments, useUploadUserDocument, useDeleteUserDocument } from '../hooks/useApiPeronnel';
import { formatDateTime, formatFileSize } from '../utils/personnelActions';
import { Select } from '@/components/ui/Select';
import { FormAlert } from '@/components/ui/FormAlert';

interface PersonnelDocumentsPanelProps {
    userId: string;
    /** `user:UPDATE` — sans lui, le panneau reste en consultation. */
    canManage: boolean;
}

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_MIME_TYPES = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];

function documentIcon(doc: AgentDocument) {
    const mime = (doc.mimeType || '').toLowerCase();
    const ext = (doc.documentExtension || '').toLowerCase();
    const name = (doc.nomFichier || doc.documentName || '').toLowerCase();

    if (mime === 'application/pdf' || ext === 'pdf' || name.endsWith('.pdf')) {
        return <FileText size={18} className="text-danger" />;
    }
    if (
        mime.startsWith('image/') ||
        ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'].includes(ext) ||
        /\.(png|jpe?g|webp|gif|svg)$/i.test(name)
    ) {
        return <FileImage size={18} className="text-info" />;
    }
    return <FileGeneric size={18} className="text-muted" />;
}

function documentTypeLabel(type: string): string {
    return USER_DOCUMENT_TYPES.find((t) => t.value === type)?.label || type;
}

export function PersonnelDocumentsPanel({ userId, canManage }: PersonnelDocumentsPanelProps) {
    const { data, isLoading } = useGetUserDocuments(userId);
    const uploadMutation = useUploadUserDocument();
    const deleteMutation = useDeleteUserDocument();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [documentType, setDocumentType] = useState<UserDocumentType>('CNI');
    const [error, setError] = useState<string | null>(null);

    const documents = data?.documents || [];

    const handleFileSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        // Le champ est réinitialisé tout de suite : sans ça, re-choisir le même
        // fichier après une erreur ne déclencherait aucun `change`.
        event.target.value = '';
        if (!file) return;

        setError(null);

        if (!ACCEPTED_MIME_TYPES.includes(file.type)) {
            setError('Formats acceptés : PDF, PNG ou JPEG.');
            return;
        }
        if (file.size > MAX_FILE_SIZE_BYTES) {
            setError(`Fichier trop volumineux (${formatFileSize(file.size)}). Maximum 5 Mo.`);
            return;
        }

        try {
            await uploadMutation.mutateAsync({ userId, file, documentType });
        } catch (err) {
            const response = (err as { response?: { data?: { message?: string } } }).response;
            setError(response?.data?.message || (err as Error).message || "L'envoi a échoué.");
        }
    };

    const handleDelete = async (documentId: string) => {
        setError(null);
        try {
            await deleteMutation.mutateAsync({ userId, documentId });
        } catch (err) {
            const response = (err as { response?: { data?: { message?: string } } }).response;
            setError(response?.data?.message || (err as Error).message || 'La suppression a échoué.');
        }
    };

    return (
        <div className="bg-surface border border-border/8 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-border/8">
                <div className="flex items-center gap-2">
                    <FileText size={16} className="text-primary" />
                    <h2 className="text-sm font-bold text-surface-text">Pièces justificatives</h2>
                </div>
                <span className="text-[11px] text-muted">
                    {documents.length} document{documents.length > 1 ? 's' : ''}
                </span>
            </div>

            <FormAlert variant="danger" message={error} onClose={() => setError(null)} />

            {canManage && (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2 p-3 rounded-xl bg-page border border-border/8">
                    <div className="flex-1">
                        <Select
                            label="Type de document"
                            sizeVariant="sm"
                            value={documentType}
                            onChange={(e) => setDocumentType(e.target.value as UserDocumentType)}
                            options={USER_DOCUMENT_TYPES.map((t) => ({
                                value: t.value,
                                label: t.label,
                            }))}
                        />
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={handleFileSelected}
                        className="hidden"
                    />

                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadMutation.isPending}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold
                        bg-primary text-primary-text hover:opacity-90 transition-opacity shrink-0
                        disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {uploadMutation.isPending ? (
                            <Loader2 size={14} className="animate-spin" />
                        ) : (
                            <UploadCloud size={14} />
                        )}
                        <span>Ajouter</span>
                    </button>
                </div>
            )}

            {isLoading ? (
                <div className="space-y-2">
                    {[1, 2].map((i) => (
                        <div key={i} className="h-16 rounded-xl bg-hover/6 animate-pulse" />
                    ))}
                </div>
            ) : documents.length === 0 ? (
                <p className="text-xs text-muted py-4 text-center">
                    Aucune pièce justificative n'a été déposée pour cet agent.
                </p>
            ) : (
                <div className="space-y-2">
                    {documents.map((doc) => (
                        <div
                            key={doc.id}
                            className="flex items-center gap-3 p-3 rounded-xl bg-page border border-border/8"
                        >
                            <span className="shrink-0">{documentIcon(doc)}</span>

                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-semibold text-surface-text truncate">
                                    {documentTypeLabel(doc.documentType)}
                                </p>
                                <p className="text-[10px] text-muted truncate">
                                    {doc.nomFichier || doc.documentName || 'Document'} · {formatFileSize(doc.tailleFichier ?? doc.documentSize ?? 0)}
                                    {doc.numeroDocument && ` · n° ${doc.numeroDocument}`}
                                </p>
                                {doc.dateExpiration && (
                                    <p className="text-[10px] text-warning-text inline-flex items-center gap-1 mt-0.5">
                                        <CalendarClock size={10} />
                                        Expire le {formatDateTime(doc.dateExpiration, '—')}
                                    </p>
                                )}
                            </div>

                            {canManage && (
                                <button
                                    type="button"
                                    onClick={() => handleDelete(doc.id)}
                                    disabled={deleteMutation.isPending}
                                    title="Supprimer ce document"
                                    aria-label={`Supprimer ${doc.nomFichier || doc.documentName || 'ce document'}`}
                                    className="p-2 rounded-xl text-muted hover:text-danger-text hover:bg-danger/10
                                    transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                                >
                                    <Trash2 size={14} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PersonnelDocumentsPanel;
