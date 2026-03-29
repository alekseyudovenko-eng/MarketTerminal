import { useMemo } from 'react';
import { 
  Scale, 
  TrendingUp, 
  TrendingDown,
  Globe,
  Package
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { tradeFlows, productionData } from '@/services/dataService';

export function TradePanel() {
  const totalExports = useMemo(() => {
    return tradeFlows.reduce((sum, flow) => sum + flow.volume, 0);
  }, []);

  const totalProduction = useMemo(() => {
    return productionData.reduce((sum, p) => sum + p.volume, 0);
  }, []);

  const getChangeIndicator = (change: number | null | undefined) => {
    if (change === null || change === undefined) return <span className="text-slate-500">-</span>;
    if (change > 0) return (
      <div className="flex items-center gap-1 text-emerald-400">
        <TrendingUp className="w-3 h-3" />
        <span>+{change.toFixed(1)}%</span>
      </div>
    );
    if (change < 0) return (
      <div className="flex items-center gap-1 text-rose-400">
        <TrendingDown className="w-3 h-3" />
        <span>{change.toFixed(1)}%</span>
      </div>
    );
    return <span className="text-slate-500">0%</span>;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <Scale className="w-4 h-4" />
              Tracked Export Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-200">
              {totalExports.toFixed(1)} <span className="text-sm font-normal text-slate-500">mmt</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Current season flows</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Tracked Production
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-200">
              {totalProduction.toFixed(1)} <span className="text-sm font-normal text-slate-500">mmt</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Current season output</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Active Trade Routes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-200">
              {tradeFlows.length}
            </div>
            <p className="text-xs text-slate-500 mt-1">Monitored corridors</p>
          </CardContent>
        </Card>
      </div>

      {/* Trade Flows Table */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-base font-medium text-slate-200 flex items-center gap-2">
            <Scale className="w-4 h-4 text-blue-400" />
            Export Flows by Origin
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-slate-950">
              <TableRow className="border-slate-800 hover:bg-transparent">
                <TableHead className="text-slate-400">Exporter</TableHead>
                <TableHead className="text-slate-400">Product</TableHead>
                <TableHead className="text-slate-400">Volume</TableHead>
                <TableHead className="text-slate-400">Period</TableHead>
                <TableHead className="text-slate-400 text-right">YoY Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tradeFlows.map((flow) => (
                <TableRow key={flow.id} className="border-slate-800 hover:bg-slate-950/50">
                  <TableCell className="font-medium text-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      {flow.exporter}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-300">{flow.product}</TableCell>
                  <TableCell className="text-slate-200">
                    <span className="font-mono">{flow.volume}</span>
                    <span className="text-slate-500 text-sm ml-1">{flow.unit}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-slate-700 text-slate-400 text-xs">
                      {flow.period}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {getChangeIndicator(flow.changeYoY)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Production Data */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-base font-medium text-slate-200 flex items-center gap-2">
            <Package className="w-4 h-4 text-emerald-400" />
            Production by Country
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-slate-950">
              <TableRow className="border-slate-800 hover:bg-transparent">
                <TableHead className="text-slate-400">Country</TableHead>
                <TableHead className="text-slate-400">Product</TableHead>
                <TableHead className="text-slate-400">Volume</TableHead>
                <TableHead className="text-slate-400">Season</TableHead>
                <TableHead className="text-slate-400 text-right">YoY Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productionData.map((prod) => (
                <TableRow key={prod.id} className="border-slate-800 hover:bg-slate-950/50">
                  <TableCell className="font-medium text-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      {prod.country}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-300">{prod.product}</TableCell>
                  <TableCell className="text-slate-200">
                    <span className="font-mono">{prod.volume}</span>
                    <span className="text-slate-500 text-sm ml-1">{prod.unit}</span>
                    {prod.forecast && (
                      <Badge variant="outline" className="ml-2 border-amber-500/30 text-amber-400 text-xs">
                        Est: {prod.forecast}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-slate-700 text-slate-400 text-xs">
                      {prod.season}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {getChangeIndicator(prod.changeYoY)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Market Share Visualization */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-base font-medium text-slate-200 flex items-center gap-2">
            <Globe className="w-4 h-4 text-purple-400" />
            Sunflower Oil Export Market Share (MY 2024/25)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { country: 'Ukraine', volume: 5.7, total: 11.2, color: 'bg-blue-500' },
              { country: 'Russia', volume: 5.1, total: 11.2, color: 'bg-rose-500' },
              { country: 'Argentina', volume: 0.4, total: 11.2, color: 'bg-emerald-500' },
            ].map((item) => {
              const percentage = (item.volume / item.total) * 100;
              return (
                <div key={item.country} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">{item.country}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-slate-400">{item.volume} mmt</span>
                      <span className="text-slate-200 font-mono w-12 text-right">{percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-500">
            Total estimated sunflower oil exports: 11.2 mmt (MY 2024/25)
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
