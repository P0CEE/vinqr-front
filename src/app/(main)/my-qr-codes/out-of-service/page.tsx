import { ArchivedQRCodesTable } from "@/components/features/qr-codes/archived-qr-codes-table";
import { ArchivedSectionCards } from "@/components/features/qr-codes/archived-section-cards";
import { Button } from "@/components/ui/button";
import { IconDownload, IconTrash } from "@tabler/icons-react";

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
  const restorableQRCodes = 3;

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* Header */}
          <div className="flex items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🗃️</div>
              <div>
                <div className="text-muted-foreground text-sm">
                  Vous avez{" "}
                  <span className="text-base font-medium text-gray-900 dark:text-gray-100">
                    {restorableQRCodes} QR codes archivés
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  qui peuvent être restaurés facilement !
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline">
                <IconDownload className="h-4 w-4" />
                Export
              </Button>
              <Button
                variant="outline"
                className="text-destructive hover:text-destructive/90"
              >
                <IconTrash className="h-4 w-4" />
                Nettoyer les désactivés
              </Button>
            </div>
          </div>

          <ArchivedSectionCards 
            archivedQRCodes={6}
            totalScans={8917}
            readyToRestore={2}
            deactivated={2}
          />

          <ArchivedQRCodesTable data={historyData} />
        </div>
      </div>
    </div>
  );
}