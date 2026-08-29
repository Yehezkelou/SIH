import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';

export default async function PersonnelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      <PageHeader title="Fiche agent" subtitle={`Matricule / ID : ${id}`} />
      <Card>
        <p className="text-sm text-muted">Détail de l'agent à venir.</p>
      </Card>
    </>
  );
}
