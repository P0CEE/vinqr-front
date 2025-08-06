import {
  IconBottle,
  IconClock,
  IconQrcode,
  IconScan,
} from "@tabler/icons-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function QRCodesSectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-bl *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card max-w-xs">
        <CardHeader className="pb-2">
          <CardDescription className="text-muted-foreground text-sm">
            QR Codes Actifs
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <CardTitle className="text-2xl font-bold">12</CardTitle>
              <span className="text-muted-foreground text-sm">/50</span>
            </div>
            <div className="bg-card flex h-10 w-10 items-center justify-center rounded-lg border py-4">
              <IconQrcode className="text-muted-foreground h-6 w-6" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="@container/card max-w-xs">
        <CardHeader className="pb-2">
          <CardDescription className="text-muted-foreground text-sm">
            Total Scans
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">1,847</CardTitle>
            <div className="bg-card flex h-10 w-10 items-center justify-center rounded-lg border py-4">
              <IconScan className="text-muted-foreground h-6 w-6" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="@container/card max-w-xs">
        <CardHeader className="pb-2">
          <CardDescription className="text-muted-foreground text-sm">
            Cuvées Actives
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">5</CardTitle>
            <div className="bg-card flex h-10 w-10 items-center justify-center rounded-lg border py-4">
              <IconBottle className="text-muted-foreground h-6 w-6" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="@container/card max-w-xs">
        <CardHeader className="pb-2">
          <CardDescription className="text-muted-foreground text-sm">
            Dernier Scan
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">2h</CardTitle>
            <div className="bg-card flex h-10 w-10 items-center justify-center rounded-lg border py-4">
              <IconClock className="text-muted-foreground h-6 w-6" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
