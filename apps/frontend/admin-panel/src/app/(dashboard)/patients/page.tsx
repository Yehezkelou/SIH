import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function PatientsPage() {
  return (
    <>
      <PageHeader
        title="Patients"
        subtitle="Recherche et gestion des dossiers"
        actions={<Button>Nouveau patient</Button>}
      />
      <Card>
        <p className="text-sm text-muted">Liste des patients à venir (feature `patients`).</p>
      </Card>
    </>
  );
}
