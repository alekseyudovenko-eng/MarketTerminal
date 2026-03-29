import { 
  Ship, 
  MapPin,
  AlertCircle, 
  CheckCircle2, 
  Clock,
  AlertTriangle,
  Navigation
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { logistics } from '@/services/dataService';

export function LogisticsPanel() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'congested':
        return <AlertCircle className="w-5 h-5 text-amber-400" />;
      case 'delayed':
        return <Clock className="w-5 h-5 text-orange-400" />;
      case 'blocked':
        return <AlertTriangle className="w-5 h-5 text-rose-400" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'normal':
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Normal</Badge>;
      case 'congested':
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Congested</Badge>;
      case 'delayed':
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Delayed</Badge>;
      case 'blocked':
        return <Badge className="bg-rose-500/20 text-rose-400 border-rose-500/30">Blocked</Badge>;
      default:
        return <Badge className="bg-slate-500/20 text-slate-400">Unknown</Badge>;
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'low':
        return <span className="text-xs text-emerald-400">Low impact</span>;
      case 'medium':
        return <span className="text-xs text-amber-400">Medium impact</span>;
      case 'high':
        return <span className="text-xs text-rose-400">High impact</span>;
      default:
        return <span className="text-xs text-slate-500">Unknown</span>;
    }
  };

  const ports = logistics.filter(l => l.type === 'port');
  const borders = logistics.filter(l => l.type === 'border');
  const routes = logistics.filter(l => l.type === 'route');

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Normal</p>
                <p className="text-2xl font-bold text-emerald-400">
                  {logistics.filter(l => l.status === 'normal').length}
                </p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-emerald-400/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Congested</p>
                <p className="text-2xl font-bold text-amber-400">
                  {logistics.filter(l => l.status === 'congested').length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-amber-400/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Delayed</p>
                <p className="text-2xl font-bold text-orange-400">
                  {logistics.filter(l => l.status === 'delayed').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-400/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Blocked</p>
                <p className="text-2xl font-bold text-rose-400">
                  {logistics.filter(l => l.status === 'blocked').length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-rose-400/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ports Section */}
      <div>
        <h3 className="text-sm font-medium text-slate-400 mb-3 flex items-center gap-2">
          <Ship className="w-4 h-4" />
          Port Operations
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {ports.map((port) => (
            <Card key={port.id} className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(port.status)}
                    <CardTitle className="text-base font-medium text-slate-200">{port.location}</CardTitle>
                  </div>
                  {getStatusBadge(port.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-300">{port.description}</p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  {getImpactBadge(port.impact)}
                  <span className="text-xs text-slate-500">Updated: {port.updatedAt}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Borders Section */}
      <div>
        <h3 className="text-sm font-medium text-slate-400 mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Border Crossings
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {borders.map((border) => (
            <Card key={border.id} className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(border.status)}
                    <CardTitle className="text-base font-medium text-slate-200">{border.location}</CardTitle>
                  </div>
                  {getStatusBadge(border.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-300">{border.description}</p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  {getImpactBadge(border.impact)}
                  <span className="text-xs text-slate-500">Updated: {border.updatedAt}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Routes Section */}
      <div>
        <h3 className="text-sm font-medium text-slate-400 mb-3 flex items-center gap-2">
          <Navigation className="w-4 h-4" />
          Shipping Routes
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {routes.map((route) => (
            <Card key={route.id} className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(route.status)}
                    <CardTitle className="text-base font-medium text-slate-200">{route.location}</CardTitle>
                  </div>
                  {getStatusBadge(route.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-300">{route.description}</p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  {getImpactBadge(route.impact)}
                  <span className="text-xs text-slate-500">Updated: {route.updatedAt}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
