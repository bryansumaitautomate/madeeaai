import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CategoryTabsProps {
  categories: Map<string, number>;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  totalCount: number;
  isLoading?: boolean;
}

const CategoryTabs = ({
  categories,
  activeCategory,
  onCategoryChange,
  totalCount,
  isLoading
}: CategoryTabsProps) => {
  if (isLoading) {
    return (
      <div className="w-full lg:w-64 shrink-0">
        <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-primary" />
          <span className="font-mono uppercase tracking-widest text-xs text-foreground">Categories</span>
        </div>
        <div className="space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-8 bg-muted animate-pulse rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-64 shrink-0">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-primary" />
        <span className="font-mono uppercase tracking-widest text-xs text-foreground">Categories</span>
      </div>

      <ScrollArea className="h-[500px] lg:h-[600px] pr-4">
        <RadioGroup
          value={activeCategory}
          onValueChange={onCategoryChange}
          className="space-y-1"
        >
          <Label
            htmlFor="category-all"
            className="flex items-center justify-between py-2 px-1 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="all" id="category-all" className="border-primary" />
              <span className="text-sm font-syne font-medium">All Workflows</span>
            </div>
            <span className="text-sm text-muted-foreground">{totalCount}</span>
          </Label>

          {Array.from(categories.entries()).map(([category, count]) => (
            <Label
              key={category}
              htmlFor={`category-${category}`}
              className="flex items-center justify-between py-2 px-1 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem
                  value={category}
                  id={`category-${category}`}
                  className="border-primary"
                />
                <span className="text-sm font-syne font-medium">{category}</span>
              </div>
              <span className="text-sm text-muted-foreground">{count}</span>
            </Label>
          ))}
        </RadioGroup>
      </ScrollArea>
    </div>
  );
};

export default CategoryTabs;
