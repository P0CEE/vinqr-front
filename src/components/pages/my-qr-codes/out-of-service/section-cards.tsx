import {
  IconArchive,
  IconClock,
  IconRestore,
  IconTrash,
} from "@tabler/icons-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ArchivedSectionCards() {
  return (
    <div className="*:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-bl *:data-[slot=card]:from-red-100/5 *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card max-w-xs">
        <CardHeader className="pb-2">
          <CardDescription className="text-muted-foreground text-sm">
            QR Codes Archivés
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">6</CardTitle>
            <div className="bg-card flex h-10 w-10 items-center justify-center rounded-lg border py-4">
              <IconArchive className="text-muted-foreground h-6 w-6" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="@container/card max-w-xs">
        <CardHeader className="pb-2">
          <CardDescription className="text-muted-foreground text-sm">
            Scans Totaux (Archivés)
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">8,917</CardTitle>
            <div className="bg-card flex h-10 w-10 items-center justify-center rounded-lg border py-4">
              <IconClock className="text-muted-foreground h-6 w-6" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="@container/card max-w-xs">
        <CardHeader className="pb-2">
          <CardDescription className="text-muted-foreground text-sm">
            Prêts à Restaurer
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">2</CardTitle>
            <div className="bg-card flex h-10 w-10 items-center justify-center rounded-lg border py-4">
              <IconRestore className="text-muted-foreground h-6 w-6" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="@container/card max-w-xs">
        <CardHeader className="pb-2">
          <CardDescription className="text-muted-foreground text-sm">
            Désactivés (supprimables)
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">2</CardTitle>{" "}
            <div className="bg-card flex h-10 w-10 items-center justify-center rounded-lg border py-4">
              <IconTrash className="text-muted-foreground h-6 w-6" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
