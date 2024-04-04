"use client"

import { course } from "@/type"
import { ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<course>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "edit",
    header: "Actions"
  }
]
