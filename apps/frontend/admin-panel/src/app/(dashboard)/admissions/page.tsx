import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';

export default function AdmissionsPage() {
  return (
    <>
      <PageHeader title="Admissions" subtitle="Suivi des admissions et hospitalisations" />
      <Card>
        <p className="text-sm text-muted">Table des admissions à venir (feature `admissions`).</p>
      </Card>
    </>
  );
}
