// src/components/ui/qr-code-dialog.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  IconCheck,
  IconCopy,
  IconExternalLink,
  IconQrcode,
  IconShare,
} from "@tabler/icons-react";
import * as React from "react";

interface QRCodeDialogProps {
  children: React.ReactNode;
  qrCodeUrl: string;
  qrCodeTitle: string;
  qrCodeDescription?: string;
  cuvee?: string;
  millesime?: string;
  size?: "sm" | "md" | "lg";
}

export function QRCodeDialog({
  children,
  qrCodeUrl,
  qrCodeTitle,
  qrCodeDescription,
  cuvee,
  millesime,
  size = "md",
}: QRCodeDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrCodeUrl)}&format=png&margin=10`;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(qrCodeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: qrCodeTitle,
          text: qrCodeDescription ?? `QR Code pour ${cuvee ?? "cette cuvée"}`,
          url: qrCodeUrl,
        });
      } catch (err) {
        console.error("Error sharing:", err);
        void handleCopyUrl();
      }
    } else {
      void handleCopyUrl();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {children}
      </DialogTrigger>
<DialogContent
  className={`${sizeClasses[size]} p-0 ring-5 ring-gray-100/30`}
>
        <div className="flex items-center gap-4 px-6 pt-6">
          <div className="bg-card flex h-12 w-12 items-center justify-center rounded-lg border py-4 shadow-sm">
            <IconQrcode className="text-muted-foreground h-8 w-8" />
          </div>
          <div className="flex-1">
            <DialogTitle className="secondary-foreground text-xl font-semibold">
              QR Code de {cuvee} {millesime}
            </DialogTitle>
          </div>
        </div>

        <div className="space-y-6 p-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="rounded-2xl border p-6 shadow-sm">
              <img
                src={qrImageUrl}
                alt={`QR Code pour ${qrCodeTitle}`}
                className="h-64 w-64 rounded-xl"
                loading="lazy"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <IconExternalLink className="text-muted-foreground h-4 w-4" />
              <span className="text-secondary-foreground text-sm font-medium">
                Lien du QR Code
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
              <code className="flex-1 truncate font-mono text-sm text-gray-600">
                {qrCodeUrl}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyUrl}
                className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
              >
                {copied ? (
                  <IconCheck className="h-4 w-4 text-green-600" />
                ) : (
                  <IconCopy className="h-4 w-4" />
                )}
              </Button>
            </div>

            <Button onClick={handleShare} className="w-full">
              <IconShare className="h-4 w-4" />
              Partager le QR Code
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
