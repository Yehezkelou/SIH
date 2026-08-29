import { redirect } from 'next/navigation';

export default function IndexPage() {
  // Le vrai tableau de bord vit sous le groupe protégé (dashboard)/page.tsx
  redirect('/dashboard');
}
