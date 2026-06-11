import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Bus, Users, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminTransport() {
  const routes = [
    { id: 1, name: "Route A - North City", busNumber: "BUS-101", driver: "Mike Johnson", studentCount: 45, stops: ["North Station", "Oak Avenue", "Pine Street", "School"] },
    { id: 2, name: "Route B - South Suburbs", busNumber: "BUS-102", driver: "Sarah Williams", studentCount: 38, stops: ["South Mall", "Cedar Road", "Elm Park", "School"] },
    { id: 3, name: "Route C - East Valley", busNumber: "BUS-103", driver: "David Brown", studentCount: 42, stops: ["East Square", "Maple Drive", "Birch Lane", "School"] },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Transport</h1>
          <p className="text-muted-foreground">Manage bus routes and student transportation.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Route
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {routes.map(route => (
          <Card key={route.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg font-bold">{route.name}</CardTitle>
                  <p className="text-sm font-medium text-muted-foreground mt-1 flex items-center gap-1">
                    <Bus className="h-4 w-4" /> {route.busNumber}
                  </p>
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Users className="h-3 w-3" /> {route.studentCount}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div>
                <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Driver</span>
                <p className="font-medium text-sm mt-0.5">{route.driver}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2 block">Stops</span>
                <div className="space-y-3 relative before:absolute before:inset-0 before:ml-[11px] before:h-full before:w-0.5 before:bg-border">
                  {route.stops.map((stop, idx) => (
                    <div key={idx} className="relative flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 shrink-0">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-sm font-medium">{stop}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
