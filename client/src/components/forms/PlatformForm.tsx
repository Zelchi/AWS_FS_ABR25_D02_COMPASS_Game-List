import { IPlatformEntity } from "@/../../server/src/Platform/PlatformEntity";

export default function PlatformForm({
  onSubmit,
  initialData,
}: {
  onSubmit: (data: IPlatformEntity) => void;
  initialData?: IPlatformEntity;
}) {
  return <form>Platform Form</form>;
}
