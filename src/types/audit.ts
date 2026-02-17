export interface CompanyInfo {
  companyName: string;
  industry: string;
  employeeCount: string;
  techStack: string;
  referralSource: string;
  referralSourceCustom?: string;
}

export interface GoalsReadiness {
  incomeGoal90Days: string;
  incomeGoal90DaysCustom?: string;
  averageEmployeeHourlyRate: string;
  previousAIInvestment: string;
  whyImplementAI: string;
  expectedChanges: string;
  currentMonthlyRevenue: string;
  currentMonthlyRevenueCustom?: string;
  biggestCostDriver: string;
  biggestCostDriverCustom?: string;
}

export interface Process {
  id: string;
  processName: string;
  hoursPerWeek: number;
  peopleInvolved: number;
  painPoints: string;
}

export interface Department {
  id: string;
  name: string;
  processes: Process[];
}

export interface AuditData {
  companyInfo: CompanyInfo;
  goalsReadiness: GoalsReadiness;
  departments: Department[];
}

export interface DashboardData {
  revenue: string;
  roi: string;
  hours_saved: string;
  potential_pct: string;
  industry_rate?: string;
}

export interface QuickWin {
  title: string;
  desc: string;
  estimated_savings?: string;
  implementation_time?: string;
}

export interface LongTermStrategy {
  quarter?: string;
  title: string;
  desc: string;
  focus_areas?: string[];
  expected_outcome?: string;
}

export interface FullTableRow {
  process: string;
  department?: string;
  hrs_week: number;
  hourly_rate?: string;
  annual_cost: string;
  savings: string;
  roi_score: string;
}

export interface CostDriverAnalysis {
  identified_driver: string;
  current_impact: string;
  optimization_potential: string;
  recommended_actions: string[];
}

export interface ComputationBreakdown {
  hourly_rate_used: string;
  hourly_rate_source: string;
  total_weekly_hours: number;
  total_annual_hours: number;
  total_annual_labor_cost: string;
  automation_efficiency: string;
  projected_hours_saved: number;
  projected_cost_savings: string;
  roi_calculation: string;
  roi_ceiling_applied: string;
}

export interface AIAnalysisResponse {
  dashboard: DashboardData;
  quick_wins: QuickWin[];
  long_term_strategy: LongTermStrategy[];
  full_table: FullTableRow[];
  cost_driver_analysis?: CostDriverAnalysis;
  computation_breakdown?: ComputationBreakdown;
}

export interface AuditResults {
  projectedAnnualSavings: number;
  roiMultiplier: number;
  hoursSavedPerWeek: number;
  totalHoursPerWeek: number;
  quickWins: LegacyQuickWin[];
}

export interface LegacyQuickWin {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
}
