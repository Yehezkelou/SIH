'use client';

import React from 'react';
import {
    AdmissionType,
    AdmissionStatus,
} from '../schema';
import { statusLabel, statusTone, StatusTone, typeLabel } from '../utils/admissionHelpers';
import { Activity, BedDouble, Stethoscope, Ambulance } from 'lucide-react';

const TONE_CLASSES: Record<StatusTone, string> = {
    success: 'bg-success/10 text-success-text border-success/20',
    info: 'bg-info/10 text-info-text border-info/20',
    warning: 'bg-warning/10 text-warning-text border-warning/20',
    danger: 'bg-danger/10 text-danger-text border-danger/20',
    neutral: 'bg-hover/6 text-muted border-border/8',
};

export function AdmissionStatusBadge({ status, size = 'md' }: { status?: AdmissionStatus | string; size?: 'sm' | 'md' }) {
    const tone = statusTone(status);
    const dim = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-xs';
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold border ${dim} ${TONE_CLASSES[tone]}`}>
            <Activity size={size === 'sm' ? 10 : 12} />
            {statusLabel(status)}
        </span>
    );
}

const TYPE_ICON = {
    INPATIENT: BedDouble,
    OUTPATIENT: Stethoscope,
    EMERGENCY: Ambulance,
} as const;

export function AdmissionTypeBadge({ type }: { type?: AdmissionType | string }) {
    const Icon = TYPE_ICON[type as AdmissionType] ?? Stethoscope;
    const danger = type === 'EMERGENCY';
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                danger ? 'bg-danger/10 text-danger-text border-danger/20' : 'bg-info/10 text-info-text border-info/20'
            }`}
        >
            <Icon size={12} />
            {typeLabel(type)}
        </span>
    );
}

export default AdmissionStatusBadge;
