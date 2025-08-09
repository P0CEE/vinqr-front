"use client";

import {
  IconBottle,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCopy,
  IconDotsVertical,
  IconEdit,
  IconEye,
  IconFilter,
  IconQrcode,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import { type ColumnDef } from "@tanstack/react-table";
import * as React from "react";
import { z } from "zod";

import {
  DataTable,
  createDragColumn,
  createSelectColumn,
} from "@/components/data-display/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const vintageSchema = z.object({
  id: z.number(),
  cuvee: z.string(),
  millesime: z.string(),
  appellation: z.string(),
  cepage: z.string(),
  alcool: z.string(),
  qrCodes: z.number(),
  status: z.string(),
  created: z.string(),
});

export type VintageData = z.infer<typeof vintageSchema>;

const createVintageColumns = (): ColumnDef<VintageData>[] => [
  createDragColumn<VintageData>(),
  createSelectColumn<VintageData>(),
  {
    accessorKey: "cuvee",
    header: "Cuvée",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <IconBottle className="text-muted-foreground h-4 w-4" />
          <Button
            variant="link"
            className="text-foreground w-fit px-0 text-left"
          >
            {row.original.cuvee}
          </Button>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "millesime",
    header: "Millésime",
    cell: ({ row }) => (
      <Badge variant="outline">{row.original.millesime}</Badge>
    ),
  },
  {
    accessorKey: "appellation",
    header: "Appellation",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.appellation}</span>
    ),
  },
  {
    accessorKey: "cepage",
    header: "Cépage",
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">
        {row.original.cepage}
      </span>
    ),
  },
  {
    accessorKey: "alcool",
    header: "Degré",
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">{row.original.alcool}%</span>
    ),
  },
  {
    accessorKey: "qrCodes",
    header: "QR Codes",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <IconQrcode className="text-muted-foreground h-4 w-4" />
        <span className="font-medium">{row.original.qrCodes}</span>
      </div>
    ),
  },
  {
    accessorKey: "created",
    header: "Créé le",
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">
        {row.original.created}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          className={
            status === "active"
              ? "bg-green-500/10 text-green-600 hover:bg-green-500/20"
              : "bg-gray-500/10 text-gray-600 hover:bg-gray-500/20"
          }
        >
          {status === "active" ? "Active" : "Brouillon"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <IconEye className="h-4 w-4" />
            Voir la fiche
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconQrcode className="h-4 w-4" />
            Créer un QR Code
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <IconEdit className="h-4 w-4" />
            Modifier
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconCopy className="h-4 w-4" />
            Dupliquer
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <IconTrash className="h-4 w-4" />
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

interface VintagesTableProps {
  data: VintageData[];
}

export function VintagesTable({ data }: VintagesTableProps) {
  const [filterAppellation, setFilterAppellation] = React.useState("all");
  const columns = React.useMemo(() => createVintageColumns(), []);

  const searchFilter = (item: VintageData, query: string) => {
    return (
      item.cuvee.toLowerCase().includes(query.toLowerCase()) ||
      item.millesime.includes(query) ||
      item.cepage.toLowerCase().includes(query.toLowerCase())
    );
  };

  const additionalFilters = (item: VintageData) => {
    return (
      filterAppellation === "all" || item.appellation === filterAppellation
    );
  };

  const renderToolbar = ({
    selectedRows,
    searchQuery,
    setSearchQuery,
  }: {
    selectedRows: number[];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
  }) => (
    <div className="flex flex-col gap-4 px-2 py-2 sm:flex-row sm:items-center sm:justify-between lg:px-4 lg:py-4">
      <div className="flex flex-1 items-center gap-2">
        <div className="relative max-w-sm flex-1">
          <IconSearch className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
          <Input
            placeholder="Rechercher une cuvée..."
            className="h-9 pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterAppellation} onValueChange={setFilterAppellation}>
          <SelectTrigger className="h-9 w-[200px]">
            <IconFilter className="h-4 w-4" />
            <SelectValue placeholder="Filtrer par appellation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les appellations</SelectItem>
            <SelectItem value="Champagne AOC">Champagne AOC</SelectItem>
            <SelectItem value="Champagne Grand Cru">
              Champagne Grand Cru
            </SelectItem>
            <SelectItem value="Champagne Premier Cru">
              Champagne Premier Cru
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        {selectedRows.length > 0 && (
          <>
            <span className="text-muted-foreground text-sm">
              {selectedRows.length} sélectionné(s)
            </span>
            <Button variant="outline" className="h-9">
              <IconQrcode className="mr-2 h-4 w-4" />
              Créer QR Codes
            </Button>
            <Button variant="outline" className="h-9">
              <IconTrash className="mr-2 h-4 w-4" />
              Supprimer
            </Button>
          </>
        )}
      </div>
    </div>
  );

  const renderPagination = ({
    table,
    filteredDataLength,
  }: {
    table: any;
    filteredDataLength: number;
  }) => (
    <div className="flex items-center justify-between py-2 lg:py-4">
      <p className="text-muted-foreground text-sm">
        Affichage de {filteredDataLength} cuvée(s)
      </p>
      <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex w-full items-center gap-8 lg:w-fit">
        <div className="hidden items-center gap-2 lg:flex">
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            Rows per page
          </Label>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger size="sm" className="w-20" id="rows-per-page">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-fit items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <IconChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <IconChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <IconChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden size-8 lg:flex"
            size="icon"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <IconChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      enableDragAndDrop={true}
      enableSelection={true}
      searchFilter={searchFilter}
      additionalFilters={additionalFilters}
      renderToolbar={renderToolbar}
      renderPagination={renderPagination}
    />
  );
}
