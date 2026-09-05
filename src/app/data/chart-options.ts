import type { EChartsOption } from 'echarts';
import { VizTheme } from './chart-theme';
import { MonthPoint, Cohort, FunnelStep, Adoption } from './seed';
import { usdCompact } from '../core/format';

/** Shared tooltip chrome so every chart's popover matches the surface. */
function tooltipBase(vt: VizTheme) {
  return {
    backgroundColor: vt.tooltipBg,
    borderColor: vt.tooltipBorder,
    borderWidth: 1,
    padding: [10, 12] as [number, number],
    textStyle: { color: vt.text, fontFamily: vt.fontUi, fontSize: 12 },
    extraCssText: 'border-radius:8px; box-shadow:0 10px 30px -12px rgba(0,0,0,.35);',
  };
}

const axisLabelMono = (vt: VizTheme, extra: object = {}) => ({
  color: vt.textMuted,
  fontFamily: vt.fontMono,
  fontSize: 11,
  ...extra,
});

/* --------------------------------------------------------------------------
   1. MRR — smooth area with gradient fill
   -------------------------------------------------------------------------- */
export function mrrAreaOption(vt: VizTheme, months: MonthPoint[]): EChartsOption {
  return {
    animationDuration: 600,
    grid: { left: 8, right: 14, top: 18, bottom: 6, containLabel: true },
    tooltip: {
      trigger: 'axis',
      ...tooltipBase(vt),
      formatter: (p: any) => {
        const d = p[0];
        return `<div style="font-family:${vt.fontMono};font-size:11px;color:${vt.textMuted};letter-spacing:.04em">${d.axisValue}</div>
          <div style="font-family:${vt.fontMono};font-size:15px;font-weight:600;color:${vt.text}">${usdCompact(d.value)}</div>`;
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: months.map((m) => m.label),
      axisLine: { lineStyle: { color: vt.axis } },
      axisTick: { show: false },
      axisLabel: axisLabelMono(vt, { margin: 12, interval: 2 }),
    },
    yAxis: {
      type: 'value',
      scale: true,
      splitNumber: 4,
      axisLabel: axisLabelMono(vt, { formatter: (v: number) => usdCompact(v) }),
      splitLine: { lineStyle: { color: vt.grid, type: 'dashed' } },
    },
    series: [
      {
        type: 'line',
        smooth: 0.35,
        symbol: 'circle',
        symbolSize: 6,
        showSymbol: false,
        data: months.map((m) => m.mrr),
        lineStyle: { color: vt.accent, width: 2.5 },
        itemStyle: { color: vt.accent, borderColor: vt.surface, borderWidth: 2 },
        emphasis: { focus: 'series' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: vt.accent + '55' },
              { offset: 1, color: vt.accent + '00' },
            ],
          },
        },
      },
    ],
  };
}

/* --------------------------------------------------------------------------
   2. MRR movements — diverging stacked bars
   -------------------------------------------------------------------------- */
export function movementsOption(vt: VizTheme, months: MonthPoint[]): EChartsOption {
  const last = months.slice(-12);
  const mk = (name: string, key: keyof MonthPoint, color: string, neg = false) => ({
    name,
    type: 'bar' as const,
    stack: 'mov',
    data: last.map((m) => (neg ? -(m[key] as number) : (m[key] as number))),
    itemStyle: { color, borderRadius: 1 },
    barMaxWidth: 22,
    emphasis: { focus: 'series' as const },
  });
  return {
    animationDuration: 600,
    legend: {
      top: 0, right: 0,
      itemWidth: 9, itemHeight: 9, itemGap: 14,
      icon: 'roundRect',
      textStyle: { color: vt.textMuted, fontFamily: vt.fontUi, fontSize: 11 },
    },
    grid: { left: 8, right: 8, top: 34, bottom: 4, containLabel: true },
    tooltip: {
      trigger: 'axis',
      ...tooltipBase(vt),
      axisPointer: { type: 'shadow', shadowStyle: { color: vt.grid + '80' } },
      valueFormatter: (v: any) => usdCompact(v as number),
    },
    xAxis: {
      type: 'category',
      data: last.map((m) => m.label),
      axisLine: { lineStyle: { color: vt.axis } },
      axisTick: { show: false },
      axisLabel: axisLabelMono(vt, { interval: 1 }),
    },
    yAxis: {
      type: 'value',
      axisLabel: axisLabelMono(vt, { formatter: (v: number) => usdCompact(v) }),
      splitLine: { lineStyle: { color: vt.grid, type: 'dashed' } },
    },
    series: [
      mk('New', 'newBiz', vt.series[0]),
      mk('Expansion', 'expansion', vt.pos),
      mk('Contraction', 'contraction', vt.warn, true),
      mk('Churn', 'churn', vt.neg, true),
    ],
  };
}

/* --------------------------------------------------------------------------
   3. Retention cohorts — heatmap
   -------------------------------------------------------------------------- */
