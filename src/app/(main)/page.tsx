import { ChartAreaInteractive } from "@/components/pages/dashboard/chart-area-interactive";
import { SectionCards } from "@/components/pages/dashboard/section-cards";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { IconBulb } from "@tabler/icons-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👋</span>
              <div>
                <h1 className="text-foreground text-2xl font-semibold">
                  Bonjour, Antoine
                </h1>
              </div>
            </div>
          </div>

          <div className="px-4 lg:px-6">
            <div className="bg-primary/5 flex items-start gap-4 rounded-lg border p-4">
              <div className="text-primary">
                <IconBulb className="h-8 w-8" />
              </div>
              <Alert className="border-0 p-0">
                <AlertTitle>
                  Commençons par créer votre premier QR code !
                </AlertTitle>
                <AlertDescription>
                  <p className="inline-flex flex-wrap items-center gap-1">
                    Ajoutez une cuvée et générez votre premier QR code
                    réglementaire.
                    <Button
                      variant="link"
                      className="text-primary h-auto cursor-pointer p-0"
                    >
                      Set Up a Payment Link
                    </Button>
                  </p>
                </AlertDescription>
              </Alert>
            </div>
          </div>

          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
        </div>
      </div>
    </div>
  );
}
