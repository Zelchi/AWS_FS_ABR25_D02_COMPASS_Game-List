import { PlatformProvider } from "@/contexts/platformContext";
import PlatformsContent from "@/pages/Platforms/PlatformsContent";

export default function Platforms() {
  return (
    <PlatformProvider>
      <PlatformsContent />
    </PlatformProvider>
  );
}
