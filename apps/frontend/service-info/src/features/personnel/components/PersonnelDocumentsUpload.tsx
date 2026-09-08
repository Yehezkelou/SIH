'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    UploadCloud,
    FileText,
    FileImage,
    File as FileGeneric,
    Trash2,
    AlertCircle,
    ShieldCheck,
    Hash,
    Loader2,
} from 'lucide-react';
import { PendingDocument, UserDocumentType, USER_DOCUMENT_TYPES } from '../schema';
import { Select } from '@/components/ui/Select';

interface PersonnelDocumentsUploadProps {
    documents: PendingDocument[];
    onChange: (documents: PendingDocument[]) => void;
    isUploading?: boolean;
    uploadProgressText?: string;
}

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 Mo
const ACCEPTED_EXTENSIONS = ['.pdf', '.png', '.jpg', '.jpeg'];
const ACCEPTED_MIME_TYPES = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];

function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} o`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} Mo`;
}

function getFileIcon(fileName: string) {
    const lower = fileName.toLowerCase();
    if (lower.endsWith('.pdf')) {
        return <FileText size={20} className="text-danger" />;
    }
    if (lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.jpeg')) {
        return <FileImage size={20} className="text-info" />;
    }
    return <FileGeneric size={20} className="text-muted" />;
}

