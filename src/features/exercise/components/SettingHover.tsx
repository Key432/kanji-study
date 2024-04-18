import { HoverCard } from "@radix-ui/themes";

import { YojijukugoReadingConfig } from "@/components/pages/Yojijukugo/Exercise/Reading";

import { Grade, gradeMapping } from "@/constant/grades";

export type ConfigHoverProps = {
  config?: YojijukugoReadingConfig;
};

export function ConfigHover({ config }: ConfigHoverProps) {
  return config ? (
    <HoverCard.Root>
      <HoverCard.Trigger>
        <p className="text-sm bg-slate-300 px-2 rounded-full select-none">
          出題設定
        </p>
      </HoverCard.Trigger>
      <HoverCard.Content>
        <div>
          <div>
            <p className="text-xs font-bold">出題数</p>
            <p className="text-sm">{config.count}問</p>
            <p className="text-xs font-bold">出題級</p>
            <p className="text-sm">
              {config.grades.reduce((acc, grade, index) => {
                return index === 0
                  ? gradeMapping[grade as Grade]
                  : `${acc} / ${gradeMapping[grade as Grade]}`;
              }, "")}
            </p>
          </div>

          {(config.excludeNO || config.excludePrimary) && (
            <div>
              <p className="text-xs font-bold">除外</p>
              <p className="text-sm">
                {config.excludeNO && "「之」を含む四字熟語"}
              </p>
              <p className="text-sm">
                {config.excludePrimary && "優先表記がある四字熟語"}
              </p>
            </div>
          )}
        </div>
      </HoverCard.Content>
    </HoverCard.Root>
  ) : (
    <></>
  );
}
