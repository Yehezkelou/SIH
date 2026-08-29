import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function PersonnelPage() {
  return (
    <>
      <PageHeader
        title="Personnel"
        subtitle="Comptes, rôles et statut MFA"
        actions={<Button>Nouvel agent</Button>}
      />
      <Card>
        <p className="text-sm text-muted">Table du personnel à venir (feature `personnel`).</p>
      </Card>
    </>
  );
}
