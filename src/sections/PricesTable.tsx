import { useState, useMemo } from 'react';
import { 
  ArrowUp, 
  ArrowDown, 
  TrendingUp, 
  TrendingDown,
  Search,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { currentPrices } from '@/services/dataService';
import type { PriceQuote } from '@/types/market';

export function PricesTable() {
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState<keyof PriceQuote>('commodity');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const filteredPrices = useMemo(() => {
    let data = [...currentPrices];
    
    if (filter) {
      const lowerFilter = filter.toLowerCase();
      data = data.filter(p => 
        p.commodity.toLowerCase().includes(lowerFilter) ||
        p.origin.toLowerCase().includes(lowerFilter) ||
        p.basis.toLowerCase().includes(lowerFilter)
      );
    }
    
    data.sort((a, b) => {
      const aVal = a[sortField] as string | number;
      const bVal = b[sortField] as string | number;
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    return data;
  }, [filter, sortField, sortDirection]);

  const handleSort = (field: keyof PriceQuote) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return `${currency} ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatChange = (change: number, changePercent: number) => {
    const isPositive = change >= 0;
    return (
      <div className={`flex items-center gap-1 ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        <span>{isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)</span>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Filter by commodity, origin, or basis..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-10 bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500"
          />
        </div>
        <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="border border-slate-800 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-900">
            <TableRow className="border-slate-800 hover:bg-transparent">
              <TableHead 
                className="text-slate-400 font-medium cursor-pointer hover:text-slate-200"
                onClick={() => handleSort('commodity')}
              >
                <div className="flex items-center gap-1">
                  Commodity
                  {sortField === 'commodity' && (
                    sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                  )}
                </div>
              </TableHead>
              <TableHead 
                className="text-slate-400 font-medium cursor-pointer hover:text-slate-200"
                onClick={() => handleSort('origin')}
              >
                <div className="flex items-center gap-1">
                  Origin
                  {sortField === 'origin' && (
                    sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                  )}
                </div>
              </TableHead>
              <TableHead className="text-slate-400 font-medium">Basis</TableHead>
              <TableHead 
                className="text-slate-400 font-medium cursor-pointer hover:text-slate-200 text-right"
                onClick={() => handleSort('price')}
              >
                <div className="flex items-center justify-end gap-1">
                  Price
                  {sortField === 'price' && (
                    sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                  )}
                </div>
              </TableHead>
              <TableHead className="text-slate-400 font-medium text-right">Change</TableHead>
              <TableHead className="text-slate-400 font-medium">Forward</TableHead>
              <TableHead className="text-slate-400 font-medium">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPrices.map((price) => (
              <TableRow key={price.id} className="border-slate-800 hover:bg-slate-900/50">
                <TableCell className="font-medium text-slate-200">{price.commodity}</TableCell>
                <TableCell className="text-slate-300">{price.origin}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                    {price.basis}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono text-slate-200">
                  {formatPrice(price.price, price.currency)}/{price.unit}
                </TableCell>
                <TableCell className="text-right">
                  {formatChange(price.change, price.changePercent)}
                </TableCell>
                <TableCell className="text-slate-400">{price.forward || '-'}</TableCell>
                <TableCell className="text-slate-500 text-sm">{price.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>Showing {filteredPrices.length} of {currentPrices.length} quotes</span>
        <span>Last updated: {new Date().toLocaleString('en-GB')}</span>
      </div>
    </div>
  );
}
