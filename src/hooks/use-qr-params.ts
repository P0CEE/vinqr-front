"use client";

import { create } from "zustand";

interface QRParamsState {
  createQR: boolean;
  setParams: (params: { createQR: boolean } | null) => void;
}

export const useQRParams = create<QRParamsState>((set) => ({
  createQR: false,
  setParams: (params) => set(params ?? { createQR: false }),
}));