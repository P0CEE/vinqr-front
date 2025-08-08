"use client";

type Props = {
  file: File;
  onDelete: () => void;
};

export function AttachmentItem({ file, onDelete }: Props) {
  return (
    <li className="flex items-center justify-between border p-2 rounded">
      <span className="truncate">{file.name}</span>
      <button
        type="button"
        onClick={onDelete}
        className="text-red-500 text-sm hover:underline"
      >
        Supprimer
      </button>
    </li>
  );
}