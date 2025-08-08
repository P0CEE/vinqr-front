import { QRCodesTable } from "@/components/features/qr-codes/qr-codes-table";
import { QRCodesSectionCards } from "@/components/features/qr-codes/qr-codes-section-cards";
import { Button } from "@/components/ui/button";
import { IconDownload, IconPlus } from "@tabler/icons-react";

const qrCodesData = [
  {
    id: 1,
    cuvee: "Brut Tradition",
    millesime: "2020",
    url: "/qr/98f7b2c3",
    scans: 342,
    lastScan: "Il y a 2 heures",
    created: "15/01/2024",
    status: "active",
  },
  {
    id: 2,
    cuvee: "Blanc de Blancs",
    millesime: "2019",
    url: "/qr/2a3b4c5d",
    scans: 287,
    lastScan: "Il y a 5 heures",
    created: "20/01/2024",
    status: "active",
  },
  {
    id: 3,
    cuvee: "Rosé de Saignée",
    millesime: "2021",
    url: "/qr/6e7f8g9h",
    scans: 156,
    lastScan: "Hier à 18h30",
    created: "05/02/2024",
    status: "active",
  },
  {
    id: 4,
    cuvee: "Millésime Exception",
    millesime: "2015",
    url: "/qr/1a2b3c4d",
    scans: 523,
    lastScan: "Il y a 30 minutes",
    created: "10/12/2023",
    status: "active",
  },
  {
    id: 5,
    cuvee: "Cuvée Prestige",
    millesime: "2018",
    url: "/qr/5d6e7f8g",
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
                    {pendingQRCodes} QR codes inactifs
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  qui nécessitent votre attention !
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
                Nouveau QR Code
              </Button>
            </div>
          </div>

          <QRCodesSectionCards 
            activeQRCodes={12}
            totalQRCodes={50}
            totalScans={1847}
            activeVintages={5}
            lastScanTime="2h"
          />

          <QRCodesTable data={qrCodesData} />
        </div>
      </div>
    </div>
  );
}