import { Table } from "@radix-ui/themes";

import { gradeMapping } from "@/constant/grades";

import { YojijukugoRecord } from "../hooks/useYojijukugo";

export type RelationalTableProps = {
  data: YojijukugoRecord[];
  remove?: (full_text: string) => void;
};

export function RelationalTable({ data, remove }: RelationalTableProps) {
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
          {remove && (
            <Table.ColumnHeaderCell minWidth="85px">
              削除
            </Table.ColumnHeaderCell>
          )}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((row, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell className="h-full">{row.full_text}</Table.Cell>
              <Table.Cell className="h-full">
                {row.full_text_reading}
              </Table.Cell>
              <Table.Cell className="h-full">
                {gradeMapping[row.grade_id]}
              </Table.Cell>
              {remove && (
                <Table.Cell>
                  <button
                    type="button"
                    onClick={() => remove(row.full_text)}
                    className="px-4 rounded-full bg-slate-300 hover:bg-slate-400 text-black"
                  >
                    削除
                  </button>
                </Table.Cell>
              )}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
}
