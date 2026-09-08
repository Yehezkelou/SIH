import { IdCard } from 'lucide-react';
import { PagePlaceholder } from '@/components/ui/PagePlaceholder';

export default async function PatientDetailPage({
    params,
}: {
    params: Promise<{ uniquePatientId: string }>;
}) {
    const { uniquePatientId } = await params;

    return (
        <PagePlaceholder
            icon={IdCard}
            title="Dossier patient"
            description={`La fiche détaillée du dossier ${uniquePatientId} n'est pas encore implémentée.`}
        />
    );
}
