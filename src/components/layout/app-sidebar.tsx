"use client";

import { IconPlus } from "@tabler/icons-react";
import * as React from "react";
import { useState } from "react";

import { NavMain } from "@/components/layout/sidebar/nav-main";
import { NavUser } from "@/components/layout/sidebar/nav-user";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  bottomNavItems,
  navigationConfig,
  userNavData,
} from "@/config/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader
        className={`relative top-2.5 flex flex-col gap-2 ${state === "collapsed" ? "px-2" : "md:px-4"}`}
      >
        {" "}
        <NavUser user={userNavData} />
        <CreateQRButton />
      </SidebarHeader>

      <SidebarContent>
        {navigationConfig.main.sections.map((section, index) => (
          <NavMain
            key={index}
            title={section.title}
            items={section.items}
            className={index > 0 ? "mt-4" : ""}
          />
        ))}
      </SidebarContent>

      <SidebarFooter>
        <div className="mt-auto">
          {bottomNavItems.map((section, index) => (
            <NavMain key={`bottom-${index}`} items={section.items} />
          ))}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

function CreateQRButton() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setDialogOpen(open);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogTitle></DialogTitle>
      <DialogDescription></DialogDescription>

      <DialogTrigger asChild>
        <Button className="mb-1.5 h-8 w-full gap-2">
          <IconPlus className="h-4 w-4" />
          Nouveau QR Code
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-background h-screen w-screen max-w-none border-none p-0 shadow-none">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-semibold">Créer un nouveau QR Code</h2>
          </div>

          <div className="flex-1 overflow-auto p-6">
            <div className="mx-auto max-w-2xl space-y-6">
              <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                <IconPlus className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                <h3 className="mb-2 text-lg font-medium">
                  Formulaire de création QR Code
                </h3>
                <p className="text-muted-foreground">
                  Ici sera implémenté le formulaire complet pour créer un QR
                  Code.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
