import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

/**
 * Profil patient — transposition de la maquette de référence (docs/ADMIN_PANEL.md §5.2).
 * Données factices pour l'instant ; à brancher sur /api/patient/:id.
 */
export default async function PatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <>
      <PageHeader
        title="Profil patient"
        subtitle={`Dossier ${id}`}
        actions={
          <>
            <Button variant="outline">Imprimer</Button>
            <Button>Éditer</Button>
          </>
        }
      />

      {/* Rangée 1 : identité · infos générales · anamnèse */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="flex flex-col items-center text-center">
          <div className="h-28 w-28 rounded-full bg-surface-2" />
          <p className="mt-4 text-lg font-semibold text-text">Nom Prénom</p>
          <p className="mt-1 text-sm text-link">+33 0 00 00 00 00</p>
          <p className="text-sm text-link">patient@example.com</p>
        </Card>

        <Card title="Informations générales">
          <FieldRow label="Date de naissance" value="—" />
          <FieldRow label="Adresse" value="—" />
          <FieldRow label="Date d'enregistrement" value="—" />
        </Card>

        <Card title="Anamnèse">
          <FieldRow label="Allergies" value="—" />
          <FieldRow label="Maladies chroniques" value="—" />
          <FieldRow label="Groupe sanguin" value="—" />
          <FieldRow label="Antécédents" value="—" />
        </Card>
      </div>

      {/* Rangée 2 : visites (onglets) · fichiers/notes */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex gap-6 border-b border-border">
            <span className="border-b-2 border-brand-600 pb-2 text-sm font-medium text-brand-600">
              Visites à venir
            </span>
            <span className="pb-2 text-sm text-muted">Visites passées</span>
            <span className="pb-2 text-sm text-muted">Traitements planifiés</span>
          </div>
          <p className="text-sm text-muted">Aucune visite à afficher.</p>
        </Card>

        <div className="space-y-6">
          <Card title="Fichiers" action={<Button variant="outline" size="sm">Télécharger</Button>}>
            <p className="text-sm text-muted">Aucun fichier.</p>
          </Card>
          <Card title="Notes" action={<Button variant="outline" size="sm">Télécharger</Button>}>
            <p className="text-sm text-muted">Aucune note.</p>
          </Card>
        </div>
      </div>

      <div className="mt-4">
        <Badge tone="teal">Exemple de statut</Badge>
      </div>
    </>
  );
}

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-border py-2 last:border-0">
      <span className="text-sm text-muted">{label}</span>
      <span className="text-sm font-medium text-text">{value}</span>
    </div>
  );
}
