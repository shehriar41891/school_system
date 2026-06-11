import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users } from "lucide-react";

export default function AdminClasses() {
  const { state } = useData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Classes</h1>
        <p className="text-muted-foreground">Overview of all active classes and their capacities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.classes.map((cls) => {
          const teacher = state.teachers.find(t => t.id === cls.teacherId);
          const percentFull = (cls.enrolled / cls.capacity) * 100;
          
          let capacityColor = "bg-success";
          let textColor = "text-success";
          if (percentFull >= 100) {
            capacityColor = "bg-destructive";
            textColor = "text-destructive";
          } else if (percentFull >= 80) {
            capacityColor = "bg-secondary"; // Amber
            textColor = "text-secondary";
          }

          return (
            <Card key={cls.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">
                    {cls.name} <span className="text-muted-foreground text-lg ml-1 font-normal">Sec {cls.section}</span>
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Class Teacher</span>
                  <p className="font-medium mt-1">{teacher?.name || "Unassigned"}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Users className="h-4 w-4" /> Capacity
                    </span>
                    <span className={`font-semibold ${textColor}`}>
                      {cls.enrolled} / {cls.capacity}
                    </span>
                  </div>
                  <Progress value={percentFull} className={`h-2 [&>div]:${capacityColor}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
