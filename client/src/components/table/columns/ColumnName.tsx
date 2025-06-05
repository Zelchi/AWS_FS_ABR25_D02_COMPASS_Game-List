export default function ColumnName({ item, head }: { item: any; head: string }) {
  const maxSizeText = 30;

  return (
    <span>
      {item[head].length > maxSizeText
        ? item[head].slice(0, maxSizeText).trim() + "..."
        : item[head]}
    </span>
  );
}
