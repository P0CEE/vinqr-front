"use client";

import { cn } from "@/lib/utils";
import {
  useDropzone,
  type DropzoneInputProps,
  type DropzoneRootProps,
  type FileRejection,
} from "react-dropzone";

interface FileUploadFieldProps {
  onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => void;
  maxSize?: number;
  isDragActive?: boolean;
  className?: string;
}

export function FileUploadField({
  onDrop,
  maxSize = 3 * 1024 * 1024,
  className,
}: FileUploadFieldProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
  }) as {
    getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
    getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
    isDragActive: boolean;
  };

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-border flex h-[120px] w-full flex-col justify-center space-y-1 border-2 border-dotted text-center text-[#606060] transition-colors",
        isDragActive ? "bg-secondary text-primary" : "",
        className
      )}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-xs">Déposez vos fichiers ici</p>
      ) : (
        <>
          <p className="text-xs">
            Glissez vos fichiers ici, ou{" "}
            <span className="underline underline-offset-1">
              cliquez pour parcourir.
            </span>
          </p>
          <p className="text-dark-gray text-xs">
            Limite de 3MB par fichier.
          </p>
        </>
      )}
    </div>
  );
}