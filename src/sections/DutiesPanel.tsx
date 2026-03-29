import { useState } from 'react';
import { 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Calendar,
  Info,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { duties } from '@/services/dataService';

export function DutiesPanel() {
  const [selectedCountry] = useState('Russia');

  const countryDuties = duties.filter(d => d.country === selectedCountry);
  
  const getChangeIcon = (changePercent: number | null | undefined) => {
    if (changePercent === null || changePercent === undefined) return <Minus className="w-4 h-4 text-slate-500" />;
    if (changePercent > 0) return <TrendingUp className="w-4 h-4 text-rose-400" />;
    if (changePercent < 0) return <TrendingDown className="w-4 h-4 text-emerald-400" />;
    return <Minus className="w-4 h-4 text-slate-500" />;
  };

  const getChangeClass = (changePercent: number | null | undefined) => {
    if (changePercent === null || changePercent === undefined) return 'text-slate-500';
    if (changePercent > 0) return 'text-rose-400';
    if (changePercent < 0) return 'text-emerald-400';
    return 'text-slate-500';
  };

  return (
    <div className="space-y-6">
      {/* Policy Alert Banner */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-amber-400">Policy Alert: Russia Export Duty Increase</h4>
          <p className="text-sm text-slate-300 mt-1">
            Sunflower oil export duty to spike <span className="font-bold text-rose-400">+67%</span> in April 2026 
            (16,222 RUB/t). Meal duty returns at 749.6 RUB/t after 3 months at zero.
          </p>
        </div>
      </div>

      <Tabs defaultValue="current" className="w-full">
        <TabsList className="bg-slate-900 border border-slate-800">
          <TabsTrigger value="current" className="data-[state=active]:bg-slate-800">Current Duties</TabsTrigger>
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-slate-800">Upcoming Changes</TabsTrigger>
          <TabsTrigger value="mechanism" className="data-[state=active]:bg-slate-800">Duty Mechanism</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {countryDuties.filter(d => d.effectiveDate <= '2026-03-31').map((duty) => (
              <Card key={duty.id} className="bg-slate-900 border-slate-800">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-medium text-slate-200">{duty.product}</CardTitle>
                      <CardDescription className="text-slate-500">{duty.country}</CardDescription>
                    </div>
                    <Badge 
                      variant={duty.changePercent && duty.changePercent > 0 ? 'destructive' : 'default'}
                      className={duty.changePercent === 0 ? 'bg-slate-700' : ''}
                    >
                      {duty.changePercent !== null && duty.changePercent !== undefined 
                        ? `${duty.changePercent > 0 ? '+' : ''}${duty.changePercent.toFixed(1)}%` 
                        : 'No change'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-200">
                      {duty.dutyAmount.toLocaleString()}
                    </span>
                    <span className="text-sm text-slate-500">{duty.currency}/{duty.unit}</span>
                  </div>

                  {duty.previousAmount && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-slate-500">Previous:</span>
                      <span className="text-slate-400">{duty.previousAmount.toLocaleString()} {duty.currency}/{duty.unit}</span>
                      {getChangeIcon(duty.changePercent)}
                    </div>
                  )}

                  <div className="pt-3 border-t border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-400">Effective: {duty.effectiveDate}</span>
                    </div>
                    {duty.indicativePrice && (
                      <div className="text-sm text-slate-500">
                        Indicative price: ${duty.indicativePrice}/t
                      </div>
                    )}
                    {duty.notes && (
                      <div className="flex items-start gap-2 text-sm">
                        <Info className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-400">{duty.notes}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {countryDuties.filter(d => d.effectiveDate > '2026-03-31').map((duty) => (
              <Card key={duty.id} className="bg-slate-900 border-slate-800 border-l-4 border-l-amber-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-medium text-slate-200">{duty.product}</CardTitle>
                      <CardDescription className="text-slate-500">{duty.country}</CardDescription>
                    </div>
                    <Badge variant="outline" className="border-amber-500 text-amber-400">
                      Effective {duty.effectiveDate}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-amber-400">
                      {duty.dutyAmount.toLocaleString()}
                    </span>
                    <span className="text-sm text-slate-500">{duty.currency}/{duty.unit}</span>
                  </div>

                  {duty.previousAmount && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-slate-500">Current:</span>
                      <span className="text-slate-400">{duty.previousAmount.toLocaleString()} {duty.currency}/{duty.unit}</span>
                      {duty.changePercent && (
                        <span className={getChangeClass(duty.changePercent)}>
                          ({duty.changePercent > 0 ? '+' : ''}{duty.changePercent.toFixed(1)}%)
                        </span>
                      )}
                    </div>
                  )}

                  <div className="pt-3 border-t border-slate-800 space-y-2">
                    {duty.indicativePrice && (
                      <div className="text-sm text-slate-500">
                        Projected indicative: ${duty.indicativePrice}/t
                      </div>
                    )}
                    {duty.notes && (
                      <div className="flex items-start gap-2 text-sm">
                        <Info className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-400">{duty.notes}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mechanism" className="mt-4">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-base font-medium text-slate-200 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                Russia Floating Export Duty Formula
              </CardTitle>
              <CardDescription className="text-slate-500">
                Effective since September 1, 2021. Extended through August 31, 2028.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <code className="text-sm text-emerald-400">
                  Duty = 70% × (Base Price - Indicative Price)
                </code>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-slate-300">Sunflower Oil</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Base Price:</span>
                      <span className="text-slate-300">82,500 RUB/t</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">March 2026 Indicative:</span>
                      <span className="text-slate-300">$1,258/t</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">April 2026 Indicative:</span>
                      <span className="text-amber-400">$1,270.9/t</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-slate-300">Sunflower Meal</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Base Price:</span>
                      <span className="text-slate-300">15,875 RUB/t</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">March 2026 Indicative:</span>
                      <span className="text-slate-300">$199.7/t</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">April 2026 Indicative:</span>
                      <span className="text-amber-400">$203.8/t</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <h4 className="font-medium text-slate-300 mb-2">Calculation Example (April 2026 Oil)</h4>
                <div className="space-y-1 text-sm font-mono">
                  <div className="text-slate-400">Base: 82,500 RUB/t</div>
                  <div className="text-slate-400">Indicative: $1,270.9/t ≈ 114,381 RUB/t (at 90 RUB/USD)</div>
                  <div className="text-slate-400">Difference: 114,381 - 82,500 = 31,881 RUB/t</div>
                  <div className="text-emerald-400">Duty: 70% × 31,881 = 22,317 RUB/t (capped at 16,222 RUB/t)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
