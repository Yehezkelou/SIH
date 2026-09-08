import { PersonnelDetailView } from '@/features/personnel';

export default async function PersonnelDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return <PersonnelDetailView agentId={id} />;
}
