/* ============================================================================
   Seed data for the Meridian demo — a fictional but internally-consistent
   product-analytics SaaS. Every number ties to the story: MRR is the running
   sum of monthly movements, the revenue bridge reconciles to the latest month,
   and account rows roll up to the totals shown on Overview.
   ========================================================================== */

export interface MonthPoint {
  label: string;
  mrr: number;
  newBiz: number;
  expansion: number;
  contraction: number;
  churn: number;
}

const LABELS = [
  'Mar 25', 'Apr 25', 'May 25', 'Jun 25', 'Jul 25', 'Aug 25', 'Sep 25', 'Oct 25',
  'Nov 25', 'Dec 25', 'Jan 26', 'Feb 26', 'Mar 26', 'Apr 26', 'May 26', 'Jun 26',
  'Jul 26', 'Aug 26',
];

// [newBiz, expansion, contraction, churn] per month.
const MOVES: [number, number, number, number][] = [
  [11200, 3600, 900, 3800], [11800, 3900, 1000, 3600], [12400, 4200, 1200, 3900],
  [10900, 4600, 1500, 4400], [13200, 4800, 1300, 4100], [14100, 5200, 1600, 4700],
  [13600, 5600, 1800, 5200], [15200, 6100, 1700, 4900], [16800, 6400, 2000, 5600],
  [15400, 6900, 2200, 6100], [17900, 7300, 2100, 5800], [18600, 7800, 2400, 6400],
  [17200, 8300, 2600, 6900], [19800, 8900, 2500, 6600], [21300, 9400, 2800, 7300],
  [20100, 9900, 3100, 7800], [23200, 10600, 2900, 7400], [24600, 11200, 3300, 8100],
];

const START_MRR = 128600;

export const MONTHS: MonthPoint[] = (() => {
  let running = START_MRR;
  return LABELS.map((label, i) => {
    const [newBiz, expansion, contraction, churn] = MOVES[i];
    running += newBiz + expansion - contraction - churn;
    return { label, mrr: running, newBiz, expansion, contraction, churn };
  });
})();

const latest = MONTHS[MONTHS.length - 1];
const prev = MONTHS[MONTHS.length - 2];

// ---- Revenue bridge (reconciles prev.mrr -> latest.mrr) --------------------
export interface BridgeStep {
  label: string;
  value: number;
  kind: 'base' | 'inc' | 'dec' | 'total';
}
export const REVENUE_BRIDGE: BridgeStep[] = [
  { label: prev.label + ' MRR', value: prev.mrr, kind: 'base' },
  { label: 'New business', value: latest.newBiz, kind: 'inc' },
  { label: 'Expansion', value: latest.expansion, kind: 'inc' },
  { label: 'Contraction', value: -latest.contraction, kind: 'dec' },
  { label: 'Churn', value: -latest.churn, kind: 'dec' },
  { label: latest.label + ' MRR', value: latest.mrr, kind: 'total' },
];

// ---- Headline KPIs ---------------------------------------------------------
export interface Kpi {
  key: string;
  label: string;
  value: string;
  raw: number;
  deltaLabel: string;
  direction: 'up' | 'down';
  good: boolean; // is this movement good?
  spark: number[];
  footnote: string;
}

const mrrMoM = ((latest.mrr - prev.mrr) / prev.mrr) * 100;
const sparkMrr = MONTHS.slice(-12).map((m) => m.mrr);

