import { DataTable } from "@/components/pages/qr-codes/active/data-table";
import { Button } from "@/components/ui/button";
import { IconDownload, IconPlus } from "@tabler/icons-react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Codes Actifs | Vin'QR",
  description: "Gérez vos QR codes actuellement en circulation.",
};

// Données exemple
const qrCodesData = [
  {
    id: 1,
    cuvee: "Brut Tradition",
    millesime: "2020",
    type: "Champagne Brut",
    url: "brut-tradition-2020",
    scans: 342,
    lastScan: "Il y a 2 heures",
    created: "15/01/2024",
    status: "active",
  },
  {
    id: 2,
    cuvee: "Blanc de Blancs",
    millesime: "2019",
    type: "Champagne Blanc",
    url: "blanc-de-blancs-2019",
    scans: 287,
    lastScan: "Il y a 5 heures",
    created: "20/01/2024",
    status: "active",
  },
  {
    id: 3,
    cuvee: "Rosé de Saignée",
    millesime: "2021",
    type: "Champagne Rosé",
    url: "rose-saignee-2021",
    scans: 156,
    lastScan: "Hier à 18h30",
    created: "05/02/2024",
    status: "active",
  },
  {
    id: 4,
    cuvee: "Millésime Exception",
    millesime: "2015",
    type: "Champagne Millésimé",
    url: "millesime-exception-2015",
    scans: 523,
    lastScan: "Il y a 30 minutes",
    created: "10/12/2023",
    status: "active",
  },
  {
    id: 5,
    cuvee: "Cuvée Prestige",
    millesime: "2018",
    type: "Champagne Premium",
    url: "cuvee-prestige-2018",
    scans: 89,
    lastScan: "Il y a 3 jours",
    created: "01/03/2024",
    status: "active",
  },
];

export default function ActiveQRCodesPage() {
  const pendingQRCodes = 6;

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* Header */}
          <div className="flex items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-3">
              <div className="text-4xl">💡</div>
              <div>
                <div className="text-muted-foreground text-sm">
                  Vous avez{" "}
                  <span className="text-base font-medium text-gray-900 dark:text-gray-100">
                    {pendingQRCodes} QR codes en brouillon
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  qui nécessitent votre attention !
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <IconDownload className="h-4 w-4" />
                Export
              </Button>
              <Button className="gap-2">
                <IconPlus className="h-4 w-4" />
                Nouveau QR Code
              </Button>
            </div>
          </div>
          <DataTable data={qrCodesData} />
        </div>
      </div>
    </div>
  );
}
