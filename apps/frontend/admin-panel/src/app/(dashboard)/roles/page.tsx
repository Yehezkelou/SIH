import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';

export default function RolesPage() {
  return (
    <>
      <PageHeader title="Rôles & permissions" subtitle="Matrice permission ↔ rôle (RBAC)" />
      <Card>
        <p className="text-sm text-muted">Matrice des permissions à venir (feature `roles`).</p>
      </Card>
    </>
  );
}
