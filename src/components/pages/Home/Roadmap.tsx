import { Checkbox } from "@radix-ui/themes";

export type RoadmapStructure =
  | { value: string; hasDone: boolean }
  | { value: string; content: RoadmapStructure[] };

export function Roadmap({
  roadmap,
  depth,
}: {
  roadmap: RoadmapStructure;
  depth: number;
}) {
  if ("content" in roadmap) {
    return (
      <>
        <li
          className="list-disc"
          style={{ marginLeft: `${depth > 0 ? 1 + 0.5 * depth : 0}rem` }}
        >
          {roadmap.value}
        </li>
        <li>
          <ul style={{ marginLeft: `${depth > 0 ? 1 + 0.5 * depth : 0}rem` }}>
            {roadmap.content.map((item, index) => {
              return <Roadmap key={index} roadmap={item} depth={depth + 1} />;
            })}
          </ul>
        </li>
      </>
    );
  } else {
    return (
      <li style={{ marginLeft: `${depth === 0 ? -1.5 : 0}rem` }}>
        <Checkbox
          color="crimson"
          defaultChecked={roadmap.hasDone}
          size="3"
          className="mr-2"
        />
        {roadmap.value}
      </li>
    );
  }
}
