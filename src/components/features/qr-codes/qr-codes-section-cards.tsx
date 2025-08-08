"use client";

import {
  IconBottle,
  IconClock,
  IconQrcode,
  IconScan,
} from "@tabler/icons-react";
import { SectionCards, type SectionCardItem } from "@/components/data-display/section-cards";

interface QRCodesSectionCardsProps {
  activeQRCodes?: number;
  totalQRCodes?: number;
  totalScans?: number;
  activeVintages?: number;
  lastScanTime?: string;
}

export function QRCodesSectionCards({
  activeQRCodes = 12,
  totalQRCodes = 50,
  totalScans = 1847,
  activeVintages = 5,
  lastScanTime = "2h",
}: QRCodesSectionCardsProps) {
  const cards: SectionCardItem[] = [
    {
      title: "QR Codes Actifs",
      value: activeQRCodes,
      suffix: `/${totalQRCodes}`,
      icon: IconQrcode,
    },
    {
      title: "Total Scans",
      value: totalScans.toLocaleString(),
      icon: IconScan,
    },
    {
      title: "Cuvées Actives",
      value: activeVintages,
      icon: IconBottle,
    },
    {
      title: "Dernier Scan",
      value: lastScanTime,
      icon: IconClock,
    },
  ];

  return <SectionCards items={cards} />;
}