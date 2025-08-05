"use client";

import {
  IconBottle,
  IconDashboard,
  IconHelp,
  IconPlus,
  IconQrcode,
  IconSettings,
  IconWorld,
} from "@tabler/icons-react";
import * as React from "react";

import { NavMain } from "@/components/layout/sidebar/nav-main";
import { NavSecondary } from "@/components/layout/sidebar/nav-secondary";
import { NavUser } from "@/components/layout/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const data = {
  user: {
    name: "Champagne Exemple",
    email: "contact@champagne-exemple.fr",
    avatar: "/avatars/user.jpg",
  },
  navMain: [
    {
      title: "Tableau de bord",
      url: "/dashboard",
      icon: IconDashboard,
      badge: "12/50",
    },
    {
      title: "Créer un QR Code",
      url: "/qr-codes/create",
      icon: IconPlus,
    },
    {
      title: "Mes QR Codes",
      url: "/qr-codes",
      icon: IconQrcode,
      items: [
        {
          title: "QR Codes actifs",
          url: "/qr-codes/active",
        },
        {
          title: "Historique",
          url: "/qr-codes/history",
        },
      ],
    },
    {
      title: "Mes Cuvées",
      url: "/cuvees",
      icon: IconBottle,
      items: [
        {
          title: "Toutes les cuvées",
          url: "/cuvees/all",
        },
        {
          title: "Ajouter une cuvée",
          url: "/cuvees/add",
        },
        {
          title: "Informations nutritionnelles",
          url: "/cuvees/nutrition",
        },
      ],
    },
    {
      title: "Mon Domaine",
      url: "/domain",
      icon: IconWorld,
      items: [
        {
          title: "Configuration DNS",
          url: "/domain/dns",
        },
        {
          title: "Sous-domaines",
          url: "/domain/subdomains",
        },
        {
          title: "Vérification",
          url: "/domain/verify",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Paramètres",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Aide & Support",
      url: "/support",
      icon: IconHelp,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <IconBottle className="!size-5" />
                <span className="text-base font-semibold">Vin&apos;QR</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain title="Navigation" items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
