import { useState, useRef, useEffect } from 'react';
import { 
  FileText, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  Download,
  Share2,
  Check,
  Globe,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLiveData } from '@/hooks/useLiveData';
import jsPDF from 'jspdf';

export function AIReportPanel() {
  const { 
    prices, 
    news, 
    aiAnalysis, 
    isLoading, 
    isGeneratingReport, 
    error, 
    lastUpdated,
    refresh,
    generateReport 
  } = useLiveData();
  
  const [isExporting, setIsExporting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [copied, setCopied] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  // Auto-generate report when data is loaded
  useEffect(() => {
    if (prices.length > 0 && news.length > 0 && !aiAnalysis && !isGeneratingReport) {
      generateReport();
    }
  }, [prices, news, aiAnalysis, isGeneratingReport, generateReport]);

  const handleExportPDF = async () => {
    if (!aiAnalysis) return;
    
    setIsExporting(true);
    
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Add title
      doc.setFontSize(18);
      doc.setTextColor(33, 33, 33);
      doc.text('Vegetable Oils Market Intelligence Report', 20, 20);
      
      // Add metadata
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated: ${new Date().toLocaleString('en-GB')}`, 20, 30);
      doc.text('AI Generated Report - Oils & Fats Market Terminal', 20, 35);
      
      if (lastUpdated) {
        doc.text(`Data last updated: ${lastUpdated.toLocaleString('en-GB')}`, 20, 40);
      }
      
      // Add live prices summary
      let yPosition = 50;
      
      if (prices.length > 0) {
        doc.setFontSize(14);
        doc.setTextColor(33, 33, 33);
        doc.text('Current Market Prices', 20, yPosition);
        yPosition += 8;
        
        doc.setFontSize(9);
        doc.setTextColor(60, 60, 60);
        
        prices.slice(0, 5).forEach((price) => {
          const line = `${price.commodity} (${price.origin}): $${price.price.toFixed(2)}/${price.unit} ${price.basis}`;
          if (yPosition > 280) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(line, 20, yPosition);
          yPosition += 5;
        });
        
        yPosition += 5;
      }
      
      // Add AI Analysis
      if (yPosition > 220) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(14);
      doc.setTextColor(33, 33, 33);
      doc.text('AI Market Analysis', 20, yPosition);
      yPosition += 8;
      
      doc.setFontSize(9);
      doc.setTextColor(60, 60, 60);
      
      const contentLines = aiAnalysis.split('\n');
      contentLines.forEach((line) => {
        const cleanLine = line.replace(/\*\*/g, '').replace(/## /g, '').replace(/### /g, '');
        if (cleanLine.trim()) {
          const textLines = doc.splitTextToSize(cleanLine, 170);
          if (yPosition + (textLines.length * 3.5) > 285) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(textLines, 20, yPosition);
          yPosition += (textLines.length * 3.5);
        }
      });
      
      // Add footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(`Oils & Fats Market Terminal - Page ${i} of ${pageCount}`, 20, 292);
        doc.text('Data sources: Serper API, Tavily API, AI Analysis', 20, 296);
      }
      
      // Save PDF
      const filename = `Oils_Fats_Report_${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    if (!aiAnalysis) return;
    
    setIsSharing(true);
    
    try {
      const shareData = {
        title: 'Vegetable Oils Market Intelligence Report',
        text: `Vegetable Oils Market Intelligence Report\n\nGenerated: ${new Date().toLocaleString('en-GB')}\n\n${aiAnalysis.substring(0, 500)}...`,
        url: window.location.href
      };

      // Try Web Share API first
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        const textToCopy = `${shareData.title}\n\n${shareData.text}\n\nRead more: ${shareData.url}`;
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback: copy to clipboard
      try {
        const textToCopy = `Vegetable Oils Market Intelligence Report\n\n${window.location.href}`;
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (clipboardError) {
        alert('Unable to share. Please copy the URL manually.');
      }
    } finally {
      setIsSharing(false);
    }
  };

  const formatContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      // Headers
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-lg font-bold text-slate-200 mt-6 mb-3">
            {line.replace('## ', '')}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-base font-semibold text-slate-300 mt-4 mb-2">
            {line.replace('### ', '')}
          </h3>
        );
      }
      
      // Tables
      if (line.startsWith('|')) {
        return null;
      }
      
      // Bullet points
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="text-sm text-slate-400 ml-4 mb-1">
            {line.replace('- ', '')}
          </li>
        );
      }
      
      // Bold text
      if (line.includes('**')) {
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return (
          <p key={index} className="text-sm text-slate-400 mb-2">
            {parts.map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <span key={i} className="font-semibold text-slate-300">{part.slice(2, -2)}</span>;
              }
              return part;
            })}
          </p>
        );
      }
      
      // Empty lines
      if (line.trim() === '') {
        return <div key={index} className="h-2" />;
      }
      
      // Regular text
      return (
        <p key={index} className="text-sm text-slate-400 mb-2">
          {line}
        </p>
      );
    });
  };

  if (isLoading && prices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-slate-800 border-t-emerald-500 rounded-full animate-spin" />
          <Globe className="w-6 h-6 text-emerald-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <h3 className="text-lg font-medium text-slate-300 mt-6">Fetching Live Market Data...</h3>
        <p className="text-sm text-slate-500 mt-2">Connecting to Serper API and Tavily</p>
      </div>
    );
  }

  if (isGeneratingReport) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-slate-800 border-t-emerald-500 rounded-full animate-spin" />
          <Sparkles className="w-6 h-6 text-emerald-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <h3 className="text-lg font-medium text-slate-300 mt-6">Generating AI Analysis...</h3>
        <p className="text-sm text-slate-500 mt-2">Processing market data with Gemini/Groq</p>
        <div className="flex items-center gap-2 mt-4 text-xs text-slate-600">
          <span className="animate-pulse">Analyzing {prices.length} price points</span>
          <span>•</span>
          <span className="animate-pulse">Processing {news.length} news items</span>
        </div>
      </div>
    );
  }

  if (error && prices.length === 0) {
    return (
      <div className="text-center py-20">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <p className="text-slate-400 mb-2">Failed to load data</p>
        <p className="text-sm text-slate-500 mb-4">{error}</p>
        <Button onClick={refresh} variant="outline" className="border-slate-700">
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  if (!aiAnalysis) {
    return (
      <div className="text-center py-20">
        <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
        <p className="text-slate-500 mb-2">No AI analysis generated yet</p>
        <p className="text-sm text-slate-500 mb-4">
          {prices.length > 0 ? `Loaded ${prices.length} prices, ${news.length} news items` : 'Waiting for data...'}
        </p>
        <Button onClick={generateReport} className="bg-emerald-600 hover:bg-emerald-700">
          <Sparkles className="w-4 h-4 mr-2" />
          Generate AI Report
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6" ref={reportRef}>
      {/* Report Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Generated
            </Badge>
            {lastUpdated && (
              <span className="text-xs text-slate-500">
                Data: {lastUpdated.toLocaleString('en-GB')}
              </span>
            )}
            <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">
              <Globe className="w-3 h-3 mr-1" />
              Live Data
            </Badge>
          </div>
          <h2 className="text-xl font-bold text-slate-200">Vegetable Oils Market Intelligence Report</h2>
          <p className="text-sm text-slate-400 mt-2">
            Based on {prices.length} live price points and {news.length} recent news items
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            onClick={handleExportPDF}
            disabled={isExporting}
          >
            {isExporting ? (
              <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-1" />
            )}
            {isExporting ? 'Exporting...' : 'PDF'}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            onClick={handleShare}
            disabled={isSharing}
          >
            {isSharing ? (
              copied ? (
                <Check className="w-4 h-4 mr-1 text-emerald-400" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
              )
            ) : copied ? (
              <Check className="w-4 h-4 mr-1 text-emerald-400" />
            ) : (
              <Share2 className="w-4 h-4 mr-1" />
            )}
            {copied ? 'Copied!' : isSharing ? 'Sharing...' : 'Share'}
          </Button>
          <Button onClick={generateReport} size="sm" className="bg-emerald-600 hover:bg-emerald-700">
            <RefreshCw className="w-4 h-4 mr-1" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Live Prices Summary */}
      {prices.length > 0 && (
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium text-slate-200 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              Live Market Prices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {prices.slice(0, 8).map((price) => (
                <div key={price.id} className="bg-slate-950 rounded-lg p-3 border border-slate-800">
                  <div className="text-xs text-slate-500 mb-1">{price.commodity}</div>
                  <div className="text-lg font-bold text-slate-200">
                    ${price.price.toFixed(2)}
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-slate-500">{price.origin}</span>
                    <Badge variant="outline" className="border-slate-700 text-slate-500 text-[10px] ml-auto">
                      {price.basis}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Analysis */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium text-slate-200 flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            AI Market Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="prose prose-invert prose-sm max-w-none">
              {formatContent(aiAnalysis)}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Recent News */}
      {news.length > 0 && (
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium text-slate-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              Recent News ({news.length} items)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {news.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="border-slate-700 text-slate-500 text-[10px]">
                        {item.category}
                      </Badge>
                      <span className="text-xs text-slate-600">{item.source}</span>
                    </div>
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-slate-300 hover:text-emerald-400 transition-colors line-clamp-2"
                    >
                      {item.title}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Data Sources */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <AlertCircle className="w-4 h-4" />
        <span>Data sources: Serper API (Google Search), Tavily API, Gemini/Groq AI • Auto-refresh every 15 min</span>
      </div>
    </div>
  );
}
