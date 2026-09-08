'use client';

import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SearchPatients } from '../api/api-patient';
import { Patient, SearchPatientParams } from '../schema';

/**
 * Champs qui déclenchent, côté serveur, la branche « correspondance exacte »
 * de `findPatient` : un seul suffit à identifier formellement un dossier.
 */
const UNIQUE_FIELDS = [
    'numIdentityNational',
    'numSecuSocial',
    'numeroPassport',
    'numCMU',
    'uniquePatientId',
] as const;

export interface DuplicateCandidate {
    patient: Patient;
    /** Champs de la saisie que ce dossier reproduit à l'identique. */
    matchedOn: string[];
    /** 0 à 100 — poids des correspondances, les identifiants pesant le plus. */
    score: number;
}

export interface DuplicateSearchState {
    candidates: DuplicateCandidate[];
    /** Un identifiant unique a désigné un dossier existant : création à bloquer. */
    hasExactMatch: boolean;
    isSearching: boolean;
    /** La saisie est-elle assez fournie pour qu'une recherche ait du sens ? */
    isArmed: boolean;
}

/** Libellés lisibles pour expliquer d'où vient la correspondance. */
const FIELD_LABELS: Record<string, string> = {
    nom: 'Nom',
    prenom: 'Prénom',
    dateNaissance: 'Date de naissance',
    numero: 'Téléphone',
    email: 'Email',
    numIdentityNational: 'N° identité nationale',
    numSecuSocial: 'N° sécurité sociale',
    numeroPassport: 'N° passeport',
    numCMU: 'N° CMU',
};

function normalise(value?: string | null): string {
    return (value ?? '')
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .trim()
        .toLowerCase();
}

/**
 * Compare la saisie en cours à un dossier existant et explique la ressemblance.
 *
 * Le score n'est pas une probabilité : c'est un ordre de tri. Un identifiant
 * unique identique vaut à lui seul un doublon certain ; un nom et une date de
 * naissance identiques constituent une alerte forte ; un nom seul, un simple
 * signal.
 */
function scoreCandidate(query: SearchPatientParams, patient: Patient): DuplicateCandidate {
    const matchedOn: string[] = [];
    let score = 0;

    for (const field of UNIQUE_FIELDS) {
        const queryValue = normalise(query[field as keyof SearchPatientParams] as string);
        const patientValue = normalise(
            patient[field as keyof Patient] as string | null | undefined
        );
        if (queryValue && queryValue === patientValue) {
            matchedOn.push(field);
            score += 100;
        }
    }

    if (normalise(query.nom) && normalise(query.nom) === normalise(patient.nom)) {
        matchedOn.push('nom');
        score += 30;
    }
    if (normalise(query.prenom) && normalise(query.prenom) === normalise(patient.prenom)) {
        matchedOn.push('prenom');
        score += 25;
    }
    if (query.dateNaissance && patient.dateNaissance) {
        const a = new Date(query.dateNaissance).toDateString();
        const b = new Date(patient.dateNaissance).toDateString();
        if (a !== 'Invalid Date' && a === b) {
            matchedOn.push('dateNaissance');
            score += 30;
        }
    }
    if (normalise(query.numero) && normalise(query.numero) === normalise(patient.numero)) {
        matchedOn.push('numero');
        score += 20;
    }
    if (normalise(query.email) && normalise(query.email) === normalise(patient.email)) {
        matchedOn.push('email');
        score += 20;
    }

    return { patient, matchedOn, score: Math.min(100, score) };
}

export function labelForField(field: string): string {
    return FIELD_LABELS[field] ?? field;
}

/**
 * Recherche de doublons au fil de la saisie.
 *
 * Le formulaire appelle ce hook à chaque frappe ; l'interrogation du serveur
 * est différée de 500 ms et n'a lieu qu'une fois la saisie suffisamment
 * discriminante — un nom de trois lettres suffirait à ramener la moitié de
 * l'index. La requête est mise en cache par TanStack Query, donc revenir sur
 * un champ déjà saisi ne relance rien.
 */
export function useDuplicateSearch(draft: SearchPatientParams): DuplicateSearchState {
    const [debounced, setDebounced] = useState<SearchPatientParams>({});

    // Signature stable de la saisie : évite de relancer l'effet à chaque rendu
    // alors que l'objet `draft` est recréé par le formulaire.
    const signature = JSON.stringify(draft);

    useEffect(() => {
        const handle = setTimeout(() => setDebounced(JSON.parse(signature)), 500);
        return () => clearTimeout(handle);
    }, [signature]);

    const { armedQuery, isArmed } = useMemo(() => {
        const hasUniqueId = UNIQUE_FIELDS.some(
            (field) => (debounced[field as keyof SearchPatientParams] as string)?.trim()
        );
        // Un identifiant unique arme immédiatement ; sinon il faut un nom d'au
        // moins trois caractères, éventuellement précisé par le prénom.
        const nom = debounced.nom?.trim() ?? '';
        const armed = hasUniqueId || nom.length >= 3;

        const query: SearchPatientParams = { limit: 5, page: 1 };
        if (hasUniqueId) {
            for (const field of UNIQUE_FIELDS) {
                const value = (debounced[field as keyof SearchPatientParams] as string)?.trim();
                if (value) (query as Record<string, unknown>)[field] = value;
            }
        } else if (armed) {
            query.nom = nom;
            if ((debounced.prenom?.trim().length ?? 0) >= 3) query.prenom = debounced.prenom?.trim();
        }

        return { armedQuery: query, isArmed: armed };
    }, [debounced]);

    const { data, isFetching } = useQuery({
        queryKey: ['PatientDuplicates', armedQuery],
        queryFn: () => SearchPatients(armedQuery),
        enabled: isArmed,
        staleTime: 30 * 1000,
        // Une recherche de doublons ne doit jamais faire échouer la saisie :
        // en cas de panne, on n'insiste pas et le formulaire reste utilisable.
        retry: false,
    });

    const candidates = useMemo(() => {
        if (!data?.patients?.length) return [];
        return data.patients
            .map((patient) => scoreCandidate(debounced, patient))
            .sort((a, b) => b.score - a.score);
    }, [data, debounced]);

    return {
        candidates,
        hasExactMatch: Boolean(data?.exactMatch) && candidates.length > 0,
        isSearching: isFetching,
        isArmed,
    };
}
