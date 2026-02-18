import {
    Column,
    ColumnDef,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { router } from '@inertiajs/react';
import { ArrowDown, ArrowUp, ArrowUpDown, Settings2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from './button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './dropdown-menu';

export interface PaginationData {
    currentPage: number;
    lastPage: number;
    total: number;
    showingCount: number;
    links?: Array<{ url: string | null; label: string; active: boolean }>;
    baseUrl?: string;
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    emptyState?: React.ReactNode;
    showColumnToggle?: boolean;
    pagination?: PaginationData;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    emptyState,
    showColumnToggle = true,
    pagination,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnVisibility,
        },
    });

    return (
        <div>
            {showColumnToggle && (
                <div className="flex justify-end border-b border-sidebar-border/50 px-4 py-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-1.5">
                                <Settings2 className="h-4 w-4" />
                                View
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[180px]">
                            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    >
                                        {column.id.replace(/_/g, ' ')}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="border-b border-sidebar-border/50 bg-muted/40">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="divide-y divide-border">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <tr key={row.id} className="hover:bg-muted/30">
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-6 py-4">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length}>
                                    {emptyState ?? (
                                        <div className="py-12 text-center">
                                            <p className="text-sm text-muted-foreground">No results found.</p>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {pagination && pagination.lastPage > 1 && (
                <div className="flex flex-col items-center justify-between gap-4 border-t border-sidebar-border/50 px-6 py-4 sm:flex-row">
                    <p className="text-sm text-muted-foreground">
                        Showing{' '}
                        <span className="font-semibold text-foreground">{pagination.showingCount}</span>
                        {' '}of{' '}
                        <span className="font-semibold text-foreground">{pagination.total}</span>
                        {' '}results
                    </p>

                    {pagination.links ? (
                        <div className="flex flex-wrap justify-center gap-1">
                            {pagination.links.map((link, index) => (
                                <Button
                                    key={index}
                                    variant={link.active ? 'default' : 'outline'}
                                    size="sm"
                                    disabled={!link.url}
                                    onClick={() => link.url && router.visit(link.url)}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={link.active ? 'shadow-md' : ''}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={pagination.currentPage === 1}
                                onClick={() =>
                                    pagination.baseUrl &&
                                    router.get(pagination.baseUrl, { page: pagination.currentPage - 1 })
                                }
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={pagination.currentPage === pagination.lastPage}
                                onClick={() =>
                                    pagination.baseUrl &&
                                    router.get(pagination.baseUrl, { page: pagination.currentPage + 1 })
                                }
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
}: {
    column: Column<TData, TValue>;
    title: string;
}) {
    if (!column.getCanSort()) {
        return <span>{title}</span>;
    }

    return (
        <button
            className="flex cursor-pointer items-center gap-1 transition-colors hover:text-foreground"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
            {title}
            {column.getIsSorted() === 'asc' ? (
                <ArrowUp className="h-3 w-3" />
            ) : column.getIsSorted() === 'desc' ? (
                <ArrowDown className="h-3 w-3" />
            ) : (
                <ArrowUpDown className="h-3 w-3 opacity-50" />
            )}
        </button>
    );
}