export const KPIS: Kpi[] = [
  {
    key: 'mrr',
    label: 'Monthly recurring revenue',
    value: '$411.1K',
    raw: latest.mrr,
    deltaLabel: `+${mrrMoM.toFixed(1)}%`,
    direction: 'up',
    good: true,
    spark: sparkMrr,
    footnote: `${'$4.93M'} ARR`,
  },
  {
    key: 'nrr',
    label: 'Net revenue retention',
    value: '112%',
    raw: 112,
    deltaLabel: '+3 pts',
    direction: 'up',
    good: true,
    spark: [104, 105, 106, 106, 107, 108, 108, 109, 110, 110, 111, 112],
    footnote: 'trailing 12-mo, logo-weighted',
  },
  {
    key: 'accounts',
    label: 'Active accounts',
    value: '1,284',
    raw: 1284,
    deltaLabel: '+42',
    direction: 'up',
    good: true,
    spark: [1042, 1071, 1096, 1118, 1141, 1163, 1188, 1205, 1226, 1243, 1262, 1284],
    footnote: '87 on Enterprise',
  },
  {
    key: 'activation',
    label: 'Activation rate',
    value: '68.4%',
    raw: 68.4,
    deltaLabel: '+2.1 pts',
    direction: 'up',
    good: true,
    spark: [58, 59, 61, 60, 62, 63, 64, 64, 66, 66, 67, 68.4],
    footnote: 'trial → activated in 14 days',
  },
  {
    key: 'churn',
    label: 'Gross revenue churn',
    value: '2.1%',
    raw: 2.1,
    deltaLabel: '−0.3 pts',
    direction: 'down',
    good: true,
    spark: [3.1, 3.0, 2.9, 3.1, 2.8, 2.7, 2.8, 2.6, 2.5, 2.4, 2.4, 2.1],
    footnote: 'monthly, revenue-weighted',
  },
];

// ---- Retention cohorts (rows = signup month, cols = months since) ----------
export interface Cohort {
  label: string;
  size: number;
  retention: number[]; // % retained at month 0..n
}
export const COHORTS: Cohort[] = [
  { label: 'Jan 26', size: 214, retention: [100, 82, 74, 69, 66, 64, 62, 61] },
  { label: 'Feb 26', size: 231, retention: [100, 84, 76, 71, 68, 66, 64] },
  { label: 'Mar 26', size: 198, retention: [100, 83, 77, 73, 70, 68] },
  { label: 'Apr 26', size: 246, retention: [100, 86, 79, 75, 72] },
  { label: 'May 26', size: 263, retention: [100, 87, 81, 77] },
  { label: 'Jun 26', size: 258, retention: [100, 88, 82] },
  { label: 'Jul 26', size: 289, retention: [100, 90] },
  { label: 'Aug 26', size: 301, retention: [100] },
];

// ---- Activation funnel -----------------------------------------------------
export interface FunnelStep {
  label: string;
  value: number;
}
export const FUNNEL: FunnelStep[] = [
  { label: 'Signed up', value: 4820 },
  { label: 'Connected a source', value: 3910 },
  { label: 'Invited a teammate', value: 3140 },
  { label: 'Built first report', value: 2470 },
  { label: 'Activated (week 4)', value: 1980 },
];

// ---- Feature adoption ------------------------------------------------------
export interface Adoption {
  label: string;
  value: number; // % of accounts
}
export const ADOPTION: Adoption[] = [
  { label: 'Dashboards', value: 92 },
  { label: 'Saved segments', value: 74 },
  { label: 'Alerts', value: 61 },
  { label: 'API access', value: 47 },
  { label: 'Data exports', value: 38 },
  { label: 'Webhooks', value: 24 },
  { label: 'SSO / SAML', value: 18 },
];

// ---- Accounts table --------------------------------------------------------
export type Plan = 'Free' | 'Team' | 'Business' | 'Enterprise';
export type Health = 'Thriving' | 'Steady' | 'Watch' | 'At risk';

export interface Account {
  name: string;
  domain: string;
  plan: Plan;
  mrr: number;
  seats: number;
  score: number; // 0..100
  health: Health;
  lastActive: string;
  trend: number[]; // 12-pt weekly usage index
}

