const MaterialSymbol = ({
  icon,
  size,
  className,
  style,
}: {
  icon: string;
  size?: "normal" | "large";
  className?: string;
  style?: React.CSSProperties;
}): JSX.Element => (
  <i
    className={[
      "material-symbols",
      size == "large" ? "material-symbols--header" : "",
      className,
    ].join(" ")}
    style={style}
    translate="no"
  >
    {icon}
  </i>
);

export default MaterialSymbol;
