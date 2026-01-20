import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Package, 
  DollarSign, 
  CheckCircle, 
  RotateCcw,
  FileText,
  User,
  Calendar
} from "lucide-react";
import { Consignment, ConsignmentItem, ConsignmentStatus } from "@/types/consignment";

// Mock consignment data - in real app, this would come from API/state
const mockConsignmentData: Record<string, Consignment> = {
  "CON-001": {
    id: "CON-001",
    clientId: "1",
    clientName: "John Doe",
    items: [
      { id: "item-1", productId: "1", productName: "Laptop Pro 15", quantity: 5, pricePerUnit: 1299.99, soldQuantity: 2, returnedQuantity: 0 },
      { id: "item-2", productId: "2", productName: "Wireless Mouse", quantity: 20, pricePerUnit: 49.99, soldQuantity: 15, returnedQuantity: 0 },
    ],
    advanceAmount: 2000,
    totalValue: 7499.75,
    status: "partially_settled",
    issuedDate: "2024-01-10",
  },
  "CON-002": {
    id: "CON-002",
    clientId: "2",
    clientName: "Jane Smith",
    items: [
      { id: "item-3", productId: "3", productName: "USB-C Hub", quantity: 10, pricePerUnit: 79.99, soldQuantity: 0, returnedQuantity: 0 },
    ],
    advanceAmount: 500,
    totalValue: 799.90,
    status: "issued",
    issuedDate: "2024-01-15",
  },
  "CON-003": {
    id: "CON-003",
    clientId: "3",
    clientName: "Mike Johnson",
    items: [
      { id: "item-4", productId: "4", productName: "Mechanical Keyboard", quantity: 8, pricePerUnit: 149.99, soldQuantity: 8, returnedQuantity: 0 },
    ],
    advanceAmount: 500,
    totalValue: 1199.92,
    status: "sold",
    issuedDate: "2024-01-05",
    settledDate: "2024-01-12",
  },
  "CON-004": {
    id: "CON-004",
    clientId: "4",
    clientName: "Sarah Williams",
    items: [
      { id: "item-5", productId: "5", productName: "Monitor 27\"", quantity: 3, pricePerUnit: 399.99, soldQuantity: 0, returnedQuantity: 3 },
    ],
    advanceAmount: 400,
    totalValue: 1199.97,
    status: "returned",
    issuedDate: "2024-01-08",
    settledDate: "2024-01-14",
  },
};

