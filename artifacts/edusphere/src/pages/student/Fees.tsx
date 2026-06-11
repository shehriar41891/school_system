import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Download, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StudentFees() {
  const { state } = useData();
  
  // Use the first student's fee record
  const studentId = state.students[0].id;
  const feeRecord = state.fees.find(f => f.studentId === studentId);
  const totalFee = feeRecord ? feeRecord.tuition + feeRecord.transport + feeRecord.library : 0;

  const paymentHistory = [
    { date: "2023-08-01", amount: 1500, receipt: "REC-8921", mode: "Credit Card" },
    { date: "2023-09-05", amount: 1850, receipt: "REC-9102", mode: "Bank Transfer" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Fee Details</h1>
        <p className="text-muted-foreground">View your fee structure and payment history.</p>
      </div>

      {feeRecord?.status === "Overdue" && (
        <div className="bg-destructive/10 border border-destructive/50 text-destructive p-4 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
          <div className="flex-1">
            <h4 className="font-semibold">Payment Overdue</h4>
            <p className="text-sm">You have an outstanding balance of ${totalFee}. Please clear the dues by {feeRecord.dueDate}.</p>
          </div>
          <Button variant="destructive" size="sm">Pay Now</Button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fee Structure (Current Term)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fee Head</TableHead>
                      <TableHead className="text-right">Amount ($)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Tuition Fee</TableCell>
                      <TableCell className="text-right">{feeRecord?.tuition}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Transport Fee</TableCell>
                      <TableCell className="text-right">{feeRecord?.transport}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Library Fee</TableCell>
                      <TableCell className="text-right">{feeRecord?.library}</TableCell>
                    </TableRow>
                    <TableRow className="bg-muted/50 font-bold">
                      <TableCell>Total Payable</TableCell>
                      <TableCell className="text-right">${totalFee}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Mode</TableHead>
                      <TableHead>Receipt</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentHistory.map((payment, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell className="font-medium">${payment.amount}</TableCell>
                        <TableCell>{payment.mode}</TableCell>
                        <TableCell>{payment.receipt}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="text-primary">
                            <Download className="h-4 w-4 mr-2" /> Receipt
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className={feeRecord?.status === 'Overdue' ? 'border-destructive' : 'border-success'}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Current Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-6">
                {feeRecord?.status === 'Paid' ? (
                  <>
                    <CheckCircle2 className="h-16 w-16 text-success mb-4" />
                    <div className="text-2xl font-bold text-success">All Cleared</div>
                    <p className="text-sm text-muted-foreground mt-2 text-center">No outstanding dues for the current term.</p>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-16 w-16 text-destructive mb-4" />
                    <div className="text-3xl font-bold text-destructive">${totalFee}</div>
                    <p className="text-sm font-medium text-destructive mt-1">Due by {feeRecord?.dueDate}</p>
                    <Button className="w-full mt-6" variant="destructive">Proceed to Pay</Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
