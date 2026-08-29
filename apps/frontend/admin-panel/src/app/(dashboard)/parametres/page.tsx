import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';

export default function ParametresPage() {
  return (
    <>
      <PageHeader title="Paramètres" subtitle="Référentiels et configuration système" />
      <Card>
        <p className="text-sm text-muted">Services/unités, types de documents, configuration à venir.</p>
      </Card>
    </>
  );
}
