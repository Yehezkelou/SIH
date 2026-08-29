import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';

export default function StatistiquesPage() {
  return (
    <>
      <PageHeader title="Statistiques" subtitle="Indicateurs d'activité" />
      <Card>
        <p className="text-sm text-muted">Graphes et exports à venir.</p>
      </Card>
    </>
  );
}
