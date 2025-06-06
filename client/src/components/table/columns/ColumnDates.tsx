export default function ColumnDates({ item, head }: { item: any; head: string }) {
  const date = new Date((item as any)[head]);
  
  if (date.getFullYear() === 1969 && date.getMonth() === 11 && date.getDate() === 31) {
    return <span></span>;
  }
  
  return <span>{date.toLocaleDateString()}</span>;
}
