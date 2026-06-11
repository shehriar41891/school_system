import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bus, MapPin, Clock, Phone } from "lucide-react";

export default function ParentTransport() {
  
  const routeDetails = {
    routeName: "Route A - North City",
    busNumber: "BUS-101",
    driverName: "Mike Johnson",
    driverPhone: "+1 (555) 345-6789",
    pickupTime: "07:30 AM",
    dropTime: "03:45 PM",
    stops: [
      { name: "North Station", time: "07:15 AM" },
      { name: "Oak Avenue", time: "07:25 AM" },
      { name: "Pine Street (Your Stop)", time: "07:30 AM", isCurrent: true },
      { name: "School Campus", time: "07:50 AM" },
    ]
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Transport Details</h1>
        <p className="text-muted-foreground">Bus route and timing information.</p>
      </div>

      <Card className="border-primary/20 shadow-md">
        <CardHeader className="bg-primary/5 border-b pb-6">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
                <Bus className="h-6 w-6" />
                {routeDetails.routeName}
              </CardTitle>
              <div className="flex items-center gap-4 mt-3">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold tracking-wider">
                  {routeDetails.busNumber}
                </span>
                <span className="text-sm font-medium text-muted-foreground">Bus Number</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x border-b">
            <div className="p-6 flex items-center gap-4">
              <div className="bg-muted p-3 rounded-full"><Clock className="h-6 w-6 text-muted-foreground" /></div>
              <div>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Morning Pickup</p>
                <p className="text-xl font-bold mt-1">{routeDetails.pickupTime}</p>
              </div>
            </div>
            <div className="p-6 flex items-center gap-4">
              <div className="bg-muted p-3 rounded-full"><Clock className="h-6 w-6 text-muted-foreground" /></div>
              <div>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Evening Drop</p>
                <p className="text-xl font-bold mt-1">{routeDetails.dropTime}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-b bg-muted/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Driver Contact</p>
                <p className="text-lg font-bold mt-1">{routeDetails.driverName}</p>
              </div>
              <div className="flex items-center gap-2 text-primary font-semibold">
                <Phone className="h-4 w-4" />
                {routeDetails.driverPhone}
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-accent" />
              Route Stops
            </h3>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[15px] before:h-full before:w-0.5 before:bg-border px-2">
              {routeDetails.stops.map((stop, idx) => (
                <div key={idx} className="relative flex items-center gap-6">
                  <div className={`h-8 w-8 rounded-full border-2 flex items-center justify-center z-10 shrink-0 bg-background
                    ${stop.isCurrent ? 'border-primary' : 'border-muted-foreground/30'}
                  `}>
                    <div className={`h-3 w-3 rounded-full ${stop.isCurrent ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
                  </div>
                  <div className="flex-1 flex justify-between items-center border-b pb-2">
                    <span className={`font-medium ${stop.isCurrent ? 'text-primary font-bold text-lg' : 'text-foreground'}`}>
                      {stop.name}
                    </span>
                    <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                      {stop.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
