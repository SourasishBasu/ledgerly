"use client"

import * as React from "react"
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDotsVertical,
  IconLayoutColumns,
  IconPlus,
  IconBriefcase,
  IconMovie,
  IconSalad,
  IconCreditCard,
  IconUpload,
  IconPhoto,
  IconX,
} from "@tabler/icons-react"
import {
  ColumnDef,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { toast } from "sonner"
import { z } from "zod"

import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export const schema = z.object({
  id: z.number().optional(),
  date: z.string(),
  category: z.string(),
  vendor: z.string(),
  amount: z.number(),
})

export type Transaction = z.infer<typeof schema>

// Category configuration with icons and colors
const categoryConfig: Record<string, { icon: React.ReactNode; color: string }> = {
  food: { 
    icon: <IconSalad size={16} />, 
    color: "text-green-400 bg-muted-900" 
  },
  work: { 
    icon: <IconBriefcase size={16} />, 
    color: "text-blue-500 bg-muted-900" 
  },
  entertainment: { 
    icon: <IconMovie size={16} />, 
    color: "text-amber-300 bg-muted-900" 
  },
}

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: () => <div className="pl-4">Date</div>,
    cell: ({ row }) => {
      return (
        <div className="pl-4">
          <TableCellViewer item={row.original} />
        </div>
      )
    },
    enableHiding: false,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original.category.toLowerCase();
      const config = categoryConfig[category] || categoryConfig.other;
      
      return (
        <div className="w-32">
          <Badge 
            variant="outline" 
            className={`px-1.5 flex items-center gap-1 ${config.color}`}
          >
            {config.icon}
            {row.original.category}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "vendor",
    header: "Vendor",
    cell: ({ row }) => (
      <div className="max-w-[180px] truncate">
        {row.original.vendor}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="w-full text-right">Amount</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium tabular-nums">
        ₹ {row.original.amount.toFixed(2)}
      </div>
    ),
  },
  {
    id: "actions",
    cell: () => (
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
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

function StandardRow({ row }: { row: Row<Transaction> }) {
  return (
    <TableRow>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

// File dropzone component
function FileDropzone({ 
  onFileSelected, 
  selectedFile 
}: { 
  onFileSelected: (file: File) => void, 
  selectedFile: File | null 
}) {
  const [isDragging, setIsDragging] = React.useState(false)
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith('image/')) {
        onFileSelected(file)
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
          variant: "destructive"
        })
      }
    }
  }
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelected(e.target.files[0])
    }
  }
  
  const removeSelectedFile = () => {
    onFileSelected(null as unknown as File)
  }
  
  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 transition-colors duration-200 ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      } ${selectedFile ? 'bg-gray-50' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {selectedFile ? (
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <IconPhoto size={20} className="text-blue-500" />
              <span className="text-sm font-medium truncate max-w-[240px]">
                {selectedFile.name}
              </span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={removeSelectedFile}
            >
              <IconX size={16} />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {(selectedFile.size / 1024).toFixed(1)} KB
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 text-center">
          <IconUpload 
            size={30} 
            className="text-gray-400" 
          />
          <div>
            <p className="text-sm font-medium">
              Drop your receipt image here
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              or click to browse from your computer
            </p>
          </div>
          <label htmlFor="file-upload" className="mt-2">
            <div className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium cursor-pointer">
              Select Image
            </div>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleFileInputChange}
            />
          </label>
        </div>
      )}
    </div>
  )
}

