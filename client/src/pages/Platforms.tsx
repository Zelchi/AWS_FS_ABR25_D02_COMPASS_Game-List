import { PlatformProvider } from "@/contexts/platformContext";
import PlatformsContent from "@/components/content/PlatformsContent";

export default function Platforms() {
  return (
    <PlatformProvider>
      <PlatformsContent />
    </PlatformProvider>
  );
}
