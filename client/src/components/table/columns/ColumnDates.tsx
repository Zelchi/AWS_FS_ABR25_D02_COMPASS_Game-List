export default function ColumnDates({ item, head }: { item: any; head: string }) {
  const date = new Date((item as any)[head]);
  
  if (date.getFullYear() < 1980) {
    return <span></span>;
  }
  
  return <span>{date.toLocaleDateString()}</span>;
}