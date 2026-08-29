import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';

export default function UrgencesPage() {
  return (
    <>
      <PageHeader title="Urgences" subtitle="File et statut des prises en charge" />
      <Card>
        <p className="text-sm text-muted">File des urgences à venir (feature `urgences`).</p>
      </Card>
    </>
  );
}
