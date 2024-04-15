import { CircleIcon, Cross1Icon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";

import { AnswerResult } from "../hooks/useExercise";

export type ExerciseResultProps = {
  correctCount: number;
  incorrectCount: number;
  results: AnswerResult[];
};

export function ExerciseResult({ correctCount, results }: ExerciseResultProps) {
  return (
    <div className="text-center">
      <div className="mt-4">
        <p className="text-4xl font-klee">
          {correctCount}問正解
          <span className="text-sm">（全{results.length}問）</span>
        </p>
      </div>
      <div className="mt-4">
        <Table.Root className="overflow-x-auto">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell
                minWidth="80px"
                width="80px"
                align="center"
              >
                No.
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell
                minWidth="70px"
                width="70px"
                align="center"
              >
                正誤
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell minWidth="80px">
                問題
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell minWidth="120px">
                正解
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell minWidth="120px">
                回答
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {results.map((result) => {
              return (
                <Table.Row key={result.question_count}>
                  <Table.Cell
                    align="center"
                    className="sm:text-base text-sm"
                  >{`第${result.question_count}問`}</Table.Cell>
                  <Table.Cell className="text-secondary-default" align="center">
                    {result.isCorrect ? <CircleIcon /> : <Cross1Icon />}
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      target="_blank"
                      href={`/yojijukugo/list/${result.yojijukugo_id}`}
                      className="underline hover:text-secondary-default"
                    >
                      {result.question}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{result.answer}</Table.Cell>
                  <Table.Cell>{result.inputtedAnswer}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
}