const t = (...v: number[]) => v;
export const ACCOUNTS: Account[] = [
  { name: 'Kestrel Robotics', domain: 'kestrel.io', plan: 'Enterprise', mrr: 8400, seats: 148, score: 94, health: 'Thriving', lastActive: '2m ago', trend: t(52,55,58,57,61,64,63,68,72,74,79,86) },
  { name: 'Northwind Labs', domain: 'northwind.dev', plan: 'Business', mrr: 3120, seats: 62, score: 88, health: 'Thriving', lastActive: '11m ago', trend: t(41,44,43,47,49,48,52,55,54,58,61,64) },
  { name: 'Lumen Health', domain: 'lumenhealth.com', plan: 'Enterprise', mrr: 9650, seats: 210, score: 91, health: 'Thriving', lastActive: '24m ago', trend: t(60,62,61,65,66,69,71,70,74,77,80,83) },
  { name: 'Foldspace', domain: 'foldspace.app', plan: 'Team', mrr: 490, seats: 9, score: 72, health: 'Steady', lastActive: '1h ago', trend: t(18,22,25,24,28,27,31,30,34,33,37,39) },
  { name: 'Tanager Studios', domain: 'tanager.studio', plan: 'Business', mrr: 2760, seats: 44, score: 79, health: 'Steady', lastActive: '2h ago', trend: t(38,37,40,42,41,44,43,46,45,44,47,48) },
  { name: 'Basalt Security', domain: 'basalt.sh', plan: 'Business', mrr: 3980, seats: 71, score: 41, health: 'At risk', lastActive: '3d ago', trend: t(66,64,60,58,55,51,48,44,40,37,33,29) },
  { name: 'Marigold Retail', domain: 'marigold.co', plan: 'Team', mrr: 640, seats: 14, score: 68, health: 'Steady', lastActive: '5h ago', trend: t(24,26,25,28,27,29,31,30,32,31,34,35) },
  { name: 'Verdana Logistics', domain: 'verdana.io', plan: 'Enterprise', mrr: 7200, seats: 132, score: 85, health: 'Thriving', lastActive: '38m ago', trend: t(48,51,53,52,56,58,57,61,63,66,68,71) },
  { name: 'Halcyon AI', domain: 'halcyon.ai', plan: 'Business', mrr: 3450, seats: 58, score: 57, health: 'Watch', lastActive: '2d ago', trend: t(54,53,51,52,49,50,47,48,45,46,43,44) },
  { name: 'Cobalt Systems', domain: 'cobaltsys.com', plan: 'Team', mrr: 720, seats: 16, score: 74, health: 'Steady', lastActive: '4h ago', trend: t(28,30,29,32,34,33,36,35,38,40,39,42) },
  { name: 'Petrichor Media', domain: 'petrichor.fm', plan: 'Free', mrr: 0, seats: 4, score: 33, health: 'At risk', lastActive: '9d ago', trend: t(22,20,19,17,16,14,13,11,10,8,7,6) },
  { name: 'Ironwood Bank', domain: 'ironwood.bank', plan: 'Enterprise', mrr: 11200, seats: 264, score: 96, health: 'Thriving', lastActive: '6m ago', trend: t(70,72,74,73,77,79,81,84,86,88,91,95) },
  { name: 'Sundial Energy', domain: 'sundial.energy', plan: 'Business', mrr: 2980, seats: 49, score: 63, health: 'Watch', lastActive: '1d ago', trend: t(44,45,43,46,44,45,42,43,41,42,40,41) },
  { name: 'Quill & Co.', domain: 'quill.co', plan: 'Team', mrr: 560, seats: 11, score: 70, health: 'Steady', lastActive: '7h ago', trend: t(20,23,22,25,27,26,29,28,31,30,33,34) },
];

// ---- Activity feed ---------------------------------------------------------
export type EventKind = 'expansion' | 'signup' | 'alert' | 'churn' | 'milestone';
export interface Activity {
  kind: EventKind;
  text: string;
  meta: string;
  time: string;
}
export const ACTIVITY: Activity[] = [
  { kind: 'expansion', text: 'Kestrel Robotics upgraded to Enterprise', meta: '+$1,240 MRR', time: '2m' },
  { kind: 'signup', text: 'Foldspace started a Team trial', meta: '9 seats', time: '18m' },
  { kind: 'alert', text: 'Basalt Security health dropped to 41', meta: 'usage −56% / 30d', time: '1h' },
  { kind: 'milestone', text: 'Northwind Labs shipped their 100th report', meta: 'power user', time: '5h' },
  { kind: 'churn', text: 'Petrichor Media downgraded to Free', meta: '−$490 MRR', time: '9h' },
  { kind: 'expansion', text: 'Lumen Health added 12 seats', meta: '+$720 MRR', time: '1d' },
];

// ---- Small platform stats --------------------------------------------------
export const PLATFORM = {
  eventsIngested: '2.41B',
  eventsDelta: '+8.2%',
  apiP95: '142ms',
  apiP95Delta: '−11ms',
  uptime: '99.98%',
  dataSources: 3910,
};
