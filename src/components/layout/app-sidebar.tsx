"use client";

import { IconPlus } from "@tabler/icons-react";
import * as React from "react";

import { NavMain } from "@/components/layout/sidebar/nav-main";
import { NavUser } from "@/components/layout/sidebar/nav-user";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  bottomNavItems,
  navigationConfig,
  userNavData,
} from "@/config/navigation";
import { useQRParams } from "@/hooks/use-qr-params";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="relative flex flex-col">
        <NavUser user={userNavData} />
      </SidebarHeader>

      <div className="p-2">
        <CreateQRButton />
      </div>

      <SidebarContent>
        {navigationConfig.main?.sections.map((section, index) => (
          <NavMain key={index} title={section.title} items={section.items} />
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
  const { setParams } = useQRParams();

  return (
    <Button
      className="h-8 w-full"
      onClick={() => setParams({ createQR: true })}
    >
      <IconPlus className="h-4 w-4" />
      Nouveau QR Code
    </Button>
  );
}