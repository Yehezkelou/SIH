import { IdCard } from 'lucide-react';
import { PagePlaceholder } from '@/components/ui/PagePlaceholder';

export default async function PersonnelDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <PagePlaceholder
            icon={IdCard}
            title="Fiche agent"
            description={`La fiche détaillée de l'agent ${id} n'est pas encore implémentée.`}
        />
    );
}
