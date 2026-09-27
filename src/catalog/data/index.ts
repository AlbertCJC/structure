import type { ComponentType } from 'react'
import { tag } from '../rawTag'
import { AnimatedBarChart } from './AnimatedBarChart'
import { DonutChartDraw } from './DonutChartDraw'
import { SparklineDraw } from './SparklineDraw'
import { StatCounter } from './StatCounter'
import { SpeedGauge } from './SpeedGauge'
import { HeatmapGrid } from './HeatmapGrid'
import { FunnelChart } from './FunnelChart'
import { TableHover } from './TableHover'
import { Leaderboard } from './Leaderboard'
import { RadialProgressTrio } from './RadialProgressTrio'
import { AreaWaveChart } from './AreaWaveChart'
import { DiffTimeline } from './DiffTimeline'
// ── family files (4 demos each) ──────────────────────────────────────────
import { GroupedPairBars, GoalMarkerBar, RacingFrameBars, DivergingWinlossBars } from './BarSet'
import { SlicePullPie, GrowArcDonut, HalfDonutLoad, LegendSyncDonut } from './PieSet'
import { PulsingPointSpark, CompareDashedLines, CrosshairSnapChart, ThresholdFlashChart } from './LineSet'
import { GoalFillRing, DeltaSparkChip, CapWarningBar, StreakWeekDots } from './StatWidgets'
import { StaggerMountTable, SortHeaderTable, SelectActionsTable, FlashCellTable } from './TableBits2'
import { NeighborNodeGraph, FlowDashGraph, TwistyTreeList, OrgConnectorChart } from './GraphBits'
import { SweepTickGauge, CapacityBlockMeter, ThermoRulerMeter, JitterRpmMeter } from './MeterSet'

import barChart from './AnimatedBarChart.tsx?raw'
import donut from './DonutChartDraw.tsx?raw'
import sparkline from './SparklineDraw.tsx?raw'
import statCounter from './StatCounter.tsx?raw'
import gauge from './SpeedGauge.tsx?raw'
import heatmap from './HeatmapGrid.tsx?raw'
import funnel from './FunnelChart.tsx?raw'
import table from './TableHover.tsx?raw'
import leaderboard from './Leaderboard.tsx?raw'
import radialTrio from './RadialProgressTrio.tsx?raw'
import areaWave from './AreaWaveChart.tsx?raw'
import timeline from './DiffTimeline.tsx?raw'
import barSet from './BarSet.tsx?raw'
import pieSet from './PieSet.tsx?raw'
import lineSet from './LineSet.tsx?raw'
import statWidgets from './StatWidgets.tsx?raw'
import tableBits2 from './TableBits2.tsx?raw'
import graphBits from './GraphBits.tsx?raw'
import meterSet from './MeterSet.tsx?raw'

export const dataRenderers: Record<string, ComponentType> = {
  'animated-bar-chart': AnimatedBarChart,
  'donut-chart-draw': DonutChartDraw,
  'sparkline-draw': SparklineDraw,
  'stat-counter': StatCounter,
  'speed-gauge': SpeedGauge,
  'heatmap-grid': HeatmapGrid,
  'funnel-chart': FunnelChart,
  'table-hover': TableHover,
  'leaderboard': Leaderboard,
  'radial-progress-trio': RadialProgressTrio,
  'area-wave-chart': AreaWaveChart,
  'diff-timeline': DiffTimeline,
  'grouped-pair-bars': GroupedPairBars,
  'goal-marker-bar': GoalMarkerBar,
  'racing-frame-bars': RacingFrameBars,
  'diverging-winloss-bars': DivergingWinlossBars,
  'slice-pull-pie': SlicePullPie,
  'grow-arc-donut': GrowArcDonut,
  'half-donut-load': HalfDonutLoad,
  'legend-sync-donut': LegendSyncDonut,
  'pulsing-point-spark': PulsingPointSpark,
  'compare-dashed-lines': CompareDashedLines,
  'crosshair-snap-chart': CrosshairSnapChart,
  'threshold-flash-chart': ThresholdFlashChart,
  'goal-fill-ring': GoalFillRing,
  'delta-spark-chip': DeltaSparkChip,
  'cap-warning-bar': CapWarningBar,
  'streak-week-dots': StreakWeekDots,
  'stagger-mount-table': StaggerMountTable,
  'sort-header-table': SortHeaderTable,
  'select-actions-table': SelectActionsTable,
  'flash-cell-table': FlashCellTable,
  'neighbor-node-graph': NeighborNodeGraph,
  'flow-dash-graph': FlowDashGraph,
  'twisty-tree-list': TwistyTreeList,
  'org-connector-chart': OrgConnectorChart,
  'sweep-tick-gauge': SweepTickGauge,
  'capacity-block-meter': CapacityBlockMeter,
  'thermo-ruler-meter': ThermoRulerMeter,
  'jitter-rpm-meter': JitterRpmMeter,
}

