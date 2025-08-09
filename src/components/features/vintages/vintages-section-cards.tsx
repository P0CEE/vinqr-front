"use client";

import {
  SectionCards,
  type SectionCardItem,
} from "@/components/data-display/section-cards";
import {
  IconBottle,
  IconCalendar,
  IconCircleCheck,
  IconQrcode,
} from "@tabler/icons-react";

interface VintagesSectionCardsProps {
  totalVintages?: number;
  activeVintages?: number;
  totalQRCodes?: number;
  lastAdded?: string;
}

export function VintagesSectionCards({
  totalVintages = 8,
  activeVintages = 5,
  totalQRCodes = 12,
  lastAdded = "Il y a 3 jours",
}: VintagesSectionCardsProps) {
  const cards: SectionCardItem[] = [
    {
      title: "Total Cuvées",
      value: totalVintages,
      icon: IconBottle,
    },
    {
      title: "Cuvées Actives",
      value: activeVintages,
      suffix: `/${totalVintages}`,
      icon: IconCircleCheck,
    },
    {
      title: "QR Codes liés",
      value: totalQRCodes,
      icon: IconQrcode,
    },
    {
      title: "Dernière ajoutée",
      value: lastAdded,
      icon: IconCalendar,
    },
  ];

  return (
    <SectionCards
      items={cards}
      gradientFrom="from-purple-500/5"
      gradientTo="to-card"
    />
  );
}