export function DataTable({
  data: initialData,
}: {
  data: Transaction[]
}) {
  const [data, setData] = React.useState(() => {
    return initialData.map((item, index) => ({
      ...item,
      id: item.id || index + 1,
    }));
  });
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  })
  const [dateFilter, setDateFilter] = React.useState<string>("")
  const [isAddTransactionOpen, setIsAddTransactionOpen] = React.useState(false)
  const [isAddExpenseOpen, setIsAddExpenseOpen] = React.useState(false)
  const [isUploadImageOpen, setIsUploadImageOpen] = React.useState(false)
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
  const [newExpense, setNewExpense] = React.useState({
    amount: "",
    vendor: "",
    date: new Date().toISOString().split('T')[0], // Default to today in YYYY-MM-DD format
    category: "food"
  })

  const handleExpenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewExpense(prev => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setNewExpense(prev => ({ ...prev, category: value }))
  }

  const handleAddExpense = () => {
    // Add the new expense to the data
    const newTransaction: Transaction = {
      id: data.length + 1,
      date: newExpense.date,
      category: newExpense.category,
      vendor: newExpense.vendor,
      amount: parseFloat(newExpense.amount) || 0
    }
    
    setData([...data, newTransaction])
    
    // Reset form and close dialogs
    setNewExpense({
      amount: "",
      vendor: "",
      date: new Date().toISOString().split('T')[0],
      category: "food"
    })
    setIsAddExpenseOpen(false)
    setIsAddTransactionOpen(false)
  }

  const handleFileChange = (file: File) => {
    setSelectedFile(file)
  }

  const handleUploadReceipt = () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a receipt image to upload",
        variant: "destructive"
      })
      return
    }

    // Here you would implement file upload logic
    console.log("Uploading file:", selectedFile.name)
    
    // Reset and close dialog
    setSelectedFile(null)
    setIsUploadImageOpen(false)
    setIsAddTransactionOpen(false)
    
    // Show success message
    toast({
      title: "Receipt uploaded",
      description: "Your receipt is being processed",
    })
  }

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      pagination,
      globalFilter: dateFilter,
    },
    getRowId: (row) => row.id?.toString() || "",
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    globalFilterFn: (row, columnId, filterValue) => {
      const date = row.getValue("date") as string;
      return date.toLowerCase().includes(filterValue.toLowerCase());
    },
    onGlobalFilterChange: setDateFilter,
  })

  return (
    <Tabs
      defaultValue="outline"
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div className="w-72">
          <Input
            placeholder="Filter by date..."
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <IconLayoutColumns />
                <span className="hidden lg:inline">Customize Columns</span>
                <span className="lg:hidden">Columns</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
            <DialogTrigger asChild>
              <Button variant="default" size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                <IconPlus className="mr-1" />
                <span>Add Transaction</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Transaction</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 gap-4 py-4">
                <Button 
                  onClick={() => {
                    setIsAddExpenseOpen(true);
                    setIsAddTransactionOpen(false);
                  }} 
                  variant="outline"
                  className="flex justify-start items-center h-16 text-left p-4 bg-black text-white hover:bg-gray-800"
                >
                  <div className="flex items-center gap-3">
                    <IconCreditCard size={24} />
                    <div>
                      <div className="font-medium">Add New Expense</div>
                      <div className="text-xs opacity-70">Manually enter transaction details</div>
                    </div>
                  </div>
                </Button>
                <Button 
                  onClick={() => {
                    setIsUploadImageOpen(true);
                    setIsAddTransactionOpen(false);
                  }} 
                  variant="outline"
                  className="flex justify-start items-center h-16 text-left p-4 bg-black text-white hover:bg-gray-800"
                >
                  <div className="flex items-center gap-3">
                    <IconUpload size={24} />
                    <div>
                      <div className="font-medium">Upload Receipt Image</div>
                      <div className="text-xs opacity-70">Automatically extract transaction data</div>
                    </div>
                  </div>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          {/* Add New Expense Dialog */}
          <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="amount">Total Amount</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newExpense.amount}
                    onChange={handleExpenseChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="vendor">Vendor Name</Label>
                  <Input
                    id="vendor"
                    name="vendor"
                    placeholder="Enter vendor name"
                    value={newExpense.vendor}
                    onChange={handleExpenseChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Date (YYYY-MM-DD)</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={newExpense.date}
                    onChange={handleExpenseChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={newExpense.category}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="work">
                        <div className="flex items-center gap-2">
                          <IconBriefcase size={16} />
                          <span>Work</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="entertainment">
                        <div className="flex items-center gap-2">
                          <IconMovie size={16} />
                          <span>Entertainment</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="food">
                        <div className="flex items-center gap-2">
                          <IconSalad size={16} />
                          <span>Food</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleAddExpense}
                  className="mt-2 bg-white text-black hover:bg-stone-200"
                >
                  Add Expense
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          {/* Upload Receipt Image Dialog */}
          <Dialog open={isUploadImageOpen} onOpenChange={setIsUploadImageOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Upload Receipt Image</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="receipt-image">Select Receipt Image</Label>
                  <FileDropzone 
                    onFileSelected={handleFileChange}
                    selectedFile={selectedFile}
                  />
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <p className="text-sm text-muted-foreground">
                    Upload clear images of receipts for automatic expense tracking.
                    Supported formats: JPG, PNG
                  </p>
                </div>
                <Button 
                  onClick={handleUploadReceipt}
                  className="mt-2 bg-white text-black hover:bg-stone-200"
                  disabled={!selectedFile}
                >
                  Upload Receipt
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <div className="overflow-hidden rounded-lg border">
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
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <StandardRow key={row.id} row={row} />
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end px-4">
          <div className="flex items-center gap-8">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[5, 10, 15].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="flex items-center gap-2">
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
      </TabsContent>
    </Tabs>
  )
}



function TableCellViewer({ item }: { item: Transaction }) {
  const isMobile = useIsMobile()
  const category = item.category.toLowerCase();
  const categoryConf = categoryConfig[category] || categoryConfig.other;

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.date}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.vendor}</DrawerTitle>
          <DrawerDescription>
            Transaction details from {item.date}
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {!isMobile && (
            <>
              <Separator />
              <div className="grid gap-2">
                <div className="flex gap-2 leading-none font-medium items-center">
                  Transaction Category: 
                  <span className={`flex items-center gap-1 px-2 py-1 rounded-md ${categoryConf.color}`}>
                    {categoryConf.icon}
                    {item.category}
                  </span>
                </div>
                <div className="text-muted-foreground">
                  Amount spent: ₹ {item.amount.toFixed(2)}
                </div>
              </div>
              <Separator />
            </>
          )}
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="date">Date</Label>
              <Input id="date" defaultValue={item.date} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue={item.category.toLowerCase()}>
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(categoryConfig).map(([key, config]) => (
                      <SelectItem 
                        key={key} 
                        value={key}
                        className="flex items-center gap-2"
                      >
                        <span className={`flex items-center gap-2 ${config.color} px-2 py-0.5 rounded`}>
                          {config.icon}
                          <span className="capitalize">{key}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="vendor">Vendor</Label>
                <Input id="vendor" defaultValue={item.vendor} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="amount">Amount</Label>
              <Input 
                id="amount" 
                type="number" 
                step="0.01" 
                defaultValue={item.amount.toString()} 
              />
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button>Save Changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
