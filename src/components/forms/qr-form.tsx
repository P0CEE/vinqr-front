"use client";

import { AttachmentItem } from "@/components/attachment-item";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import {
  useDropzone,
  type DropzoneInputProps,
  type DropzoneRootProps,
  type FileRejection,
} from "react-dropzone";
import { useForm, type ControllerRenderProps } from "react-hook-form";

type QRFormValues = {
  domaine: string;
  cuvee: string;
  sucre: string;
  kcal: string;
  kj: string;
  attachments: File[];
};

export function QRForm() {
  const form = useForm<QRFormValues>({
    defaultValues: {
      domaine: "",
      cuvee: "",
      sucre: "",
      kcal: "",
      kj: "",
      attachments: [],
    },
  });

  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], _fileRejections: FileRejection[]) => {
      setFiles((prev) => {
        const updated = [...prev, ...acceptedFiles];
        form.setValue("attachments", updated);
        return updated;
      });
    },
    [form],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 3 * 1024 * 1024,
  }) as {
    getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
    getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
    isDragActive: boolean;
  };

  const handleOnDelete = (index: number) => {
    setFiles((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      form.setValue("attachments", updated);
      return updated;
    });
  };

  const onSubmit = (values: QRFormValues) => {
    console.log("QR Code créé :", values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col"
      >
        <div className="flex-1 space-y-6 overflow-auto p-4">
          {/* Domaine */}
          <FormField
            control={form.control}
            name="domaine"
            render={({
              field,
            }: {
              field: ControllerRenderProps<QRFormValues, "domaine">;
            }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm font-medium">Domaine</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner un domaine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="domaine1.com">domaine1.com</SelectItem>
                    <SelectItem value="domaine2.com">domaine2.com</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Nom de la cuvée */}
          <FormField
            control={form.control}
            name="cuvee"
            render={({
              field,
            }: {
              field: ControllerRenderProps<QRFormValues, "cuvee">;
            }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Nom de la cuvée
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Cuvée Prestige" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Valeurs nutritionnelles */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="sucre"
              render={({
                field,
              }: {
                field: ControllerRenderProps<QRFormValues, "sucre">;
              }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Sucre (pour 100mg)
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Ex: 5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="kcal"
              render={({
                field,
              }: {
                field: ControllerRenderProps<QRFormValues, "kcal">;
              }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Kcal</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Ex: 120" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="kj"
            render={({
              field,
            }: {
              field: ControllerRenderProps<QRFormValues, "kj">;
            }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Kj</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Ex: 500" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Attachment */}
          <Accordion type="single" collapsible>
            <AccordionItem value="attachment">
              <AccordionTrigger>Photo de la cuvée</AccordionTrigger>
              <AccordionContent>
                <div
                  {...getRootProps()}
                  className={cn(
                    "border-border flex h-[120px] w-full flex-col justify-center space-y-1 border-2 border-dotted text-center text-[#606060] transition-colors",
                    isDragActive ? "bg-secondary text-primary" : "",
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

                <ul className="mt-4 space-y-4">
                  {files.map((file, idx) => (
                    <AttachmentItem
                      key={`${file.name}-${idx}`}
                      file={file}
                      onDelete={() => handleOnDelete(idx)}
                    />
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Bouton bas */}
        <div className="border-border border-t p-4">
          <Button type="submit" className="w-full">
            Créer le QR Code
          </Button>
        </div>
      </form>
    </Form>
  );
}
