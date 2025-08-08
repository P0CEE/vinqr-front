"use client";

import {
  IconArchive,
  IconClock,
  IconRestore,
  IconTrash,
} from "@tabler/icons-react";
import { SectionCards, type SectionCardItem } from "@/components/data-display/section-cards";

interface ArchivedSectionCardsProps {
  archivedQRCodes?: number;
  totalScans?: number;
  readyToRestore?: number;
  deactivated?: number;
}

export function ArchivedSectionCards({
  archivedQRCodes = 6,
  totalScans = 8917,
  readyToRestore = 2,
  deactivated = 2,
}: ArchivedSectionCardsProps) {
  const cards: SectionCardItem[] = [
    {
      title: "QR Codes Archivés",
      value: archivedQRCodes,
      icon: IconArchive,
    },
    {
      title: "Scans Totaux (Archivés)",
      value: totalScans.toLocaleString(),
      icon: IconClock,
    },
    {
      title: "Prêts à Restaurer",
      value: readyToRestore,
      icon: IconRestore,
    },
    {
      title: "Désactivés (supprimables)",
      value: deactivated,
      icon: IconTrash,
    },
  ];

  return (
    <SectionCards 
      items={cards} 
      gradientFrom="from-red-400/5"
      gradientTo="to-card"
    />
  );
}