import { Settings } from 'lucide-react';
import { PagePlaceholder } from '@/components/ui/PagePlaceholder';

export default function ParametresPage() {
    return (
        <PagePlaceholder
            icon={Settings}
            title="Paramètres"
            description="Les préférences du module, dont le choix du thème, viendront ici."
        />
    );
}
