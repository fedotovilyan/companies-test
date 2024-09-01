import { CSSProperties, HTMLAttributes, PropsWithChildren } from "react";

interface FlexProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  wrap?: CSSProperties["flexWrap"];
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  direction?: CSSProperties["flexDirection"];
  gap?: CSSProperties["gap"];
}

export const Flex = (props: FlexProps) => {
  const { align, children, direction, justify, wrap, style, gap, ...rest } =
    props;

  return (
    <div
      style={{
        display: "flex",
        alignItems: align,
        justifyContent: justify,
        flexDirection: direction,
        flexWrap: wrap,
				gap: gap,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};
