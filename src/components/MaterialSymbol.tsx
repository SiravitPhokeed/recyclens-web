const MaterialSymbol = ({
  icon,
  size,
  className,
  style,
}: {
  icon: string;
  size?: "small" | "normal" | "large" | "extra-large";
  className?: string;
  style?: React.CSSProperties;
}): JSX.Element => (
  <i
    className={[
      "material-symbols",
      size == "small"
        ? "material-symbols--small"
        : size == "large"
        ? "material-symbols--large"
        : size == "extra-large"
        ? "material-symbols--extra-large"
        : "",
      className,
    ].join(" ")}
    style={style}
    translate="no"
  >
    {icon}
  </i>
);

export default MaterialSymbol;
