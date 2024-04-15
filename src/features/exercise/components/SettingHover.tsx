import { HoverCard } from "@radix-ui/themes";

import { gradeMapping } from "@/constant/grades";

import { ExerciseSetting } from "../hooks/useExercise";

export type SettingHoverProps = {
  setting?: ExerciseSetting;
};
export function SettingHover({ setting }: SettingHoverProps) {
  return setting ? (
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
            <p className="text-sm">{setting.exerciseCount}問</p>
            <p className="text-xs font-bold">出題級</p>
            <p className="text-sm">
              {setting.grade_id.reduce((acc, grade, index) => {
                return index === 0
                  ? gradeMapping[grade as keyof typeof gradeMapping]
                  : `${acc} / ${gradeMapping[grade as keyof typeof gradeMapping]}`;
              }, "")}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold">除外</p>
            <p className="text-sm">
              {setting.excludeNO && "「之」を含む四字熟語"}
            </p>
            <p className="text-sm">
              {setting.excludePrimary && "優先表記がある四字熟語"}
            </p>
          </div>
        </div>
      </HoverCard.Content>
    </HoverCard.Root>
  ) : (
    <></>
  );
}