export function PersonnelDocumentsUpload({
    documents,
    onChange,
    isUploading = false,
    uploadProgressText,
}: PersonnelDocumentsUploadProps) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedType, setSelectedType] = useState<UserDocumentType>('CNI');
    const [docNumber, setDocNumber] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleFiles = (fileList: FileList | File[]) => {
        setErrorMessage(null);
        const filesArray = Array.from(fileList);
        const validNewDocs: PendingDocument[] = [];

        for (const file of filesArray) {
            // 1. Validation taille
            if (file.size > MAX_FILE_SIZE_BYTES) {
                setErrorMessage(
                    `Le fichier "${file.name}" dépasse la taille maximale autorisée (5 Mo).`
                );
                continue;
            }

            // 2. Validation type
            const extension = '.' + file.name.split('.').pop()?.toLowerCase();
            const isValidExt = ACCEPTED_EXTENSIONS.includes(extension);
            const isValidMime = ACCEPTED_MIME_TYPES.includes(file.type);

            if (!isValidExt && !isValidMime) {
                setErrorMessage(
                    `Format non supporté pour "${file.name}". Seuls les formats PDF, PNG et JPG sont acceptés.`
                );
                continue;
            }

            // 3. Éviter les doublons stricts (même nom et même taille)
            const isDuplicate = documents.some(
                (d) => d.file.name === file.name && d.file.size === file.size
            );
            if (isDuplicate) {
                setErrorMessage(`Le document "${file.name}" a déjà été ajouté.`);
                continue;
            }

            validNewDocs.push({
                id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                file,
                documentType: selectedType,
                numeroDocument: docNumber.trim() || undefined,
            });
        }

        if (validNewDocs.length > 0) {
            onChange([...documents, ...validNewDocs]);
            // Réinitialiser le numéro de document après ajout
            setDocNumber('');
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
            // reset file input
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const removeDocument = (id: string) => {
        onChange(documents.filter((d) => d.id !== id));
    };

    const selectedTypeConfig = USER_DOCUMENT_TYPES.find((t) => t.value === selectedType);

    return (
        <div className="bg-surface border border-border/8 rounded-2xl p-6 shadow-xs space-y-5">
            {/* En-tête */}
            <div className="flex items-start justify-between pb-3 border-b border-border/8">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <UploadCloud size={18} />
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-surface-text">
                            Dossier & Justificatifs RH
                        </h2>
                        <p className="text-xs text-muted">
                            Pièces requises pour le recrutement et l'audit
                        </p>
                    </div>
                </div>

                {documents.length > 0 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                        {documents.length} {documents.length > 1 ? 'fichiers' : 'fichier'}
                    </span>
                )}
            </div>

            {/* Sélecteur de type de justificatif et référence */}
            <div className="bg-page/50 border border-border/8 rounded-xl p-3.5 space-y-3">
                <div className="space-y-1.5">
                    <Select
                        label="Type de document à joindre"
                        icon={FileText}
                        options={USER_DOCUMENT_TYPES}
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value as UserDocumentType)}
                    />
                    {selectedTypeConfig && (
                        <p className="text-[11px] text-muted italic">
                            {selectedTypeConfig.description}
                        </p>
                    )}
                </div>

                {/* Champ facultatif: N° de document (CNI, RPPS, etc.) */}
                <div className="space-y-1">
                    <label className="flex items-center gap-1 text-[11px] text-muted">
                        <Hash size={12} />
                        <span>Numéro / Référence de la pièce (optionnel)</span>
                    </label>
                    <input
                        type="text"
                        placeholder="ex: N° CNI 123456789 ou Réf. Diplôme"
                        value={docNumber}
                        onChange={(e) => setDocNumber(e.target.value)}
                        className="w-full text-xs bg-surface border border-border/8 rounded-xl px-3 py-1.5 text-surface-text placeholder:text-muted/60 focus:outline-none focus:border-primary transition-colors"
                    />
                </div>
            </div>

            {/* Zone de Drag & Drop */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer select-none ${
                    isDragging
                        ? 'border-primary bg-primary/5 scale-[1.01]'
                        : 'border-border/12 hover:border-primary/50 hover:bg-hover/6'
                }`}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
                    onChange={handleFileInputChange}
                    className="hidden"
                />

                <motion.div
                    animate={{ y: isDragging ? -4 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center gap-2"
                >
                    <div className="w-12 h-12 rounded-2xl bg-primary/8 text-primary flex items-center justify-center">
                        <UploadCloud size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-surface-text">
                            Glissez vos justificatifs ici, ou{' '}
                            <span className="text-primary underline">parcourir</span>
                        </p>
                        <p className="text-[11px] text-muted mt-0.5">
                            PDF, PNG, JPG (maximum 5 Mo par fichier)
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Message d'erreur local (taille ou format) */}
            <AnimatePresence>
                {errorMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="flex items-start gap-2 p-2.5 rounded-xl bg-danger/10 border border-danger/20 text-danger text-xs"
                    >
                        <AlertCircle size={14} className="shrink-0 mt-0.5" />
                        <span className="flex-1">{errorMessage}</span>
                        <button
                            type="button"
                            onClick={() => setErrorMessage(null)}
                            className="text-danger hover:opacity-80 text-[10px] font-bold"
                        >
                            ✕
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Indicateur d'upload en cours */}
            {isUploading && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                    <Loader2 size={16} className="animate-spin shrink-0" />
                    <span>{uploadProgressText || 'Envoi des pièces justificatives en cours...'}</span>
                </div>
            )}

            {/* Liste des documents prêts */}
            <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-surface-text">
                    <span>Justificatifs joints ({documents.length})</span>
                    {documents.length > 0 && (
                        <button
                            type="button"
                            onClick={() => onChange([])}
                            className="text-[11px] text-muted hover:text-danger transition-colors cursor-pointer"
                        >
                            Tout retirer
                        </button>
                    )}
                </div>

                {documents.length === 0 ? (
                    <div className="text-center py-6 px-4 rounded-xl border border-border/8 bg-page/40">
                        <FileGeneric size={24} className="mx-auto text-muted/50 mb-1.5" />
                        <p className="text-xs text-muted font-medium">Aucun document joint pour le moment</p>
                        <p className="text-[10px] text-muted/70 mt-0.5">
                            Vous pouvez ajouter un ou plusieurs justificatifs (CNI, diplôme, RPPS, contrat)
                        </p>
                    </div>
                ) : (
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                        <AnimatePresence initial={false}>
                            {documents.map((doc) => {
                                const typeInfo = USER_DOCUMENT_TYPES.find(
                                    (t) => t.value === doc.documentType
                                );
                                return (
                                    <motion.div
                                        key={doc.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                                        className="flex items-center justify-between gap-3 p-2.5 rounded-xl border border-border/8 bg-surface hover:bg-hover/6 transition-colors"
                                    >
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            <div className="shrink-0">{getFileIcon(doc.file.name)}</div>
                                            <div className="min-w-0">
                                                <p className="text-xs font-medium text-surface-text truncate max-w-[180px] sm:max-w-[220px]">
                                                    {doc.file.name}
                                                </p>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <span className="inline-block text-[10px] font-semibold text-primary bg-primary/8 px-1.5 py-0.5 rounded">
                                                        {typeInfo?.label || doc.documentType}
                                                    </span>
                                                    <span className="text-[10px] text-muted">
                                                        {formatFileSize(doc.file.size)}
                                                    </span>
                                                    {doc.numeroDocument && (
                                                        <span className="text-[10px] text-muted truncate max-w-[100px]">
                                                            • N° {doc.numeroDocument}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <motion.button
                                            type="button"
                                            whileHover={{ scale: 1.15 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => removeDocument(doc.id)}
                                            disabled={isUploading}
                                            className="p-1.5 rounded-lg text-muted hover:text-danger hover:bg-danger/10 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                                            title="Retirer ce document"
                                        >
                                            <Trash2 size={15} />
                                        </motion.button>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Note de conformité RH */}
            <div className="flex items-start gap-2 p-3 rounded-xl bg-page/60 border border-border/8 text-[11px] text-muted">
                <ShieldCheck size={15} className="text-success shrink-0 mt-0.5" />
                <p>
                    Les justificatifs sont chiffrés et archivés de manière sécurisée conformément aux exigences
                    de conformité hospitalière et au secret médical.
                </p>
            </div>
        </div>
    );
}

export default PersonnelDocumentsUpload;
