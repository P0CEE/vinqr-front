"use client";

type Props = {
  file: File;
  onDelete: () => void;
};

export function AttachmentItem({ file, onDelete }: Props) {
  return (
    <li className="flex items-center justify-between rounded border p-2">
      <span className="truncate">{file.name}</span>
      <button
        type="button"
        onClick={onDelete}
        className="text-sm text-red-500 hover:underline"
      >
        Supprimer
      </button>
    </li>
  );
}
