import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SectionCardsProps {
  totalActive: number;
  totalScans: number;
  averageScans: number;
  lastScanTime: string;
  lastScanProduct: string;
}

export function SectionCards({
  totalActive,
  totalScans,
  averageScans,
  lastScanTime,
  lastScanProduct,
}: SectionCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total actifs</CardDescription>
          <CardTitle className="text-3xl">{totalActive}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-xs">Sur 50 disponibles</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Scans totaux</CardDescription>
          <CardTitle className="text-3xl">{totalScans.toLocaleString()}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-xs">+24% ce mois-ci</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Scan moyen/QR</CardDescription>
          <CardTitle className="text-3xl">{averageScans}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-xs">
            Performance excellente
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Dernier scan</CardDescription>
          <CardTitle className="text-2xl">{lastScanTime}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-xs">{lastScanProduct}</p>
        </CardContent>
      </Card>
    </div>
  );
}