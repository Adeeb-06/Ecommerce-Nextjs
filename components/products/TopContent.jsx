"use client"
import React from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from "@nextui-org/react";
import { PlusIcon } from './PlusIcon';
import Link from 'next/link';

const TopContent = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name..."
            size="sm"

            variant="bordered"

          />
          <div className="flex gap-3">


            <Button
              className="bg-foreground text-background"
              endContent={<PlusIcon />}
              size="sm"
            >
              <Link href={"/admin/dashboard/createProduct"}>
              Add New
            </Link>
          </Button>
        </div>
      </div>

    </div >
    </>
  )
}

export default TopContent