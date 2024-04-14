import { Table } from "@radix-ui/themes";
import Link from "next/link";

import { gradeMapping } from "@/constant/grades";

import { YojijukugoRecord } from "../hooks/useYojijukugo";

export type RelationalTableProps = {
  data: (YojijukugoRecord & { yojijukugo_id: number })[];
};

export function ListTable({ data }: RelationalTableProps) {
  return (
    <Table.Root className="overflow-x-auto">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell minWidth="85px">
            四字熟語
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell minWidth="150px">よみ</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell minWidth="85px">
            漢検級
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((row, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell>
                <Link
                  href={`/yojijukugo/list/${row.yojijukugo_id}`}
                  className="underline hover:text-secondary-default"
                >
                  {row.full_text}
                </Link>
              </Table.Cell>
              <Table.Cell>{row.full_text_reading}</Table.Cell>
              <Table.Cell>{gradeMapping[row.grade_id]}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
}
