import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { mockAdmissions } from "@/features/admission/api/mock";
import { AdmissionTable } from "@/features/admission/components/AdmissionTable";
import { admissionTypeLabel } from "@/features/admission/utils/format";
import { AdmissionType } from "@/features/admission/types";

export default function DashboardPage() {
  const recent = mockAdmissions.slice(0, 5);

  const byType = Object.values(AdmissionType).map((t) => ({
    type: t,
    count: mockAdmissions.filter((a) => a.admissionType === t).length,
  }));
  const total = mockAdmissions.length;

  return (
    <>
      <PageHeader
        title="Tableau de bord"
        description="Vue d'ensemble de l'activité des admissions — Institut de Cardiologie d'Abidjan"
        actions={
          <>
            <Button variant="outline" size="sm" leftIcon="printer">Imprimer</Button>
            <Link href="/admissions/nouvelle"><Button size="sm" leftIcon="plus">Nouvelle admission</Button></Link>
          </>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Admissions du jour" value={18} icon="userPlus" tone="emerald" trend={{ value: "12%", up: true }} />
        <StatCard label="Séjours en cours" value={42} icon="bed" tone="sky" hint="Capacité : 60 lits" />
        <StatCard label="En attente de prise en charge" value={3} icon="clock" tone="amber" />
        <StatCard label="Sorties prévues aujourd'hui" value={7} icon="logout" tone="violet" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Admissions récentes */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">Admissions récentes</h2>
            <Link href="/admissions" className="text-[12px] font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1">
              Voir tout <Icon name="chevronRight" size={14} />
            </Link>
          </div>
          <AdmissionTable data={recent} />
        </div>

        {/* Répartition par type */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader title="Répartition par type" subtitle="Admissions enregistrées" icon="activity" />
            <CardBody className="flex flex-col gap-3">
              {byType.map(({ type, count }) => {
                const pct = total ? Math.round((count / total) * 100) : 0;
                return (
                  <div key={type}>
                    <div className="flex items-center justify-between text-[12px] mb-1">
                      <span className="font-medium text-slate-600">{admissionTypeLabel[type]}</span>
                      <span className="text-slate-400">{count} · {pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-full bg-emerald-500" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Accès rapides" icon="dashboard" />
            <CardBody className="grid grid-cols-2 gap-2">
              {[
                { label: "Admissions", href: "/admissions", icon: "clipboard" as const },
                { label: "Nouvelle", href: "/admissions/nouvelle", icon: "userPlus" as const },
                { label: "Séjours", href: "/sejours", icon: "bed" as const },
                { label: "Payeurs", href: "/payeurs", icon: "creditCard" as const },
              ].map((q) => (
                <Link
                  key={q.label}
                  href={q.href}
                  className="flex flex-col items-center justify-center gap-2 py-4 rounded-lg border border-slate-200 text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                >
                  <Icon name={q.icon} size={20} />
                  <span className="text-[12px] font-medium">{q.label}</span>
                </Link>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
