
export enum IconStyle {
  // Geometric
  CIRCLE = 'circle',
  SQUARE = 'square',
  DIAMOND = 'diamond',
  HEXAGON = 'hexagon',
  TRIANGLE = 'triangle',
  
  // Emojis / Pictograms
  SMILEY = 'smiley',
  THUMBSUP = 'thumbsup',
  MAN = 'man',
  WOMAN = 'woman',
  PERSON = 'person',
  HEART = 'heart',
  STAR = 'star',
  BOLT = 'bolt',
  BUILDING = 'building',
  IDEA = 'idea'
}

export enum ThemeColor {
  GOLD = '#b2945e',
  RED = '#c32026',
  NAVY = '#1e293b',
  EMERALD = '#065f46',
  BLACK = '#000000',
  CHARTREUSE = '#a3e635'
}

export enum VisualizationType {
  ISOTYPE = 'isotype',
  BAR = 'bar',
  LINE = 'line',
  PIE = 'pie'
}

export type LayoutMode = 'STANDARD' | 'CENTERED' | 'EDITORIAL_FEATURE';

export interface InfographicConfig {
  title: string;
  subtitle: string;
  leadIn: string;
  takeaway: string;
  dataValue: number;
  secondaryMetricValue: number;
  secondaryMetricLabel: string;
  metric2Title: string;
  metric2Subtitle: string;
  metric3Body: string;
  annotation: string;
  iconStyle: IconStyle;
  primaryColor: ThemeColor;
  visualizationType: VisualizationType;
  footerText: string;
  layout: LayoutMode;
  featuredImage?: string;
  byline: string;
  analysisNo: string;
  dateLabel: string;
  gridTitle: string;
  footerBranding: string;
  footerMetadata: string;
}

export interface AIState {
  isProcessing: boolean;
  error?: string;
  prompt: string;
}
