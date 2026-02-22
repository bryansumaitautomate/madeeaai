import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import AutomationHero from "@/components/ai-hub/AutomationHero";
import CategoryTabs from "@/components/ai-hub/CategoryTabs";
import AutomationCard from "@/components/ai-hub/AutomationCard";
import AutomationModal from "@/components/ai-hub/AutomationModal";
import { fetchWorkflows, extractAllCategories, type Automation } from "@/lib/api/workflows";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const AIHub = () => {
  useEffect(() => {
    document.title = "AI Hub – Automation Library | Madeea";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "Discover powerful AI-powered automations for every department. Find the perfect workflow to save time and boost productivity.");
    }
    return () => { document.title = "Madeea – AI Sales Infrastructure"; };
  }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedAutomation, setSelectedAutomation] = useState<Automation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: workflows = [], isLoading, error, refetch } = useQuery({
    queryKey: ["workflows"],
    queryFn: fetchWorkflows,
    staleTime: 5 * 60 * 1000,
  });

  const categories = useMemo(() => extractAllCategories(workflows), [workflows]);

  const filteredAutomations = useMemo(() => {
    return workflows.filter((automation) => {
      const matchesCategory = activeCategory === "all" || automation.categories.includes(activeCategory);
      const matchesSearch =
        automation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        automation.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        automation.tools.some(tool => tool.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, workflows]);

  const handleAutomationClick = (automation: Automation) => {
    setSelectedAutomation(automation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedAutomation(null), 200);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-[72px]">
        <AutomationHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <main className="container mx-auto px-4 py-12 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8">
            <CategoryTabs
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              totalCount={workflows.length}
              isLoading={isLoading}
            />

            <div className="flex-1">
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-mono font-semibold text-foreground">{filteredAutomations.length}</span> workflows
                  {activeCategory !== "all" && (
                    <span> in <span className="font-semibold text-primary">{activeCategory}</span></span>
                  )}
                </p>
              </div>

              {error ? (
                <div className="text-center py-16">
                  <p className="text-destructive text-lg mb-4">Failed to load workflows</p>
                  <p className="text-muted-foreground mb-6">{(error as Error).message}</p>
                  <Button onClick={() => refetch()} variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                </div>
              ) : isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="bg-card border border-border rounded-2xl p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <Skeleton className="w-12 h-12 rounded-xl" />
                        <Skeleton className="h-6 w-3/4" />
                      </div>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-5/6 mb-2" />
                      <Skeleton className="h-4 w-2/3 mb-5" />
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredAutomations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredAutomations.map((automation, index) => (
                    <div key={automation.id} style={{ animationDelay: `${Math.min(index * 0.02, 0.5)}s` }}>
                      <AutomationCard
                        automation={automation}
                        onClick={handleAutomationClick}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">No workflows found matching your criteria.</p>
                  <p className="text-muted-foreground mt-2">Try adjusting your search or selecting a different category.</p>
                </div>
              )}
            </div>
          </div>
        </main>

        <AutomationModal
          automation={selectedAutomation}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />

        <footer className="border-t border-border py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground text-sm">
              Discover the perfect automation for your team. Click any card to learn more.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AIHub;
