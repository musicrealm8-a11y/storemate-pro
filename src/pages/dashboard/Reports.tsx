import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  FileText, 
  Download, 
  Calendar,
  FileSpreadsheet,
  FileType
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const reportTypes = [
  { id: "daily", name: "Daily Sales Report", description: "Complete sales breakdown for a specific day" },
  { id: "monthly", name: "Monthly Summary", description: "Monthly revenue, expenses, and profit analysis" },
  { id: "yearly", name: "Annual Report", description: "Year-over-year performance metrics" },
  { id: "cashout", name: "Cash Out Report", description: "All cash transactions and withdrawals" },
  { id: "inventory", name: "Inventory Report", description: "Current stock levels and movement" },
];

const recentReports = [
  { name: "Daily Sales - Jan 15, 2024", date: "2024-01-15", type: "daily", size: "245 KB" },
  { name: "Monthly Summary - December 2023", date: "2024-01-01", type: "monthly", size: "1.2 MB" },
  { name: "Cash Out Report - Jan 14, 2024", date: "2024-01-14", type: "cashout", size: "128 KB" },
  { name: "Inventory Report - Jan 2024", date: "2024-01-10", type: "inventory", size: "856 KB" },
];

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [format, setFormat] = useState("pdf");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Report Generator */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Generate Report</h3>
          
          {/* Report Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {reportTypes.map(report => (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`p-4 rounded-lg border text-left transition-all ${
                  selectedReport === report.id
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-accent/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <FileText className={`h-5 w-5 mt-0.5 ${selectedReport === report.id ? "text-accent" : "text-muted-foreground"}`} />
                  <div>
                    <p className="font-medium text-foreground">{report.name}</p>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Date Range */}
          {selectedReport && (
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateFrom">From Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="dateFrom"
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateTo">To Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="dateTo"
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Export Format</Label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setFormat("pdf")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                      format === "pdf"
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <FileType className="h-4 w-4" />
                    PDF
                  </button>
                  <button
                    onClick={() => setFormat("csv")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                      format === "csv"
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <FileSpreadsheet className="h-4 w-4" />
                    CSV
                  </button>
                </div>
              </div>

              <Button variant="accent" className="w-full md:w-auto">
                <Download className="h-4 w-4 mr-2" />
                Generate & Download
              </Button>
            </div>
          )}
        </div>

        {/* Sample Report Preview */}
        {selectedReport === "daily" && (
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Report Preview</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left py-2 px-3 text-muted-foreground">Item</th>
                    <th className="text-left py-2 px-3 text-muted-foreground">Specification</th>
                    <th className="text-right py-2 px-3 text-muted-foreground">Qty</th>
                    <th className="text-right py-2 px-3 text-muted-foreground">Price</th>
                    <th className="text-right py-2 px-3 text-muted-foreground">Total</th>
                    <th className="text-left py-2 px-3 text-muted-foreground">Buyer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="py-2 px-3 text-foreground">iPhone 15 Pro</td>
                    <td className="py-2 px-3 text-muted-foreground">256GB, Blue</td>
                    <td className="py-2 px-3 text-right text-foreground">2</td>
                    <td className="py-2 px-3 text-right text-foreground">$1,099</td>
                    <td className="py-2 px-3 text-right font-medium text-foreground">$2,198</td>
                    <td className="py-2 px-3 text-muted-foreground">John D.</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="py-2 px-3 text-foreground">AirPods Pro 2</td>
                    <td className="py-2 px-3 text-muted-foreground">USB-C</td>
                    <td className="py-2 px-3 text-right text-foreground">1</td>
                    <td className="py-2 px-3 text-right text-foreground">$249</td>
                    <td className="py-2 px-3 text-right font-medium text-foreground">$249</td>
                    <td className="py-2 px-3 text-muted-foreground">Jane S.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Recent Reports */}
      <div className="space-y-4">
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Reports</h3>
          <div className="space-y-3">
            {recentReports.map((report, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="h-5 w-5 text-accent flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{report.name}</p>
                    <p className="text-xs text-muted-foreground">{report.size}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Export</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2" />
              Today's Sales
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2" />
              This Month
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2" />
              This Year
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
