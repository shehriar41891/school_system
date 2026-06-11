import { Info, Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AIDisclaimerBanner({ compact }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
        <Sparkles className="h-3 w-3 text-violet-500" />
        Demo AI analysis — connect your API keys later for live intelligence.
      </p>
    );
  }

  return (
    <Alert className="border-violet-200 bg-violet-50/50 dark:bg-violet-950/20 dark:border-violet-800">
      <Info className="h-4 w-4 text-violet-600" />
      <AlertTitle className="text-violet-800 dark:text-violet-300">Demo AI Mode</AlertTitle>
      <AlertDescription className="text-violet-700/90 dark:text-violet-400">
        All insights, reports, and chatbot replies use simulated AI analysis for demonstration.
        When you integrate real AI (OpenAI, Gemini, etc.), every feature here becomes live —
        deeper analysis, personalized recommendations, and predictive alerts for your entire school.
      </AlertDescription>
    </Alert>
  );
}
