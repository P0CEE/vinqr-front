import { ChartAreaInteractive } from "@/components/pages/dashboard/chart-area-interactive";
import { SectionCards } from "@/components/pages/dashboard/section-cards";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Vin'QR",
  description:
    "Tableau de bord principal pour gérer vos QR codes et vos cuvées.",
};

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
          </div>{" "}
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
        </div>
      </div>
    </div>
  );
}
