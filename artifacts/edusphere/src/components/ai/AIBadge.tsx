import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AIBadge({ className }: { className?: string }) {
  return (
    <Badge variant="outline" className={`gap-1 border-violet-300 bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300 dark:border-violet-700 ${className ?? ""}`}>
      <Sparkles className="h-3 w-3" />
      AI Powered
    </Badge>
  );
}
