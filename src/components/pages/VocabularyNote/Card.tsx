import { Card as RadixCard } from "@radix-ui/themes";

import { Heading } from "@/components/ui/Heading";

export type CardProps = {
  text: string;
  text_reading: string | null;
  note: string | null;
  reference: string | null;
};

export function Card({ text, text_reading, note, reference }: CardProps) {
  return (
    <RadixCard className="shadow-sm flex flex-col justify-between">
      <div className="flex flex-wrap justify-start items-end gap-x-2">
        <Heading as="h3">{text}</Heading>
        {text_reading && <p className="text-sm">{text_reading}</p>}
      </div>
      {note && (
        <div className="border-l-4 border-slate-400 py-4 pl-2">
          <p>{note}</p>
        </div>
      )}
      {reference && (
        <div className="text-sm text-right">
          <p>{reference}</p>
        </div>
      )}
    </RadixCard>
  );
}
