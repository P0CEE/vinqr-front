import { VintagesSectionCards } from "@/components/features/vintages/vintages-section-cards";
import { VintagesTable } from "@/components/features/vintages/vintages-table";
import { Button } from "@/components/ui/button";
import { IconDownload, IconPlus } from "@tabler/icons-react";

const vintagesData = [
  {
    id: 1,
    cuvee: "Brut Tradition",
    millesime: "2020",
    appellation: "Champagne AOC",
    cepage: "Chardonnay, Pinot Noir, Meunier",
    alcool: "12.5",
    qrCodes: 3,
    status: "active",
    created: "15/01/2024",
  },
  {
    id: 2,
    cuvee: "Blanc de Blancs",
    millesime: "2019",
    appellation: "Champagne Grand Cru",
    cepage: "100% Chardonnay",
    alcool: "12",
    qrCodes: 2,
    status: "active",
    created: "20/01/2024",
  },
  {
    id: 3,
    cuvee: "Rosé de Saignée",
    millesime: "2021",
    appellation: "Champagne AOC",
    cepage: "Pinot Noir, Chardonnay",
    alcool: "12.5",
    qrCodes: 1,
    status: "active",
    created: "05/02/2024",
  },
  {
    id: 4,
    cuvee: "Millésime Exception",
    millesime: "2015",
    appellation: "Champagne Premier Cru",
    cepage: "Pinot Noir, Chardonnay",
    alcool: "12",
    qrCodes: 4,
    status: "active",
    created: "10/12/2023",
  },
  {
    id: 5,
    cuvee: "Cuvée Prestige",
    millesime: "2018",
    appellation: "Champagne Grand Cru",
    cepage: "60% Pinot Noir, 40% Chardonnay",
    alcool: "12.5",
    qrCodes: 2,
    status: "active",
    created: "01/03/2024",
  },
  {
    id: 6,
    cuvee: "Brut Nature",
    millesime: "2022",
    appellation: "Champagne AOC",
    cepage: "Chardonnay, Pinot Noir",
    alcool: "12",
    qrCodes: 0,
    status: "draft",
    created: "10/03/2024",
  },
  {
    id: 7,
    cuvee: "Demi-Sec",
    millesime: "2021",
    appellation: "Champagne AOC",
    cepage: "Meunier, Chardonnay",
    alcool: "11.5",
    qrCodes: 0,
    status: "draft",
    created: "12/03/2024",
  },
  {
    id: 8,
    cuvee: "Extra Brut",
    millesime: "2020",
    appellation: "Champagne AOC",
    cepage: "Pinot Noir, Chardonnay",
    alcool: "12",
    qrCodes: 0,
    status: "draft",
    created: "15/03/2024",
  },
];

export default function VintagesPage() {
  const draftVintages = 3;

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* Header */}
          <div className="flex items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🍾</div>
              <div>
                <div className="text-muted-foreground text-sm">
                  Vous avez{" "}
                  <span className="text-base font-medium text-gray-900 dark:text-gray-100">
                    {draftVintages} cuvées en brouillon
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  prêtes à être activées avec des QR codes !
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
                className="text-primary hover:text-primary/90"
              >
                <IconPlus className="h-4 w-4" />
                Nouvelle Cuvée
              </Button>
            </div>
          </div>

          <VintagesSectionCards
            totalVintages={8}
            activeVintages={5}
            totalQRCodes={12}
            lastAdded="Il y a 3 jours"
          />

          <VintagesTable data={vintagesData} />
        </div>
      </div>
    </div>
  );
}
