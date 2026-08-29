import { PageHeader } from '@/components/ui/PageHeader';
import { KpiTile } from '@/components/ui/KpiTile';
import { Card } from '@/components/ui/Card';

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Vue d'ensemble" subtitle="Activité du jour" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <KpiTile label="Admissions du jour" value="—" icon="admission" />
        <KpiTile label="Patients actifs" value="—" icon="patient" />
        <KpiTile label="Urgences en attente" value="—" icon="urgency" />
        <KpiTile label="Personnel en service" value="—" icon="users" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card title="Admissions (30 jours)" className="lg:col-span-2">
          <div className="flex h-56 items-center justify-center text-sm text-muted">Graphe à venir</div>
        </Card>
        <Card title="Répartition par service">
          <div className="flex h-56 items-center justify-center text-sm text-muted">Graphe à venir</div>
        </Card>
      </div>
    </>
  );
}
