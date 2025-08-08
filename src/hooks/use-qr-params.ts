"use client";

import { create } from "zustand";

type QRParams = {
  createQR?: boolean;
  setParams: (params: QRParams | null) => void;
};

export const useQRParams = create<QRParams>((set) => ({
  createQR: false,
  setParams: (params) => set(params ?? { createQR: false }),
}));