const ConsignmentDetail = () => {
  const { consignmentId } = useParams<{ consignmentId: string }>();
  const navigate = useNavigate();
  
  const [consignment, setConsignment] = useState<Consignment | null>(
    consignmentId ? mockConsignmentData[consignmentId] || null : null
  );
  
  const [itemUpdates, setItemUpdates] = useState<Record<string, { sold: number; returned: number }>>({});
  const [additionalPayment, setAdditionalPayment] = useState("");
  const [isSettleDialogOpen, setIsSettleDialogOpen] = useState(false);
  const [isReturnDialogOpen, setIsReturnDialogOpen] = useState(false);

  if (!consignment) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Package className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold">Consignment Not Found</h2>
        <p className="text-muted-foreground mb-4">The consignment you're looking for doesn't exist.</p>
        <Button onClick={() => navigate("/dashboard/consignments")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Consignments
        </Button>
      </div>
    );
  }

  const getStatusBadge = (status: ConsignmentStatus) => {
    const styles = {
      issued: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      partially_settled: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      sold: "bg-green-500/10 text-green-500 border-green-500/20",
      returned: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      closed: "bg-muted text-muted-foreground border-muted",
    };
    const labels = {
      issued: "Issued",
      partially_settled: "Partially Settled",
      sold: "Sold",
      returned: "Returned",
      closed: "Closed",
    };
    return <Badge variant="outline" className={styles[status]}>{labels[status]}</Badge>;
  };

  // Calculate current state
  const calculateSummary = () => {
    let totalSoldValue = 0;
    let totalReturnedValue = 0;
    let remainingItems = 0;

    consignment.items.forEach(item => {
      const updates = itemUpdates[item.id] || { sold: 0, returned: 0 };
      const newSold = item.soldQuantity + updates.sold;
      const newReturned = item.returnedQuantity + updates.returned;
      const remaining = item.quantity - newSold - newReturned;

      totalSoldValue += newSold * item.pricePerUnit;
      totalReturnedValue += newReturned * item.pricePerUnit;
      remainingItems += remaining;
    });

    const balanceDue = totalSoldValue - consignment.advanceAmount;
    const refundDue = consignment.advanceAmount - totalSoldValue;

    return {
      totalSoldValue,
      totalReturnedValue,
      remainingItems,
      balanceDue: balanceDue > 0 ? balanceDue : 0,
      refundDue: refundDue > 0 ? refundDue : 0,
    };
  };

  const summary = calculateSummary();

  const handleItemUpdate = (itemId: string, field: "sold" | "returned", value: number) => {
    setItemUpdates(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        sold: prev[itemId]?.sold || 0,
        returned: prev[itemId]?.returned || 0,
        [field]: value,
      },
    }));
  };

  const getMaxQuantity = (item: ConsignmentItem, field: "sold" | "returned") => {
    const updates = itemUpdates[item.id] || { sold: 0, returned: 0 };
    const remaining = item.quantity - item.soldQuantity - item.returnedQuantity;
    if (field === "sold") {
      return remaining - updates.returned;
    }
    return remaining - updates.sold;
  };

  const handleSettlement = () => {
    // Create sales records for sold items
    const soldItems = consignment.items.filter(item => {
      const updates = itemUpdates[item.id];
      return updates && updates.sold > 0;
    });

    if (soldItems.length === 0 && !additionalPayment) {
      toast({ title: "Error", description: "No items marked as sold", variant: "destructive" });
      return;
    }

    // Update consignment status
    const allSettled = consignment.items.every(item => {
      const updates = itemUpdates[item.id] || { sold: 0, returned: 0 };
      const newSold = item.soldQuantity + updates.sold;
      const newReturned = item.returnedQuantity + updates.returned;
      return newSold + newReturned === item.quantity;
    });

    const newStatus: ConsignmentStatus = allSettled ? "closed" : "partially_settled";

    setConsignment({
      ...consignment,
      items: consignment.items.map(item => {
        const updates = itemUpdates[item.id] || { sold: 0, returned: 0 };
        return {
          ...item,
          soldQuantity: item.soldQuantity + updates.sold,
          returnedQuantity: item.returnedQuantity + updates.returned,
        };
      }),
      status: newStatus,
      settledDate: allSettled ? new Date().toISOString().split("T")[0] : undefined,
    });

    setItemUpdates({});
    setAdditionalPayment("");
    setIsSettleDialogOpen(false);

    toast({ 
      title: "Settlement Recorded", 
      description: `Consignment ${allSettled ? "closed" : "partially settled"}. ${soldItems.length} item(s) recorded as sales.` 
    });
  };

  const handleFullReturn = () => {
    // Return all remaining items
    setConsignment({
      ...consignment,
      items: consignment.items.map(item => ({
        ...item,
        returnedQuantity: item.quantity - item.soldQuantity,
      })),
      status: "returned",
      settledDate: new Date().toISOString().split("T")[0],
    });

    setIsReturnDialogOpen(false);

    toast({ 
      title: "Items Returned", 
      description: `All unsold items have been returned to stock. Advance of $${consignment.advanceAmount} should be refunded.` 
    });
  };

  const isEditable = consignment.status === "issued" || consignment.status === "partially_settled";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard/consignments")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">{consignment.id}</h1>
            {getStatusBadge(consignment.status)}
          </div>
          <p className="text-muted-foreground">Consignment details and settlement</p>
        </div>
        {isEditable && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsReturnDialogOpen(true)}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Return All
            </Button>
            <Button onClick={() => setIsSettleDialogOpen(true)}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Record Settlement
            </Button>
          </div>
        )}
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Client</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{consignment.clientName}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">${consignment.totalValue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Advance Paid</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-green-600">${consignment.advanceAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Refundable deposit</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Issued Date</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{consignment.issuedDate}</div>
            {consignment.settledDate && (
              <p className="text-xs text-muted-foreground">Settled: {consignment.settledDate}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Consigned Items</CardTitle>
          <CardDescription>Track sold and returned quantities for each item</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Price/Unit</TableHead>
                <TableHead className="text-right">Qty Issued</TableHead>
                <TableHead className="text-right">Qty Sold</TableHead>
                <TableHead className="text-right">Qty Returned</TableHead>
                <TableHead className="text-right">Remaining</TableHead>
                <TableHead className="text-right">Sold Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {consignment.items.map((item) => {
                const remaining = item.quantity - item.soldQuantity - item.returnedQuantity;
                const soldValue = item.soldQuantity * item.pricePerUnit;
                
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.productName}</TableCell>
                    <TableCell className="text-right">${item.pricePerUnit.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className="bg-green-500/10 text-green-600">
                        {item.soldQuantity}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className="bg-orange-500/10 text-orange-600">
                        {item.returnedQuantity}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={remaining > 0 ? "secondary" : "outline"}>
                        {remaining}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">${soldValue.toFixed(2)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Settlement Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Settlement Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Total Sold Value</p>
              <p className="text-xl font-bold text-green-600">
                ${consignment.items.reduce((sum, item) => sum + (item.soldQuantity * item.pricePerUnit), 0).toFixed(2)}
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Advance Received</p>
              <p className="text-xl font-bold">${consignment.advanceAmount.toFixed(2)}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Balance Due</p>
              <p className="text-xl font-bold text-blue-600">
                ${Math.max(0, consignment.items.reduce((sum, item) => sum + (item.soldQuantity * item.pricePerUnit), 0) - consignment.advanceAmount).toFixed(2)}
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Refund Due</p>
              <p className="text-xl font-bold text-orange-600">
                ${Math.max(0, consignment.advanceAmount - consignment.items.reduce((sum, item) => sum + (item.soldQuantity * item.pricePerUnit), 0)).toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settlement Dialog */}
      <Dialog open={isSettleDialogOpen} onOpenChange={setIsSettleDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Record Settlement</DialogTitle>
            <DialogDescription>
              Enter sold and returned quantities for each item. Sales will be recorded for sold items.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Available</TableHead>
                  <TableHead className="text-right">Mark Sold</TableHead>
                  <TableHead className="text-right">Mark Returned</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {consignment.items.map((item) => {
                  const remaining = item.quantity - item.soldQuantity - item.returnedQuantity;
                  if (remaining === 0) return null;
                  
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.productName}</TableCell>
                      <TableCell className="text-right">{remaining}</TableCell>
                      <TableCell className="text-right">
                        <Input
                          type="number"
                          min="0"
                          max={getMaxQuantity(item, "sold")}
                          className="w-20 ml-auto"
                          value={itemUpdates[item.id]?.sold || 0}
                          onChange={(e) => handleItemUpdate(item.id, "sold", parseInt(e.target.value) || 0)}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <Input
                          type="number"
                          min="0"
                          max={getMaxQuantity(item, "returned")}
                          className="w-20 ml-auto"
                          value={itemUpdates[item.id]?.returned || 0}
                          onChange={(e) => handleItemUpdate(item.id, "returned", parseInt(e.target.value) || 0)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span>New Sales Value:</span>
                <span className="font-semibold text-green-600">
                  ${Object.entries(itemUpdates).reduce((sum, [itemId, updates]) => {
                    const item = consignment.items.find(i => i.id === itemId);
                    return sum + (item ? updates.sold * item.pricePerUnit : 0);
                  }, 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Current Advance Balance:</span>
                <span className="font-semibold">${consignment.advanceAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Additional Payment Collected ($)</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={additionalPayment}
                onChange={(e) => setAdditionalPayment(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSettleDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSettlement}>Confirm Settlement</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Return All Dialog */}
      <Dialog open={isReturnDialogOpen} onOpenChange={setIsReturnDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Return All Items</DialogTitle>
            <DialogDescription>
              This will return all unsold items to available stock and mark the consignment as returned.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <p className="text-sm">
                <strong>Refund Due:</strong> ${consignment.advanceAmount.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                The advance amount should be refunded to the client since no items were sold.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReturnDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleFullReturn}>Confirm Return</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConsignmentDetail;
