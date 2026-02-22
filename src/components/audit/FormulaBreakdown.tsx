import { useState } from "react";
import { Calculator, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { FullTableRow, ComputationBreakdown } from "@/types/audit";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

interface FormulaBreakdownProps {
  computationBreakdown?: ComputationBreakdown;
  fullTable: FullTableRow[];
}

const FormulaBreakdown = ({ computationBreakdown, fullTable }: FormulaBreakdownProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-4 rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-blue-400" />
          <span className="text-white/60 text-xs font-medium tracking-wide uppercase">
            How this was calculated
          </span>
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-white/40 transition-transform",
            isExpanded && "rotate-180"
          )}
        />
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 animate-fade-in">
          {/* Core Formula */}
          <div className="p-3 rounded-lg bg-white/[0.03] border border-blue-500/10">
            <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1.5">
              Core Formula (per process)
            </p>
            <p className="text-white/90 text-sm font-mono">
              (Hours/wk × People × Adjusted Rate × 52 weeks) × Efficiency %
            </p>
          </div>

          {/* Efficiency Tiers & Dept Multipliers side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-white/[0.03]">
              <p className="text-white/40 text-[10px] uppercase tracking-wider mb-2">
                Efficiency Tiers
              </p>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/60">High (data entry, scheduling…)</span>
                  <span className="text-blue-400 font-medium">55–65%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Medium (follow-up, tracking…)</span>
                  <span className="text-blue-400 font-medium">40–50%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Low (strategy, creative…)</span>
                  <span className="text-blue-400 font-medium">20–30%</span>
                </div>
                <div className="flex justify-between border-t border-white/[0.06] pt-1.5">
                  <span className="text-white/60">Default</span>
                  <span className="text-white/50 font-medium">40%</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white/[0.03]">
              <p className="text-white/40 text-[10px] uppercase tracking-wider mb-2">
                Department Multipliers
              </p>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/60">Executive / Strategy</span>
                  <span className="text-blue-400 font-medium">1.5×</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Sales / Marketing / Finance</span>
                  <span className="text-blue-400 font-medium">1.2×</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Operations / Admin / Support</span>
                  <span className="text-blue-400 font-medium">0.8×</span>
                </div>
                <div className="flex justify-between border-t border-white/[0.06] pt-1.5">
                  <span className="text-white/60">Other</span>
                  <span className="text-white/50 font-medium">1.0×</span>
                </div>
              </div>
            </div>
          </div>

          {/* Per-Process Table */}
          {fullTable.length > 0 && (
            <div className="rounded-lg overflow-hidden border border-white/[0.06]">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/[0.06] hover:bg-transparent">
                    <TableHead className="text-white/40 text-[10px] uppercase tracking-wider h-8">Process</TableHead>
                    <TableHead className="text-white/40 text-[10px] uppercase tracking-wider h-8 hidden sm:table-cell">Dept</TableHead>
                    <TableHead className="text-white/40 text-[10px] uppercase tracking-wider h-8 text-right">Hrs/wk</TableHead>
                    <TableHead className="text-white/40 text-[10px] uppercase tracking-wider h-8 text-right hidden sm:table-cell">Rate</TableHead>
                    <TableHead className="text-white/40 text-[10px] uppercase tracking-wider h-8 text-right">Savings</TableHead>
                    <TableHead className="text-white/40 text-[10px] uppercase tracking-wider h-8 text-right">ROI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fullTable.map((row, i) => (
                    <TableRow key={i} className="border-white/[0.04] hover:bg-white/[0.02]">
                      <TableCell className="text-white/80 text-xs py-2 px-4">{row.process}</TableCell>
                      <TableCell className="text-white/50 text-xs py-2 px-4 hidden sm:table-cell">{row.department || "—"}</TableCell>
                      <TableCell className="text-white/70 text-xs py-2 px-4 text-right">{row.hrs_week}</TableCell>
                      <TableCell className="text-white/70 text-xs py-2 px-4 text-right hidden sm:table-cell">{row.hourly_rate || "—"}</TableCell>
                      <TableCell className="text-blue-400 text-xs py-2 px-4 text-right font-medium">{row.savings}</TableCell>
                      <TableCell className="text-white/60 text-xs py-2 px-4 text-right">{row.roi_score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Totals from computation breakdown */}
          {computationBreakdown && (
            <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/15">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-wider mb-0.5">Rate Used</p>
                  <p className="text-white font-medium">{computationBreakdown.hourly_rate_used}</p>
                  <p className="text-white/30 text-[10px]">{computationBreakdown.hourly_rate_source}</p>
                </div>
                <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-wider mb-0.5">Annual Cost</p>
                  <p className="text-white font-medium">{computationBreakdown.total_annual_labor_cost}</p>
                </div>
                <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-wider mb-0.5">Efficiency</p>
                  <p className="text-white font-medium">{computationBreakdown.automation_efficiency}</p>
                </div>
                <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-wider mb-0.5">ROI Cap</p>
                  <p className="text-white font-medium">{computationBreakdown.roi_ceiling_applied}</p>
                </div>
              </div>
              <p className="text-white/50 text-[11px] mt-3 leading-relaxed">{computationBreakdown.roi_calculation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FormulaBreakdown;
