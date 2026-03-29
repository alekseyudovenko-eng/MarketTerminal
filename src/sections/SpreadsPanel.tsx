import { useMemo } from 'react';
import { ArrowRight, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { spreads } from '@/services/dataService';

export function SpreadsPanel() {
  const spreadAnalysis = useMemo(() => {
    return spreads.map(spread => ({
      ...spread,
      isWidening: spread.change > 0,
      isNarrowing: spread.change < 0,
    }));
  }, []);

  // Calculate some key metrics
  const avgSpread = spreadAnalysis.reduce((sum, s) => sum + s.spreadValue, 0) / spreadAnalysis.length;
  const wideningCount = spreadAnalysis.filter(s => s.isWidening).length;
  const narrowingCount = spreadAnalysis.filter(s => s.isNarrowing).length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Average Spread</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-200">
              ${avgSpread.toFixed(2)}/t
            </div>
            <p className="text-xs text-slate-500 mt-1">Across all tracked pairs</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Spreads Widening</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-400">
              {wideningCount}
            </div>
            <p className="text-xs text-slate-500 mt-1">Of {spreadAnalysis.length} tracked pairs</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Spreads Narrowing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-400">
              {narrowingCount}
            </div>
            <p className="text-xs text-slate-500 mt-1">Of {spreadAnalysis.length} tracked pairs</p>
          </CardContent>
        </Card>
      </div>

      {/* Spreads Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {spreadAnalysis.map((spread) => (
          <Card key={spread.id} className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium text-slate-200">{spread.name}</CardTitle>
                <div className={`flex items-center gap-1 text-sm ${spread.isWidening ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {spread.isWidening ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span>{spread.change > 0 ? '+' : ''}{spread.change.toFixed(2)}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-slate-400">{spread.commodity1}</div>
                <ArrowRight className="w-4 h-4 text-slate-600" />
                <div className="text-sm text-slate-400">{spread.commodity2}</div>
              </div>
              
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-slate-200">
                  ${spread.spreadValue.toFixed(2)}
                </span>
                <span className="text-sm text-slate-500 mb-1">/t</span>
              </div>

              {/* Visual bar */}
              <div className="mt-4">
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      spread.isWidening ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                    style={{ 
                      width: `${Math.min(Math.abs(spread.spreadValue) / 3, 100)}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-xs text-slate-500">
                  <span>$0</span>
                  <span>$300/t</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Key Insights */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-base font-medium text-slate-200 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-amber-400" />
            Spread Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm text-slate-300">
            <span className="font-medium text-emerald-400">Sunflower vs Palm Oil ($246/t):</span>
            {' '}Sunflower oil maintains significant premium over palm oil, supporting crush margins in Black Sea region despite export duty pressures.
          </div>
          <div className="text-sm text-slate-300">
            <span className="font-medium text-rose-400">Ukraine vs Russia Spread (-$144/t):</span>
            {' '}Ukrainian origin trading at discount to Russian FOB, reflecting logistics constraints and farmer selling patterns.
          </div>
          <div className="text-sm text-slate-300">
            <span className="font-medium text-emerald-400">RBD Palm Olein Premium ($41/t):</span>
            {' '}Processing margin expanded $22.25 on strong refined product demand from import markets.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
