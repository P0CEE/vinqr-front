"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useQRParams } from "@/hooks/use-qr-params";
import { QRForm } from "../forms/qr-form";

export function QRCreateSheet() {
  const { setParams, createQR } = useQRParams();
  const isOpen = Boolean(createQR);

  return (
    <Sheet open={isOpen} onOpenChange={() => setParams(null)}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-xl font-medium">Créer un QR Code</SheetTitle>
        </SheetHeader>
        <QRForm />
      </SheetContent>
    </Sheet>
  );
}
