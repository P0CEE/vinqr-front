"use client";

import { QRCodeForm } from "@/components/features/qr-codes/qr-code-form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useQRParams } from "@/hooks/use-qr-params";

export function QRCreateSheet() {
  const { setParams, createQR } = useQRParams();
  const isOpen = Boolean(createQR);

  const handleSubmit = (values: unknown) => {
    console.log("Formulaire soumis avec:", values);
    // Fermer le sheet après soumission
    setParams(null);
  };

  return (
    <Sheet open={isOpen} onOpenChange={() => setParams(null)}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-xl font-medium">
            Créer un QR Code
          </SheetTitle>
        </SheetHeader>
        <QRCodeForm onSubmit={handleSubmit} />
      </SheetContent>
    </Sheet>
  );
}
