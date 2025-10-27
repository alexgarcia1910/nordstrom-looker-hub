import { useState, useRef, useEffect } from "react";
import { BookOpen, AlertCircle, Bell, Search, Lock } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Input } from "./ui/input";

const DASHBOARD_DATA = [
  {"name": "Sales Performance Dashboard", "domain": "Finance", "type": "Dashboard", "environment": "Production"},
  {"name": "Expense Forecast Explorer", "domain": "Finance", "type": "Explore", "environment": "Production"},
  {"name": "P&L Summary", "domain": "Finance", "type": "Dashboard", "environment": "Production"},
  {"name": "Budget Variance Analysis", "domain": "Finance", "type": "Dashboard", "environment": "Development"},
  {"name": "Revenue Trends", "domain": "Finance", "type": "Explore", "environment": "Production"},
  {"name": "Merch Performance Dashboard", "domain": "Merchandising", "type": "Dashboard", "environment": "Production"},
  {"name": "Inventory Levels Explorer", "domain": "Merchandising", "type": "Explore", "environment": "Production"},
  {"name": "Markdown Optimization Dashboard", "domain": "Merchandising", "type": "Dashboard", "environment": "Production"},
  {"name": "Product Margin Explorer", "domain": "Merchandising", "type": "Explore", "environment": "Development"},
  {"name": "Assortment Planning Dashboard", "domain": "Merchandising", "type": "Dashboard", "environment": "Production"},
  {"name": "Supplier On-Time Report", "domain": "Supply Chain", "type": "Dashboard", "environment": "Production"},
  {"name": "Inventory Turns Explorer", "domain": "Supply Chain", "type": "Explore", "environment": "Production"},
  {"name": "Warehouse Utilization Dashboard", "domain": "Supply Chain", "type": "Dashboard", "environment": "Development"},
  {"name": "Logistics Cost Analysis", "domain": "Supply Chain", "type": "Explore", "environment": "Production"},
  {"name": "Shipment Accuracy Dashboard", "domain": "Supply Chain", "type": "Dashboard", "environment": "Production"},
  {"name": "Store Operations Dashboard", "domain": "Store Selling", "type": "Dashboard", "environment": "Production"},
  {"name": "Store Sales Explorer", "domain": "Store Selling", "type": "Explore", "environment": "Production"},
  {"name": "Labor Hours Dashboard", "domain": "Store Selling", "type": "Dashboard", "environment": "Production"},
  {"name": "Conversion Rate Tracker", "domain": "Store Selling", "type": "Dashboard", "environment": "Development"},
  {"name": "Customer Satisfaction Explorer", "domain": "Store Selling", "type": "Explore", "environment": "Production"},
  {"name": "Tech Health Dashboard", "domain": "Technology", "type": "Dashboard", "environment": "Production"},
  {"name": "Incident Metrics Explorer", "domain": "Technology", "type": "Explore", "environment": "Production"},
  {"name": "System Uptime Dashboard", "domain": "Technology", "type": "Dashboard", "environment": "Production"},
  {"name": "ServiceNow Tickets Explorer", "domain": "Technology", "type": "Explore", "environment": "Production"},
  {"name": "Application Error Dashboard", "domain": "Technology", "type": "Dashboard", "environment": "Development"},
  {"name": "Customer 360 Dashboard", "domain": "Customer", "type": "Dashboard", "environment": "Production"},
  {"name": "Customer Feedback Explorer", "domain": "Customer", "type": "Explore", "environment": "Production"},
  {"name": "Loyalty Insights Dashboard", "domain": "Customer", "type": "Dashboard", "environment": "Production"},
  {"name": "Churn Prediction Explorer", "domain": "Customer", "type": "Explore", "environment": "Production"},
  {"name": "NPS Trends Dashboard", "domain": "Customer", "type": "Dashboard", "environment": "Development"},
  {"name": "Sales Pipeline Tracker", "domain": "Finance", "type": "Dashboard", "environment": "Production"},
  {"name": "AP Aging Explorer", "domain": "Finance", "type": "Explore", "environment": "Production"},
  {"name": "Discount Impact Dashboard", "domain": "Merchandising", "type": "Dashboard", "environment": "Production"},
  {"name": "Vendor Performance Explorer", "domain": "Merchandising", "type": "Explore", "environment": "Production"},
  {"name": "Out-of-Stock Report", "domain": "Supply Chain", "type": "Dashboard", "environment": "Production"},
  {"name": "Freight Cost Tracker", "domain": "Supply Chain", "type": "Dashboard", "environment": "Production"},
  {"name": "Store Footfall Explorer", "domain": "Store Selling", "type": "Explore", "environment": "Production"},
  {"name": "Daily POS Dashboard", "domain": "Store Selling", "type": "Dashboard", "environment": "Production"},
  {"name": "Incident Response Metrics", "domain": "Technology", "type": "Dashboard", "environment": "Production"},
  {"name": "API Latency Explorer", "domain": "Technology", "type": "Explore", "environment": "Development"},
  {"name": "Bug Fix Trends Dashboard", "domain": "Technology", "type": "Dashboard", "environment": "Production"},
  {"name": "Customer Orders Explorer", "domain": "Customer", "type": "Explore", "environment": "Production"},
  {"name": "Cross-Sell Analysis Dashboard", "domain": "Customer", "type": "Dashboard", "environment": "Production"},
  {"name": "Refund Analytics Explorer", "domain": "Finance", "type": "Explore", "environment": "Production"},
  {"name": "Sales vs Forecast Dashboard", "domain": "Finance", "type": "Dashboard", "environment": "Production"},
  {"name": "Inventory Accuracy Explorer", "domain": "Supply Chain", "type": "Explore", "environment": "Production"},
  {"name": "SKU Turnover Dashboard", "domain": "Merchandising", "type": "Dashboard", "environment": "Production"},
  {"name": "Data Quality Monitor", "domain": "Technology", "type": "Dashboard", "environment": "Production"},
  {"name": "Customer Sentiment Dashboard", "domain": "Customer", "type": "Dashboard", "environment": "Production"}
];

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredResults = searchQuery.length >= 2
    ? DASHBOARD_DATA.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.domain.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setShowDropdown(value.length >= 2);
  };

  const handleResultClick = (name: string) => {
    alert(name);
    setShowDropdown(false);
    setSearchQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && filteredResults.length > 0) {
      handleResultClick(filteredResults[0].name);
    }
  };

  return (
    <nav className="border-b border-border bg-background">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="relative" ref={dropdownRef}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Find data..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-9 h-9 w-80 rounded-full border-border"
          />
          
          {showDropdown && filteredResults.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-50">
              <div className="max-h-[300px] overflow-y-auto">
                {filteredResults.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleResultClick(item.name)}
                    className="px-4 py-2.5 cursor-pointer hover:bg-muted/50 border-b border-border last:border-b-0 transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-base mt-0.5">
                        {item.type === "Dashboard" ? "📊" : "🔍"}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-foreground">
                          {item.name}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <span>{item.domain}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            {item.environment === "Production" ? "✅" : "🧪"} {item.environment}
                          </span>
                          {item.environment === "Production" && (
                            <>
                              <span>·</span>
                              <Lock className="h-3 w-3" />
                            </>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {item.type}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          
          <Button
            variant="ghost"
            size="sm"
            className="text-sm font-normal"
            asChild
          >
            <Link to="/alerts">
              <Bell className="mr-2 h-4 w-4" />
              Alerts
            </Link>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-sm font-normal"
            asChild
          >
            <a href="https://nordstrom.com" target="_blank" rel="noopener noreferrer">
              <BookOpen className="mr-2 h-4 w-4" />
              Job Aids
            </a>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-sm font-normal"
            asChild
          >
            <a href="https://nordstrom.com" target="_blank" rel="noopener noreferrer">
              <AlertCircle className="mr-2 h-4 w-4" />
              Issue Escalation
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
};