const BARS = 'grouped-pair · goal-marker · racing-frames · diverging'
const PIES = 'slice-pull · grow-arc · half-donut · legend-sync'
const LINES = 'pulsing-point · compare-dashed · crosshair-snap · threshold-flash'
const STATS = 'goal-ring · delta-spark · cap-warning · streak-week'
const TABLES = 'stagger-mount · sort-header · select-rows · flash-cell'
const GRAPHS = 'neighbor-node · flow-dashes · twisty-tree · org-connectors'
const METERS = 'sweep-gauge · capacity-blocks · thermo-column · jitter-rpm'

export const dataSources: Record<string, string> = {
  'animated-bar-chart': barChart,
  'donut-chart-draw': donut,
  'sparkline-draw': sparkline,
  'stat-counter': statCounter,
  'speed-gauge': gauge,
  'heatmap-grid': heatmap,
  'funnel-chart': funnel,
  'table-hover': table,
  'leaderboard': leaderboard,
  'radial-progress-trio': radialTrio,
  'area-wave-chart': areaWave,
  'diff-timeline': timeline,
  'grouped-pair-bars': tag('BarSet.tsx', BARS, barSet),
  'goal-marker-bar': tag('BarSet.tsx', BARS, barSet),
  'racing-frame-bars': tag('BarSet.tsx', BARS, barSet),
  'diverging-winloss-bars': tag('BarSet.tsx', BARS, barSet),
  'slice-pull-pie': tag('PieSet.tsx', PIES, pieSet),
  'grow-arc-donut': tag('PieSet.tsx', PIES, pieSet),
  'half-donut-load': tag('PieSet.tsx', PIES, pieSet),
  'legend-sync-donut': tag('PieSet.tsx', PIES, pieSet),
  'pulsing-point-spark': tag('LineSet.tsx', LINES, lineSet),
  'compare-dashed-lines': tag('LineSet.tsx', LINES, lineSet),
  'crosshair-snap-chart': tag('LineSet.tsx', LINES, lineSet),
  'threshold-flash-chart': tag('LineSet.tsx', LINES, lineSet),
  'goal-fill-ring': tag('StatWidgets.tsx', STATS, statWidgets),
  'delta-spark-chip': tag('StatWidgets.tsx', STATS, statWidgets),
  'cap-warning-bar': tag('StatWidgets.tsx', STATS, statWidgets),
  'streak-week-dots': tag('StatWidgets.tsx', STATS, statWidgets),
  'stagger-mount-table': tag('TableBits2.tsx', TABLES, tableBits2),
  'sort-header-table': tag('TableBits2.tsx', TABLES, tableBits2),
  'select-actions-table': tag('TableBits2.tsx', TABLES, tableBits2),
  'flash-cell-table': tag('TableBits2.tsx', TABLES, tableBits2),
  'neighbor-node-graph': tag('GraphBits.tsx', GRAPHS, graphBits),
  'flow-dash-graph': tag('GraphBits.tsx', GRAPHS, graphBits),
  'twisty-tree-list': tag('GraphBits.tsx', GRAPHS, graphBits),
  'org-connector-chart': tag('GraphBits.tsx', GRAPHS, graphBits),
  'sweep-tick-gauge': tag('MeterSet.tsx', METERS, meterSet),
  'capacity-block-meter': tag('MeterSet.tsx', METERS, meterSet),
  'thermo-ruler-meter': tag('MeterSet.tsx', METERS, meterSet),
  'jitter-rpm-meter': tag('MeterSet.tsx', METERS, meterSet),
}