export function cohortHeatmapOption(vt: VizTheme, cohorts: Cohort[]): EChartsOption {
  const maxCols = Math.max(...cohorts.map((c) => c.retention.length));
  const cols = Array.from({ length: maxCols }, (_, i) => `M${i}`);
  const rows = cohorts.map((c) => c.label);
  const data: [number, number, number][] = [];
  cohorts.forEach((c, y) => c.retention.forEach((v, x) => data.push([x, y, v])));

  return {
    animationDuration: 500,
    grid: { left: 8, right: 8, top: 8, bottom: 24, containLabel: true },
    tooltip: {
      ...tooltipBase(vt),
      formatter: (p: any) =>
        `<div style="font-family:${vt.fontMono};font-size:11px;color:${vt.textMuted}">${rows[p.value[1]]} · month ${p.value[0]}</div>
         <div style="font-family:${vt.fontMono};font-size:14px;font-weight:600;color:${vt.text}">${p.value[2]}% retained</div>`,
    },
    xAxis: {
      type: 'category',
      data: cols,
      position: 'bottom',
      splitArea: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: axisLabelMono(vt),
    },
    yAxis: {
      type: 'category',
      data: rows,
      inverse: true,
      splitArea: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: axisLabelMono(vt),
    },
    visualMap: {
      min: 55,
      max: 100,
      show: false,
      inRange: { color: [vt.heatLow, vt.accent] },
    },
    series: [
      {
        type: 'heatmap',
        data,
        label: {
          show: true,
          formatter: (p: any) => `${p.value[2]}`,
          fontFamily: vt.fontMono,
          fontSize: 10.5,
          color: vt.text,
        },
        itemStyle: { borderColor: vt.surface, borderWidth: 3, borderRadius: 4 },
        emphasis: { itemStyle: { borderColor: vt.text, borderWidth: 1 } },
      },
    ],
  };
}

/* --------------------------------------------------------------------------
   4. Activation funnel
   -------------------------------------------------------------------------- */
export function funnelOption(vt: VizTheme, steps: FunnelStep[]): EChartsOption {
  const top = steps[0].value;
  return {
    animationDuration: 600,
    color: vt.series,
    tooltip: {
      ...tooltipBase(vt),
      formatter: (p: any) =>
        `<div style="font-size:12px;color:${vt.text}">${p.name}</div>
         <div style="font-family:${vt.fontMono};font-size:13px;font-weight:600;color:${vt.text}">${p.value.toLocaleString()} <span style="color:${vt.textMuted}">· ${Math.round((p.value / top) * 100)}%</span></div>`,
    },
    series: [
      {
        type: 'funnel',
        left: 4, right: 4, top: 8, bottom: 8,
        minSize: '28%',
        maxSize: '100%',
        sort: 'descending',
        gap: 3,
        data: steps.map((s) => ({ name: s.label, value: s.value })),
        label: {
          position: 'inside',
          color: '#fff',
          fontFamily: vt.fontUi,
          fontSize: 12,
          fontWeight: 500,
          formatter: (p: any) => `${p.name}   ${Math.round((p.value / top) * 100)}%`,
        },
        labelLine: { show: false },
        itemStyle: { borderColor: vt.surface, borderWidth: 2 },
        emphasis: { label: { fontWeight: 600 } },
      },
    ],
  };
}

/* --------------------------------------------------------------------------
   6. Per-account usage — smooth area (generic index, no currency)
   -------------------------------------------------------------------------- */
export function usageAreaOption(vt: VizTheme, labels: string[], values: number[]): EChartsOption {
  return {
    animationDuration: 500,
    grid: { left: 4, right: 12, top: 16, bottom: 4, containLabel: true },
    tooltip: {
      trigger: 'axis',
      ...tooltipBase(vt),
      formatter: (p: any) => {
        const d = p[0];
        return `<div style="font-family:${vt.fontMono};font-size:11px;color:${vt.textMuted}">${d.axisValue}</div>
          <div style="font-family:${vt.fontMono};font-size:14px;font-weight:600;color:${vt.text}">${d.value} <span style="color:${vt.textMuted}">usage index</span></div>`;
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: labels,
      axisLine: { lineStyle: { color: vt.axis } },
      axisTick: { show: false },
      axisLabel: axisLabelMono(vt, { interval: 1 }),
    },
    yAxis: {
      type: 'value',
      scale: true,
      splitNumber: 3,
      axisLabel: axisLabelMono(vt),
      splitLine: { lineStyle: { color: vt.grid, type: 'dashed' } },
    },
    series: [
      {
        type: 'line',
        smooth: 0.4,
        symbol: 'none',
        data: values,
        lineStyle: { color: vt.accent, width: 2.5 },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: vt.accent + '4d' },
              { offset: 1, color: vt.accent + '00' },
            ],
          },
        },
      },
    ],
  };
}

/* --------------------------------------------------------------------------
   5. Feature adoption — horizontal bars with track
   -------------------------------------------------------------------------- */
export function adoptionOption(vt: VizTheme, rows: Adoption[]): EChartsOption {
  return {
    animationDuration: 600,
    grid: { left: 4, right: 40, top: 6, bottom: 4, containLabel: true },
    tooltip: {
      trigger: 'item',
      ...tooltipBase(vt),
      valueFormatter: (v: any) => `${v}% of accounts`,
    },
    xAxis: {
      type: 'value',
      max: 100,
      axisLabel: { show: false },
      axisLine: { show: false },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: rows.map((r) => r.label),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: vt.text, fontFamily: vt.fontUi, fontSize: 12.5 },
    },
    series: [
      {
        type: 'bar',
        data: rows.map((r) => r.value),
        barWidth: 13,
        showBackground: true,
        backgroundStyle: { color: vt.grid, borderRadius: 7 },
        itemStyle: {
          borderRadius: 7,
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 1, y2: 0,
            colorStops: [
              { offset: 0, color: vt.accent },
              { offset: 1, color: vt.series[1] },
            ],
          },
        },
        label: {
          show: true,
          position: 'right',
          formatter: (p: any) => `${p.value}%`,
          fontFamily: vt.fontMono,
          fontSize: 11.5,
          color: vt.textMuted,
        },
      },
    ],
  };
}
