import { DataTable } from "@/components/pages/my-qr-codes/archived/data-table";
import { Button } from "@/components/ui/button";
import { IconArchive } from "@tabler/icons-react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Historique | Vin'QR",
  description: "Archives et QR codes désactivés.",
};

const historyData = [
  {
    id: 1,
    cuvee: "Brut Réserve",
    millesime: "2019",
    url: "brut-reserve-2019",
    scans: 1247,
    deactivated: "15/11/2024",
    status: "archived",
    reason: "Fin de production",
  },
  {
    id: 2,
    cuvee: "Cuvée Spéciale",
    millesime: "2020",
    url: "cuvee-speciale-2020",
    scans: 892,
    deactivated: "20/10/2024",
    status: "deactivated",
    reason: "Désactivé manuellement",
  },
  {
    id: 3,
    cuvee: "Rosé Vintage",
    millesime: "2018",
    url: "rose-vintage-2018",
    scans: 2156,
    deactivated: "01/12/2024",
    status: "archived",
    reason: "Stock épuisé",
  },
  {
    id: 4,
    cuvee: "Blanc de Noirs",
    millesime: "2017",
    url: "blanc-de-noirs-2017",
    scans: 756,
    deactivated: "10/11/2024",
    status: "deactivated",
    reason: "Erreur de configuration",
  },
  {
    id: 5,
    cuvee: "Cuvée Prestige",
    millesime: "2016",
    url: "cuvee-prestige-2016",
    scans: 3421,
    deactivated: "25/11/2024",
    status: "archived",
    reason: "Fin de commercialisation",
  },
  {
    id: 6,
    cuvee: "Brut Nature",
    millesime: "2019",
    url: "brut-nature-2019",
    scans: 445,
    deactivated: "05/12/2024",
    status: "deactivated",
    reason: "Reformulation produit",
  },
];

export default function HistoryPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* Header */}
          <div className="flex items-center justify-between px-4 lg:px-6">
            <div>
              <h1 className="text-2xl font-semibold">Historique</h1>
              <p className="text-muted-foreground">
                Archives et QR codes désactivés
              </p>
            </div>
            <Button variant="outline">
              <IconArchive className="mr-2 h-4 w-4" />
              Archiver sélection
            </Button>
          </div>
          <div className="px-4 lg:px-6">
            <DataTable data={historyData} />
          </div>
        </div>
      </div>
    </div>
  );
}
