import { Card as RadixCard } from "@radix-ui/themes";

import { Heading } from "@/components/ui/Heading";

export function Card() {
  return (
    <RadixCard className="w-64">
      <div className="flex justify-start items-end gap-x-2">
        <Heading as="h3">蒙求</Heading>
        <p className="text-sm">もうぎゅう</p>
      </div>
      <div className="border-l-4 border-slate-400 py-4 pl-2">
        <p>中国の伝統的な初学者用学習書</p>
      </div>
      <div className="text-sm text-right">
        <p>北園克衛『北園克衛全詩集』</p>
      </div>
    </RadixCard>
  );
}
