export default function ColumnPrice({ item, head }: { item: any; head: string }) {
  return <span>${(item[head] / 100).toFixed(2)}</span>;
}
