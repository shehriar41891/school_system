import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AlertCircle, Download, CheckCircle2 } from "lucide-react";

export default function ParentFees() {
  const { state } = useData();
  const student = state.students[0];
  const feeRecord = state.fees.find(f => f.studentId === student.id);
  const totalFee = feeRecord ? feeRecord.tuition + feeRecord.transport + feeRecord.library : 0;

  const paymentHistory = [
    { date: "2023-08-01", amount: 1500, receipt: "REC-8921", mode: "Credit Card" },
    { date: "2023-09-05", amount: 1850, receipt: "REC-9102", mode: "Bank Transfer" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Fee Payments</h1>
        <p className="text-muted-foreground">Manage fees and payments for {student.name}.</p>
      </div>

      {feeRecord?.status === "Overdue" && (
        <div className="bg-destructive/10 border border-destructive/50 text-destructive p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-semibold">Action Required: Payment Overdue</h4>
              <p className="text-sm">There is an outstanding balance of ${totalFee} due since {feeRecord.dueDate}.</p>
            </div>
          </div>
          <Button variant="destructive" className="shrink-0">Make Payment Now</Button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Term Dues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fee Description</TableHead>
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
                      <TableCell>Total Due</TableCell>
                      <TableCell className="text-right">${totalFee}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              {feeRecord?.status !== 'Paid' && (
                <div className="mt-4 flex justify-end">
                  <Button>Pay ${totalFee}</Button>
                </div>
              )}
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
                            <Download className="h-4 w-4 mr-2" /> Invoice
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
            <CardHeader className="pb-2 text-center">
              <CardTitle className="text-lg">Account Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-4">
                {feeRecord?.status === 'Paid' ? (
                  <>
                    <CheckCircle2 className="h-16 w-16 text-success mb-4" />
                    <div className="text-2xl font-bold text-success">Fully Paid</div>
                    <p className="text-sm text-muted-foreground mt-2 text-center">Thank you for your prompt payments.</p>
                  </>
                ) : (
                  <>
                    <div className="text-4xl font-bold text-destructive mb-2">${totalFee}</div>
                    <div className="bg-destructive/10 text-destructive px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wider">
                      {feeRecord?.status}
                    </div>
                    <p className="text-sm font-medium text-muted-foreground mt-4">Due Date: {feeRecord?.dueDate}</p>
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
