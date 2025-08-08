"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCopy,
  IconDotsVertical,
  IconDownload,
  IconEdit,
  IconEye,
  IconFilter,
  IconGripVertical,
  IconQrcode,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type Row,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { QRCodeDialog } from "@/components/ui/qr-code-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const schema = z.object({
  id: z.number(),
  cuvee: z.string(),
  millesime: z.string(),
  url: z.string(),
  scans: z.number(),
  lastScan: z.string(),
  created: z.string(),
  status: z.string(),
});

// Create a separate component for the drag handle
function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "cuvee",
    header: "Cuvée",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
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
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => (
      <a
        href={`https://${row.original.url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-primary/90 text-sm underline transition-colors"
      >
        {row.original.url}
      </a>
    ),
  },
  {
    accessorKey: "scans",
    header: () => "Scans",
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className="font-medium tabular-nums">{row.original.scans}</span>
      </div>
    ),
  },
  {
    accessorKey: "lastScan",
    header: "Dernier scan",
    cell: ({ row }) => (
      <div className="text-muted-foreground flex items-center gap-1 text-sm">
        {row.original.lastScan}
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
    cell: ({}) => (
      <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
        Actif
      </Badge>
    ),
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
            Voir la page
          </DropdownMenuItem>
          <QRCodeDialog
            qrCodeUrl={`https://champagne-exemple.fr${row.original.url}`}
            qrCodeTitle="QR Code de la cuvée"
            qrCodeDescription="Scannez ce code pour accéder aux informations nutritionnelles"
            cuvee={row.original.cuvee}
            millesime={row.original.millesime}
          >
            <div className="focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground hover:bg-accent hover:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
              <IconQrcode />
              Voir le QR Code
            </div>
          </QRCodeDialog>
          <DropdownMenuItem>
            <IconDownload className="h-4 w-4" />
            Télécharger
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
            Désactiver
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function DataTable({
  data: initialData,
}: {
  data: z.infer<typeof schema>[];
}) {
  const [data, setData] = React.useState(() => initialData);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterMillesime, setFilterMillesime] = React.useState("all");
  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data],
  );

  const filteredData = React.useMemo(() => {
    return data.filter((qr) => {
      const matchesSearch =
        qr.cuvee.toLowerCase().includes(searchQuery.toLowerCase()) ||
        qr.millesime.includes(searchQuery) ||
        qr.url.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        filterMillesime === "all" || qr.millesime === filterMillesime;
      return matchesSearch && matchesFilter;
    });
  }, [data, searchQuery, filterMillesime]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const selectedRows = React.useMemo(() => {
    return Object.keys(rowSelection).map((key) => parseInt(key));
  }, [rowSelection]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="w-full flex-col justify-start gap-6 px-4 lg:px-6">
      <div className="overflow-hidden rounded-lg border">
        <div className="relative flex flex-col overflow-auto">
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
              <Select
                value={filterMillesime}
                onValueChange={setFilterMillesime}
              >
                <SelectTrigger className="h-9 w-[180px]">
                  <IconFilter className="h-4 w-4" />
                  <SelectValue placeholder="Filtrer par millésime" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les millésimes</SelectItem>
                  <SelectItem value="2015">2015</SelectItem>
                  <SelectItem value="2018">2018</SelectItem>
                  <SelectItem value="2019">2019</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
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
                    <IconDownload className="mr-2 h-4 w-4" />
                    Exporter
                  </Button>
                  <Button variant="outline" className="h-9">
                    <IconTrash className="mr-2 h-4 w-4" />
                    Désactiver
                  </Button>
                </>
              )}
            </div>
          </div>
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="bg-muted sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Aucun résultat trouvé.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
      </div>
      <div className="flex items-center justify-between py-2 lg:py-4">
        <p className="text-muted-foreground text-sm">
          Affichage de {filteredData.length} QR code(s) actif(s)
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
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
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
    </div>
  );
}
