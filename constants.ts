
import { IconStyle, ThemeColor, LayoutMode, VisualizationType } from './types';

export const DEFAULT_CONFIG = {
  title: "The Urban Energy Deficit",
  subtitle: "A Comprehensive Study on Grid Saturation",
  leadIn: "As metropolitan centers expand, the gap between renewable generation and peak-hour consumption reaches a critical juncture. The following data highlights the strain on existing substations across the Northern Corridor.",
  takeaway: "CRITICAL LOAD WARNING",
  dataValue: 74,
  secondaryMetricValue: 18,
  secondaryMetricLabel: "Efficiency Loss YoY",
  metric2Title: "Substation Beta-Group",
  metric2Subtitle: "Highest Cluster Density",
  metric3Body: "Confidence Interval: 98.4% based on 12k data points",
  annotation: "Peak demand exceeds sustainable output by 22% during summer months.",
  iconStyle: IconStyle.HEXAGON,
  primaryColor: ThemeColor.RED,
  visualizationType: VisualizationType.ISOTYPE,
  footerText: "Data sourced from the International Energy Commission • Research Bureau",
  layout: 'EDITORIAL_FEATURE' as LayoutMode,
  byline: "Report by Analysis Division",
  analysisNo: "Analysis No. 042",
  dateLabel: "December 2025",
  gridTitle: "Quantitative Saturation",
  footerBranding: "THE ENGINE.",
  footerMetadata: "PRO-SYSTEM-X7 // PAGE 01"
};

export const MAX_DATA_VALUE = 100;
