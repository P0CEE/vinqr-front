import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SectionCardsProps {
  totalArchived: number;
  totalDeactivated: number;
  totalScans: number;
  averageScans: number;
}

export function SectionCards({
  totalArchived,
  totalDeactivated,
  totalScans,
  averageScans,
}: SectionCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>QR Codes archivés</CardDescription>
          <CardTitle className="text-3xl">{totalArchived}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-xs">Fin de production</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>QR Codes désactivés</CardDescription>
          <CardTitle className="text-3xl">{totalDeactivated}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-xs">Désactivés manuellement</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Scans totaux</CardDescription>
          <CardTitle className="text-3xl">{totalScans.toLocaleString()}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-xs">Historique cumulé</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Scan moyen/QR</CardDescription>
          <CardTitle className="text-3xl">{averageScans}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-xs">
            Performance historique
          </p>
        </CardContent>
      </Card>
    </div>
  );
}