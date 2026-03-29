import { useState, useMemo } from 'react';
import { 
  Newspaper, 
  TrendingUp, 
  Scale, 
  Ship, 
  Sprout, 
  Filter,
  ExternalLink,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { marketNews } from '@/services/dataService';

const categoryIcons = {
  prices: TrendingUp,
  trade: Scale,
  policy: Scale,
  logistics: Ship,
  production: Sprout,
};

const categoryColors = {
  prices: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  trade: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  policy: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  logistics: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  production: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
};

const categoryLabels = {
  prices: 'Prices',
  trade: 'Trade',
  policy: 'Policy',
  logistics: 'Logistics',
  production: 'Production',
};

export function NewsPanel() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredNews = useMemo(() => {
    let news = [...marketNews];
    news.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    if (selectedCategory) {
      news = news.filter(n => n.category === selectedCategory);
    }
    
    return news;
  }, [selectedCategory]);

  const newsByCategory = useMemo(() => {
    return {
      prices: marketNews.filter(n => n.category === 'prices').length,
      trade: marketNews.filter(n => n.category === 'trade').length,
      policy: marketNews.filter(n => n.category === 'policy').length,
      logistics: marketNews.filter(n => n.category === 'logistics').length,
      production: marketNews.filter(n => n.category === 'production').length,
    };
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory(null)}
          className={selectedCategory === null ? 'bg-slate-700' : 'border-slate-700 text-slate-400'}
        >
          <Filter className="w-3 h-3 mr-1" />
          All ({marketNews.length})
        </Button>
        {Object.entries(categoryLabels).map(([key, label]) => {
          const Icon = categoryIcons[key as keyof typeof categoryIcons];
          return (
            <Button
              key={key}
              variant={selectedCategory === key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(key)}
              className={selectedCategory === key ? 'bg-slate-700' : 'border-slate-700 text-slate-400'}
            >
              <Icon className="w-3 h-3 mr-1" />
              {label} ({newsByCategory[key as keyof typeof newsByCategory]})
            </Button>
          );
        })}
      </div>

      {/* News Feed */}
      <div className="space-y-4">
        {filteredNews.map((news) => {
          const Icon = categoryIcons[news.category];
          const badgeClass = categoryColors[news.category];
          
          return (
            <Card key={news.id} className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className={`${badgeClass} text-xs`}>
                        <Icon className="w-3 h-3 mr-1" />
                        {categoryLabels[news.category]}
                      </Badge>
                      <Badge variant="outline" className="border-slate-700 text-slate-500 text-xs">
                        {news.region}
                      </Badge>
                    </div>
                    <CardTitle className="text-base font-medium text-slate-200 leading-tight">
                      {news.title}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500 flex-shrink-0">
                    <Clock className="w-3 h-3" />
                    {formatDate(news.publishedAt)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {news.summary}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-slate-500">Source: {news.source}</span>
                  {news.url && (
                    <Button variant="ghost" size="sm" className="h-7 text-slate-400 hover:text-slate-200">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Read more
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredNews.length === 0 && (
        <div className="text-center py-12">
          <Newspaper className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-500">No news found for selected category</p>
        </div>
      )}
    </div>
  );
}
