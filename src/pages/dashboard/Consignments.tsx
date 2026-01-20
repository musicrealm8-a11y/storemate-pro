import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { 
  Search, 
  Plus, 
  Package, 
  DollarSign, 
  Clock, 
  CheckCircle,
  AlertCircle,
  ArrowLeftRight,
  Eye
} from "lucide-react";
import { Consignment, ConsignmentItem, ConsignmentStatus } from "@/types/consignment";
import { useNavigate } from "react-router-dom";

// Mock clients
const mockClients = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Mike Johnson" },
  { id: "4", name: "Sarah Williams" },
];

// Mock products (available stock)
const mockProducts = [
  { id: "1", name: "Laptop Pro 15", price: 1299.99, availableStock: 50 },
  { id: "2", name: "Wireless Mouse", price: 49.99, availableStock: 200 },
  { id: "3", name: "USB-C Hub", price: 79.99, availableStock: 100 },
  { id: "4", name: "Mechanical Keyboard", price: 149.99, availableStock: 75 },
  { id: "5", name: "Monitor 27\"", price: 399.99, availableStock: 30 },
];

// Mock consignments
const initialConsignments: Consignment[] = [
  {
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
  {
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
  {
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
  {
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
];

const Consignments = () => {
  const navigate = useNavigate();
  const [consignments, setConsignments] = useState<Consignment[]>(initialConsignments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  // New consignment form state
  const [selectedClient, setSelectedClient] = useState("");
  const [advanceAmount, setAdvanceAmount] = useState("");
  const [selectedItems, setSelectedItems] = useState<{ productId: string; quantity: number }[]>([]);

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

  const filteredConsignments = consignments.filter(consignment => {
    const matchesSearch = 
      consignment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consignment.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || consignment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate summary stats
  const totalConsigned = consignments.filter(c => c.status === "issued" || c.status === "partially_settled").length;
  const totalAdvances = consignments
    .filter(c => c.status === "issued" || c.status === "partially_settled")
    .reduce((sum, c) => sum + c.advanceAmount, 0);
  const totalConsignedValue = consignments
    .filter(c => c.status === "issued" || c.status === "partially_settled")
    .reduce((sum, c) => sum + c.totalValue, 0);

  const addItemToConsignment = () => {
    setSelectedItems([...selectedItems, { productId: "", quantity: 1 }]);
  };

  const updateSelectedItem = (index: number, field: "productId" | "quantity", value: string | number) => {
    const updated = [...selectedItems];
    updated[index] = { ...updated[index], [field]: value };
    setSelectedItems(updated);
  };

  const removeSelectedItem = (index: number) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const calculateTotalValue = () => {
    return selectedItems.reduce((sum, item) => {
      const product = mockProducts.find(p => p.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const handleCreateConsignment = () => {
    if (!selectedClient) {
      toast({ title: "Error", description: "Please select a client", variant: "destructive" });
      return;
    }
    if (selectedItems.length === 0 || selectedItems.some(item => !item.productId)) {
      toast({ title: "Error", description: "Please add at least one product", variant: "destructive" });
      return;
    }

    const client = mockClients.find(c => c.id === selectedClient);
    const newConsignment: Consignment = {
      id: `CON-${String(consignments.length + 1).padStart(3, "0")}`,
      clientId: selectedClient,
      clientName: client?.name || "",
      items: selectedItems.map((item, index) => {
        const product = mockProducts.find(p => p.id === item.productId);
        return {
          id: `item-${Date.now()}-${index}`,
          productId: item.productId,
          productName: product?.name || "",
          quantity: item.quantity,
          pricePerUnit: product?.price || 0,
          soldQuantity: 0,
          returnedQuantity: 0,
        };
      }),
      advanceAmount: parseFloat(advanceAmount) || 0,
      totalValue: calculateTotalValue(),
      status: "issued",
      issuedDate: new Date().toISOString().split("T")[0],
    };

    setConsignments([newConsignment, ...consignments]);
    setIsCreateDialogOpen(false);
    setSelectedClient("");
    setAdvanceAmount("");
    setSelectedItems([]);
    
    toast({ 
      title: "Consignment Created", 
      description: `Consignment ${newConsignment.id} has been issued to ${newConsignment.clientName}` 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Consignments</h1>
          <p className="text-muted-foreground">Manage items issued on consignment to clients</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Consignment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Consignment</DialogTitle>
              <DialogDescription>
                Issue items to a client on consignment. These items will be moved from available stock to consigned stock.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Client</Label>
                  <Select value={selectedClient} onValueChange={setSelectedClient}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockClients.map(client => (
                        <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Advance Payment ($)</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={advanceAmount}
                    onChange={(e) => setAdvanceAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Items to Consign</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addItemToConsignment}>
                    <Plus className="h-3 w-3 mr-1" /> Add Item
                  </Button>
                </div>
                {selectedItems.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-4 text-center border rounded-lg">
                    No items added. Click "Add Item" to add products.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {selectedItems.map((item, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <Select
                          value={item.productId}
                          onValueChange={(value) => updateSelectedItem(index, "productId", value)}
                        >
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Select product" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockProducts.map(product => (
                              <SelectItem key={product.id} value={product.id}>
                                {product.name} - ${product.price} (Stock: {product.availableStock})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          type="number"
                          className="w-24"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateSelectedItem(index, "quantity", parseInt(e.target.value) || 1)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSelectedItem(index)}
                          className="text-destructive"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex justify-between text-sm">
                  <span>Total Consignment Value:</span>
                  <span className="font-semibold">${calculateTotalValue().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>Advance Payment:</span>
                  <span className="font-semibold">${parseFloat(advanceAmount || "0").toFixed(2)}</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateConsignment}>Create Consignment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Consignments</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConsigned}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Advances Held</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAdvances.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Refundable deposits</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Consigned Stock Value</CardTitle>
            <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalConsignedValue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Settlement</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {consignments.filter(c => c.status === "partially_settled").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by client or consignment ID..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="issued">Issued</SelectItem>
                <SelectItem value="partially_settled">Partially Settled</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="returned">Returned</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Consignments Table */}
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Consignment ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Advance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Issued Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredConsignments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No consignments found
                  </TableCell>
                </TableRow>
              ) : (
                filteredConsignments.map((consignment) => (
                  <TableRow key={consignment.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{consignment.id}</TableCell>
                    <TableCell>{consignment.clientName}</TableCell>
                    <TableCell>{consignment.items.length} items</TableCell>
                    <TableCell>${consignment.totalValue.toLocaleString()}</TableCell>
                    <TableCell>${consignment.advanceAmount.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(consignment.status)}</TableCell>
                    <TableCell>{consignment.issuedDate}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/dashboard/consignments/${consignment.id}`)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Consignments;
