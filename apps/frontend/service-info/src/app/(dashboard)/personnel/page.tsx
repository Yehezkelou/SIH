import { redirect } from 'next/navigation';
import { ROUTES } from '@/config/routes';

export default function PersonnelIndexPage() {
    redirect(ROUTES.PERSONNEL_LIST);
}
