'use client';

import React, { useState } from 'react';
import { FileText, Upload, Trash2, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { usePermissions } from '@/hooks/usePermissions';
import { useUser } from '@/hooks/useUser';
import { Admission, AdmissionDocument } from '../../schema';
import { useDocuments, useRemoveDocument } from '../../hooks/useAdmissions';
import {
    ADMISSION_PERMISSIONS,
    documentTypeLabel,
    formatDateTime,
    formatSize,
    isClosed,
} from '../../utils/admissionHelpers';
import { parseApiError } from '../../utils/parseApiError';
import { DocumentUploadModal } from '../DocumentUploadModal';

export function DocumentsPanel({ admission }: { admission: Admission }) {
    const { can } = usePermissions();
    const { data: user } = useUser();
    const { data: documents } = useDocuments(admission.id);
    const removeMutation = useRemoveDocument();

    const [uploadOpen, setUploadOpen] = useState(false);
    const [toRemove, setToRemove] = useState<AdmissionDocument | null>(null);
    const [error, setError] = useState<string | null>(null);

    const list = documents ?? admission.documents ?? [];
    const editable = can(ADMISSION_PERMISSIONS.UPDATE) && !isClosed(admission);

    const confirmRemove = async () => {
        if (!toRemove) return;
        setError(null);
        try {
            await removeMutation.mutateAsync({
                documentId: toRemove.id,
                admissionId: admission.id,
                deletedBy: user?.id ?? '',
            });
            setToRemove(null);
        } catch (e) {
            setError(parseApiError(e).globalMessage);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <p className="text-xs text-muted">{list.length} document{list.length > 1 ? 's' : ''}</p>
                {editable && (
                    <Button variant="secondary" size="sm" icon={Upload} onClick={() => setUploadOpen(true)}>
                        Téléverser
                    </Button>
                )}
            </div>

            {list.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border/12 p-8 text-center">
                    <FileText size={22} className="mx-auto text-muted mb-2" />
                    <p className="text-xs text-muted">Aucun document attaché à cette admission.</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {list.map((d) => (
                        <div key={d.id} className="rounded-2xl border border-border/8 bg-page/40 p-3.5 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-primary/8 border border-border/8 flex items-center justify-center shrink-0">
                                <FileText size={16} className="text-surface-text" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-semibold text-surface-text truncate">
                                    {d.documentName || 'Document'}
                                </p>
                                <div className="flex items-center gap-3 text-[11px] text-muted mt-0.5 flex-wrap">
                                    <span>{documentTypeLabel(d.documentType)}</span>
                                    <span>{formatSize(d.documentSize)}</span>
                                    <span>{formatDateTime(d.attachedAt ?? d.createdAt)}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                                {d.documentUrl && (
                                    <a
                                        href={d.documentUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-1.5 rounded-lg text-muted hover:text-surface-text hover:bg-hover/6 transition-colors cursor-pointer"
                                    >
                                        <Download size={13} />
                                    </a>
                                )}
                                {editable && (
                                    <button
                                        type="button"
                                        onClick={() => setToRemove(d)}
                                        className="p-1.5 rounded-lg text-muted hover:text-danger-text hover:bg-danger/10 transition-colors cursor-pointer"
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {uploadOpen && (
                <DocumentUploadModal admission={admission} open onClose={() => setUploadOpen(false)} />
            )}

            <ConfirmDialog
                open={Boolean(toRemove)}
                onClose={() => setToRemove(null)}
                onConfirm={confirmRemove}
                title="Supprimer le document"
                message={`Confirmez-vous la suppression de « ${toRemove?.documentName ?? 'ce document'} » ?`}
                isLoading={removeMutation.isPending}
                error={error}
            />
        </div>
    );
}

export default DocumentsPanel;
