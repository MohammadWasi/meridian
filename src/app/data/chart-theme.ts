import { Theme } from '../core/theme.service';

/** Palette handed to ECharts/D3 so charts match the CSS tokens in both themes. */
export interface VizTheme {
  text: string;
  textMuted: string;
  grid: string;
  axis: string;
  surface: string;
  tooltipBg: string;
  tooltipBorder: string;
  accent: string;
  pos: string;
  neg: string;
  warn: string;
  /** Low end of the retention heatmap ramp (high end is `accent`). */
  heatLow: string;
  /** Editorial categorical set — muted, cohesive, distinguishable in both themes. */
  series: string[];
  fontUi: string;
  fontMono: string;
}

const FONT_UI = '"Hanken Grotesk", ui-sans-serif, system-ui, sans-serif';
const FONT_MONO = '"JetBrains Mono", ui-monospace, monospace';

const LIGHT: VizTheme = {
  text: '#1b1813',
  textMuted: '#857d6f',
  grid: '#ece7dc',
  axis: '#d8d0bf',
  surface: '#ffffff',
  tooltipBg: '#ffffff',
  tooltipBorder: '#e6e0d4',
  accent: '#ea5b2a',
  pos: '#1e9e6a',
  neg: '#d64545',
  warn: '#d99a1c',
  heatLow: '#efe7d8',
  series: ['#ea5b2a', '#2d6e7e', '#d99a1c', '#5b6abf', '#8a9a5b', '#b4656f', '#3f7d6e'],
  fontUi: FONT_UI,
  fontMono: FONT_MONO,
};

const DARK: VizTheme = {
  text: '#f3efe6',
  textMuted: '#8f8676',
  grid: '#282219',
  axis: '#443c31',
  surface: '#1c1915',
  tooltipBg: '#201d18',
  tooltipBorder: '#3a332a',
  accent: '#ff6b3d',
  pos: '#35c98a',
  neg: '#f0656a',
  warn: '#e7b23e',
  heatLow: '#2a241b',
  series: ['#ff6b3d', '#4fa3b5', '#e7b23e', '#7d8ce0', '#a6b673', '#cf8791', '#58a08d'],
  fontUi: FONT_UI,
  fontMono: FONT_MONO,
};

export const vizTheme = (t: Theme): VizTheme => (t === 'dark' ? DARK : LIGHT);
