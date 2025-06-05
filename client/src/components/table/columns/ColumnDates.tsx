export default function ColumnDates({ item, head }: { item: any; head: string }) {
  return <span>{new Date((item as any)[head]).toLocaleDateString()}</span>;
}
