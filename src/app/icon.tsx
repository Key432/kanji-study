import { ImageResponse } from "next/og";
import { HTMLAttributes } from "react";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const style: HTMLAttributes<HTMLDivElement>["style"] = {
  fontSize: 18,
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#DDDDDD",
  borderRadius: "9999px",
};

export default function Icon() {
  return new ImageResponse(<div style={style}>🖊</div>, {
    ...size,
  });
}
