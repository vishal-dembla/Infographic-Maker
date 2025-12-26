
import React, { useState, useRef } from 'react';
import { Printer, Database, Palette, Type as TypeIcon, Layers, TrendingUp, Info, MousePointer2, Copyright, Download, Loader2, Tag, Calendar, ShieldCheck, FileImage, ChevronDown, ChevronRight, BarChart3 } from 'lucide-react';
import { toPng } from 'html-to-image';
import { InfographicConfig, IconStyle, ThemeColor, LayoutMode, VisualizationType } from './types';
import { DEFAULT_CONFIG, MAX_DATA_VALUE } from './constants';
import DataVisualizer from './components/DataVisualizer';
import AIEditor from './components/AIEditor';

const App: React.FC = () => {
  const [config, setConfig] = useState<InfographicConfig>(DEFAULT_CONFIG);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isMetadataExpanded, setIsMetadataExpanded] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const oldTitle = document.title;
    document.title = `EDITORIAL_INFOGRAPHIC_${config.title.replace(/\s+/g, '_').toUpperCase()}`;
    window.print();
    document.title = oldTitle;
  };

  const handleDownloadPNG = async () => {
    if (!canvasRef.current) return;
    
    setIsExporting(true);
    const filename = `EDITORIAL_${config.title.replace(/\s+/g, '_').toUpperCase()}`;

    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const dataUrl = await toPng(canvasRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: '#ffffff',
        style: {
            margin: '0',
            padding: '80px',
            width: '850px',
            minHeight: '1100px',
        }
      });
      
      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to export PNG:', err);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const updateConfig = (key: keyof InfographicConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#d1d5db]">
      <aside className="no-print w-full lg:w-[400px] bg-white border-r border-slate-300 overflow-hidden flex flex-col h-screen sticky top-0 z-30 shadow-2xl">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
          <div>
            <h1 className="font-serif text-xl font-black text-slate-900 leading-none">The Engine</h1>
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Editorial Builder</span>
          </div>
          <button 
            onClick={handlePrint}
            className="p-2 bg-slate-100 text-slate-600 rounded hover:bg-slate-200 transition-colors"
            title="Export as PDF"
          >
            <Printer size={18} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-8 pb-10">
          <section className="space-y-4">
            <button 
              onClick={() => setIsMetadataExpanded(!isMetadataExpanded)}
              className="w-full flex items-center justify-between group"
            >
              <h2 className="text-[11px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 group-hover:text-slate-600 transition-colors">
                <Tag size={14} /> Metadata
              </h2>
              {isMetadataExpanded ? (
                <ChevronDown size={14} className="text-slate-300 group-hover:text-slate-500" />
              ) : (
                <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500" />
              )}
            </button>
            
            {isMetadataExpanded && (
              <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
                <div>
                  <label className="text-[9px] font-black uppercase text-slate-400 mb-1 block">Analysis ID</label>
                  <input 
                    type="text" value={config.analysisNo} onChange={(e) => updateConfig('analysisNo', e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded outline-none"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase text-slate-400 mb-1 block">Report Date</label>
                  <input 
                    type="text" value={config.dateLabel} onChange={(e) => updateConfig('dateLabel', e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded outline-none"
                  />
                </div>
              </div>
            )}
          </section>

          <section className="space-y-4">
            <h2 className="text-[11px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
              <TypeIcon size={14} /> Headlines & Narrative
            </h2>
            <div className="space-y-3">
              <div>
                <label className="text-[9px] font-black uppercase text-slate-400 mb-1 block">Main Headline</label>
                <input 
                  type="text" value={config.title} onChange={(e) => updateConfig('title', e.target.value)}
                  className="w-full text-sm p-2 bg-slate-50 border border-slate-200 rounded outline-none focus:ring-1 focus:ring-indigo-500 font-bold"
                />
              </div>
              <div>
                <label className="text-[9px] font-black uppercase text-slate-400 mb-1 block">Deck (Subtitle)</label>
                <input 
                  type="text" value={config.subtitle} onChange={(e) => updateConfig('subtitle', e.target.value)}
                  className="w-full text-sm p-2 bg-slate-50 border border-slate-200 rounded outline-none focus:ring-1 focus:ring-indigo-500 italic"
                />
              </div>
              <div>
                <label className="text-[9px] font-black uppercase text-slate-400 mb-1 block">Lead-in Paragraph</label>
                <textarea 
                  rows={3} value={config.leadIn} onChange={(e) => updateConfig('leadIn', e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded outline-none focus:ring-1 focus:ring-indigo-500 resize-none leading-relaxed"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-[11px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
              <Layers size={14} /> Credits & Callouts
            </h2>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="text-[9px] font-black uppercase text-slate-400 mb-1 block">Reported By (Byline)</label>
                <input 
                  type="text" value={config.byline} onChange={(e) => updateConfig('byline', e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded outline-none"
                />
              </div>
              <div>
                <label className="text-[9px] font-black uppercase text-slate-400 mb-1 block">Takeaway Tag (Callout)</label>
                <input 
                  type="text" value={config.takeaway} onChange={(e) => updateConfig('takeaway', e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded outline-none font-black text-indigo-600 uppercase"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-[11px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
              <Database size={14} /> Data Section
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-[9px] font-black uppercase text-slate-400 mb-1 block">Grid Section Title</label>
                <input 
                  type="text" value={config.gridTitle} onChange={(e) => updateConfig('gridTitle', e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded outline-none"
                />
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="text-[9px] font-black uppercase text-slate-400 mb-1 block">Chart Type</label>
                  <select 
                    value={config.visualizationType} onChange={(e) => updateConfig('visualizationType', e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded outline-none"
                  >
                    <option value={VisualizationType.ISOTYPE}>Isotype Grid (Icons)</option>
                    <option value={VisualizationType.BAR}>Bar Chart (Horizontal)</option>
                    <option value={VisualizationType.LINE}>Line Chart (Trend)</option>
                    <option value={VisualizationType.PIE}>Pie Chart (Circle)</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-bold mb-1 text-slate-500">
                  <span>Primary Value</span>
                  <span className="text-indigo-600 font-black">{config.dataValue}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" value={config.dataValue} 
                  onChange={(e) => updateConfig('dataValue', parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
              <div>
                <label className="text-[9px] font-black uppercase text-slate-400 mb-1 block">Contextual Annotation</label>
                <textarea 
                  rows={2} value={config.annotation} onChange={(e) => updateConfig('annotation', e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded italic outline-none"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-[11px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
              <ShieldCheck size={14} /> Branding & Footer
            </h2>
            <div className="space-y-3">
              <div>
                <label className="text-[9px] font-black uppercase text-slate-400 mb-1 block">Primary Footer Source</label>
                <textarea 
                  rows={2} value={config.footerText} onChange={(e) => updateConfig('footerText', e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded outline-none"
                />
              </div>
              <div>
                <label className="text-[9px] font-black uppercase text-slate-400 mb-1 block">Footer Branding Title</label>
                <input 
                  type="text" value={config.footerBranding} onChange={(e) => updateConfig('footerBranding', e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded outline-none font-bold"
                />
              </div>
              <div>
                <label className="text-[9px] font-black uppercase text-slate-400 mb-1 block">Footer Page Metadata</label>
                <input 
                  type="text" value={config.footerMetadata} onChange={(e) => updateConfig('footerMetadata', e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded outline-none font-mono"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-[11px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
              <Palette size={14} /> Theme & Style
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-1">
                <label className="text-[9px] font-black uppercase text-slate-400 mb-1 block">Theme Color</label>
                <select 
                  value={config.primaryColor} onChange={(e) => updateConfig('primaryColor', e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded outline-none"
                >
                  <option value={ThemeColor.GOLD}>Legacy Gold</option>
                  <option value={ThemeColor.RED}>Pulse Red</option>
                  <option value={ThemeColor.NAVY}>News Navy</option>
                  <option value={ThemeColor.BLACK}>Classic Black</option>
                  <option value={ThemeColor.CHARTREUSE}>Acid Lime</option>
                </select>
              </div>
              <div className="col-span-1">
                <label className="text-[9px] font-black uppercase text-slate-400 mb-1 block">Marker Style</label>
                <select 
                  value={config.iconStyle} onChange={(e) => updateConfig('iconStyle', e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded outline-none"
                  disabled={config.visualizationType !== VisualizationType.ISOTYPE}
                >
                  <optgroup label="Geometric">
                    <option value={IconStyle.HEXAGON}>Hexagon</option>
                    <option value={IconStyle.DIAMOND}>Diamond</option>
                    <option value={IconStyle.SQUARE}>Square</option>
                    <option value={IconStyle.CIRCLE}>Circle</option>
                  </optgroup>
                  <optgroup label="Pictograms">
                    <option value={IconStyle.SMILEY}>😊 Smiley</option>
                    <option value={IconStyle.THUMBSUP}>👍 Thumbs Up</option>
                    <option value={IconStyle.MAN}>👨 Man</option>
                    <option value={IconStyle.WOMAN}>👩 Woman</option>
                    <option value={IconStyle.PERSON}>👤 Person</option>
                    <option value={IconStyle.HEART}>❤️ Heart</option>
                    <option value={IconStyle.STAR}>⭐ Star</option>
                    <option value={IconStyle.BOLT}>⚡ Bolt</option>
                    <option value={IconStyle.BUILDING}>🏢 Building</option>
                    <option value={IconStyle.IDEA}>💡 Idea</option>
                  </optgroup>
                </select>
              </div>
            </div>
          </section>

          <AIEditor 
            currentImage={config.featuredImage} 
            onImageGenerated={(img) => updateConfig('featuredImage', img)}
            onImageClear={() => updateConfig('featuredImage', undefined)}
          />
        </div>

        <div className="shrink-0 p-6 bg-white border-t border-slate-100 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
          <button 
            onClick={handleDownloadPNG}
            disabled={isExporting}
            className="w-full bg-slate-900 hover:bg-black disabled:bg-slate-400 text-white font-bold py-4 px-4 rounded flex items-center justify-center gap-3 text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing PNG...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download Infographic
              </>
            )}
          </button>
        </div>
      </aside>

      <main className="flex-grow flex items-start justify-center p-4 md:p-12 overflow-auto bg-slate-300">
        <div 
          ref={canvasRef}
          id="infographic-canvas"
          className="bg-white w-full max-w-[850px] min-h-[1100px] shadow-[0_50px_100px_rgba(0,0,0,0.2)] p-12 md:p-20 flex flex-col relative border border-slate-200 shrink-0"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <header className="border-b-2 border-slate-900 pb-8 mb-12">
            <div className="flex justify-between items-baseline mb-6">
              <span className="text-[11px] font-black tracking-[0.3em] uppercase text-slate-400">{config.analysisNo}</span>
              <span className="text-[11px] font-black tracking-[0.3em] uppercase text-slate-400">{config.dateLabel}</span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase mb-4">
              {config.title}
            </h1>
            <p className="text-xl md:text-2xl font-serif italic text-slate-500 mb-6">
              {config.subtitle}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-2">
                <p className="text-sm md:text-base leading-relaxed text-slate-700 font-medium max-w-xl">
                  {config.leadIn}
                </p>
              </div>
              <div className="border-l border-slate-200 pl-6 flex flex-col justify-between h-full">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Reported by</span>
                <span className="text-sm font-bold text-slate-900 leading-tight">{config.byline}</span>
              </div>
            </div>
          </header>

          {config.featuredImage && (
            <div className="mb-12">
              <div className="relative group">
                <img src={config.featuredImage} className="w-full h-[350px] object-cover grayscale-[20%] contrast-[1.1] rounded-sm" alt="Feature" />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-slate-200">
                  Visual Context: AI Augmented Reconstruction
                </div>
              </div>
            </div>
          )}

          <section className="mb-16">
            <div className="mb-8">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-900">{config.gridTitle}</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <DataVisualizer 
                  type={config.visualizationType} 
                  value={config.dataValue} 
                  secondaryValue={config.secondaryMetricValue}
                  color={config.primaryColor} 
                  iconStyle={config.iconStyle} 
                />
              </div>
              
              <div className="lg:col-span-5 space-y-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-8xl font-serif font-black text-slate-900 leading-none tabular-nums">{config.dataValue}</span>
                  <span className="text-3xl font-black text-slate-300">%</span>
                </div>
                <div>
                  <div className="inline-block px-2 py-1 text-[10px] font-black text-white uppercase tracking-widest mb-4" style={{ backgroundColor: config.primaryColor }}>
                    {config.takeaway}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed italic border-l-2 border-slate-200 pl-4 font-medium">
                    "{config.annotation}"
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-auto">
             <div className="p-6 bg-slate-50 border border-slate-100 flex items-center gap-4 group hover:bg-white hover:shadow-xl transition-all">
                <div className="p-3 rounded-full bg-white shadow-sm">
                  <TrendingUp size={24} style={{ color: config.primaryColor }} />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 tabular-nums">
                    {config.secondaryMetricValue}%
                  </div>
                  <div className="text-[9px] font-black uppercase text-slate-400 tracking-wider leading-tight">
                    {config.secondaryMetricLabel}
                  </div>
                </div>
             </div>
             
             <div className="p-6 bg-slate-50 border border-slate-100 flex items-center gap-4">
                <div className="p-3 rounded-full bg-white shadow-sm">
                  <Info size={24} className="text-slate-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 leading-tight">
                    {config.metric2Title}
                  </div>
                  <div className="text-[9px] font-black uppercase text-slate-400 tracking-wider leading-tight">
                    {config.metric2Subtitle}
                  </div>
                </div>
             </div>

             <div className="p-6 bg-slate-50 border border-slate-100 flex items-center gap-4">
                <div className="p-3 rounded-full bg-white shadow-sm text-slate-300">
                  <MousePointer2 size={24} />
                </div>
                <div className="text-[9px] font-bold text-slate-400 leading-tight uppercase whitespace-pre-line">
                  {config.metric3Body}
                </div>
             </div>
          </section>

          <footer className="mt-20 pt-12 border-t-4 border-slate-900 flex justify-between items-end">
            <div className="max-w-md">
              <p className="text-[11px] font-bold text-slate-400 leading-relaxed uppercase tracking-[0.1em] mb-4">
                {config.footerText}
              </p>
              <div className="flex gap-1.5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-8 h-1" style={{ backgroundColor: config.primaryColor, opacity: (i + 1) * 0.15 }} />
                ))}
              </div>
            </div>
            <div className="text-right">
              <h2 className="font-serif text-3xl font-black text-slate-900 leading-none">{config.footerBranding}</h2>
              <span className="text-[9px] font-mono font-bold text-slate-300 uppercase tracking-widest">{config.footerMetadata}</span>
            </div>
          </footer>

          <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] mix-blend-multiply" />
          <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-slate-100 m-8" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-slate-100 m-8" />
        </div>
      </main>

      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 0; }
          body { background: white !important; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          main { padding: 0 !important; background: white !important; width: 100vw; height: 100vh; overflow: hidden; }
          #infographic-canvas {
            width: 210mm !important;
            height: 297mm !important;
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
            padding: 15mm !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
