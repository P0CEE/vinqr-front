import {
  IconArchive,
  IconBottle,
  IconChartLine,
  IconDashboard,
  IconHelp,
  IconQrcode,
  IconSettings,
  IconWorld,
} from "@tabler/icons-react";

export interface NavItem {
  id?: string;
  title: string;
  url: string;
  icon: React.ComponentType<never>;
  badge?: string | number;
  disabled?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface NavConfig {
  path: string;
  sections: NavSection[];
}

export const navigationConfig: Record<string, NavConfig> = {
  main: {
    path: "/",
    sections: [
      {
        title: "Mon activité", 
        items: [
          {
            id: "dashboard",
            title: "Tableau de bord",
            url: "/",
            icon: IconDashboard,
            badge: "12/50",
          },
          {
            id: "my-qr-codes",
            title: "QR Codes",
            url: "/my-qr-codes",
            icon: IconQrcode,
            items: [
              {
                title: "Tous les QR Codes",
                url: "/my-qr-codes",
              },
              {
                title: "Hors service",
                url: "/my-qr-codes/out-of-service",
              },
            ],
          },
          {
            id: "my-vintages",
            title: "Cuvées",
            url: "/my-vintages",
            icon: IconBottle,
            items: [
              {
                title: "Toutes les cuvées",
                url: "/my-vintages",
              },
              {
                title: "Ajouter une cuvée",
                url: "/my-vintages/create",
              },
            ],
          },
          {
            id: "my-domain",
            title: "Domaine",
            url: "/my-domain",
            icon: IconWorld,
            items: [
              {
                title: "Configuration",
                url: "/my-domain/config",
              },
              {
                title: "Vérification DNS",
                url: "/my-domain/verification",
              },
            ],
          },
        ],
      },
    ],
  },
  settings: {
    path: "/settings",
    sections: [
      {
        title: "Paramètres",
        items: [
          {
            id: "general",
            title: "Général",
            url: "/settings/general",
            icon: IconSettings,
          },
          {
            id: "billing",
            title: "Facturation",
            url: "/settings/billing",
            icon: IconChartLine,
          },
          {
            id: "domain",
            title: "Domaine",
            url: "/settings/domain",
            icon: IconWorld,
          },
          {
            id: "archive",
            title: "Archives",
            url: "/settings/archive",
            icon: IconArchive,
          },
        ],
      },
    ],
  },
};

export const bottomNavItems = [
  {
    title: "Support",
    items: [
      {
        id: "help",
        title: "Aide & Support",
        url: "/support",
        icon: IconHelp,
      },
      {
        id: "settings",
        title: "Paramètres",
        url: "/settings/general",
        icon: IconSettings,
      },
    ],
  },
];

export const userNavData = {
  name: "Champagne Exemple",
  email: "contact@champagne-exemple.fr",
  avatar: "/avatars/user.jpg",
};