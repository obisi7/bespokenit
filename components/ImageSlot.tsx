export default function ImageSlot({
  placeholder,
  className,
  style,
}: {
  placeholder: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`image-slot ${className ?? ""}`} style={style}>
      {placeholder}
    </div>
  );
}
