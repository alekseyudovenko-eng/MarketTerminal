import { useState } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  Scale, 
  FileText, 
  Ship, 
  Newspaper, 
  Sparkles,
  Menu,
  Clock,
  Search,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from '@/components/ui/sheet';

import { PricesTable } from '@/sections/PricesTable';
import { SpreadsPanel } from '@/sections/SpreadsPanel';
import { TradePanel } from '@/sections/TradePanel';
import { DutiesPanel } from '@/sections/DutiesPanel';
import { LogisticsPanel } from '@/sections/LogisticsPanel';
import { NewsPanel } from '@/sections/NewsPanel';
import { AIReportPanel } from '@/sections/AIReportPanel';
import type { TerminalTab } from '@/types/market';

const navItems: { id: TerminalTab; label: string; icon: React.ElementType }[] = [
  { id: 'prices', label: 'Prices', icon: TrendingUp },
  { id: 'spreads', label: 'Spreads', icon: BarChart3 },
  { id: 'trade', label: 'Trade Flows', icon: Scale },
  { id: 'duties', label: 'Duties & Policy', icon: FileText },
  { id: 'logistics', label: 'Logistics', icon: Ship },
  { id: 'news', label: 'News', icon: Newspaper },
  { id: 'report', label: 'AI Report', icon: Sparkles },
];

const tickerData = [
  { symbol: 'SFO-BS', name: 'Sunflower Oil FOB Black Sea', price: 1228.25, change: 11.00, changePercent: 0.90 },
  { symbol: 'CPO-MY', name: 'Palm Oil CPO Malaysia', price: 982.25, change: -5.00, changePercent: -0.51 },
  { symbol: 'SBO-ARG', name: 'Soybean Oil FOB Argentina', price: 1102.50, change: 25.00, changePercent: 2.32 },
  { symbol: 'RSO-RDM', name: 'Rapeseed Oil FOB Rotterdam', price: 1294.50, change: 27.75, changePercent: 2.19 },
  { symbol: 'RBD-MY', name: 'RBD Palm Olein Malaysia', price: 1023.50, change: 17.25, changePercent: 1.71 },
];

function App() {
  const [activeTab, setActiveTab] = useState<TerminalTab>('prices');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'prices':
        return <PricesTable />;
      case 'spreads':
        return <SpreadsPanel />;
      case 'trade':
        return <TradePanel />;
      case 'duties':
        return <DutiesPanel />;
      case 'logistics':
        return <LogisticsPanel />;
      case 'news':
        return <NewsPanel />;
      case 'report':
        return <AIReportPanel />;
      default:
        return <PricesTable />;
    }
  };

  const getTabLabel = (tab: TerminalTab) => {
    return navItems.find(item => item.id === tab)?.label || tab;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="bg-slate-900 border-b border-slate-800">
        <div className="flex items-center justify-between h-14 px-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-500 rounded flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">OILS & FATS</h1>
              <p className="text-xs text-slate-500 leading-tight">MARKET TERMINAL</p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input 
                placeholder="Search commodities, prices, news..."
                className="pl-10 bg-slate-950 border-slate-700 text-slate-300 placeholder:text-slate-600"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 mr-4">
              <Clock className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-400">
                {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span className="text-xs text-slate-600">UTC</span>
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-slate-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
            </Button>
            
            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-slate-900 border-slate-800 w-64">
                <div className="flex flex-col gap-1 mt-4">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                          activeTab === item.id 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Ticker */}
        <div className="bg-slate-950 border-t border-slate-800 overflow-hidden">
          <div className="flex items-center h-9">
            <div className="flex-shrink-0 px-3 bg-slate-900 border-r border-slate-800 h-full flex items-center">
              <span className="text-xs font-medium text-emerald-400">LIVE</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center gap-8 animate-marquee whitespace-nowrap px-4">
                {[...tickerData, ...tickerData].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-400">{item.symbol}</span>
                    <span className="text-xs text-slate-300">${item.price.toFixed(2)}</span>
                    <span className={`text-xs ${item.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {item.change >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:flex w-56 flex-col bg-slate-900 border-r border-slate-800">
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                      isActive 
                        ? 'bg-emerald-500/15 text-emerald-400 border-l-2 border-emerald-500' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border-l-2 border-transparent'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.id === 'report' && (
                      <Badge className="ml-auto bg-emerald-500/20 text-emerald-400 text-[10px] px-1.5">AI</Badge>
                    )}
                  </button>
                );
              })}
            </div>
          </ScrollArea>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-800">
            <div className="text-xs text-slate-500 space-y-1">
              <p>Data delayed 15 min</p>
              <p>© 2026 Oils & Fats Terminal</p>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-hidden flex flex-col">
          {/* Page Header */}
          <div className="h-12 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-950">
            <h2 className="text-lg font-semibold text-slate-200">{getTabLabel(activeTab)}</h2>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-slate-700 text-slate-500 text-xs">
                <Clock className="w-3 h-3 mr-1" />
                Real-time
              </Badge>
            </div>
          </div>

          {/* Scrollable Content */}
          <ScrollArea className="flex-1">
            <div className="p-6">
              {renderContent()}
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}

export default App;
