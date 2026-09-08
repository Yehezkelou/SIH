import { AdmissionDetailView } from '@/features/admissions/components/AdmissionDetailView';

export default async function AdmissionDetailPage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ n?: string }>;
}) {
    const { id } = await params;
    const { n } = await searchParams;

    return <AdmissionDetailView admissionId={id} admissionNumber={n} />;
}
