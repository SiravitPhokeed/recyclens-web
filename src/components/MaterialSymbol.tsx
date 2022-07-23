const MaterialSymbol = ({
  icon,
  size,
}: {
  icon: string;
  size?: "normal" | "large";
}): JSX.Element => (
  <i
    className={[
      "material-symbols",
      size == "large" ? "material-symbols--header" : "",
    ].join(" ")}
    translate="no"
  >
    {icon}
  </i>
);

export default MaterialSymbol;
