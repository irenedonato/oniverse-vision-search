import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results: initialResults, imageUrl } = location.state || {};
  const [results, setResults] = useState(initialResults || []);
  const [refinementText, setRefinementText] = useState("");
  const [isRefining, setIsRefining] = useState(false);

  if (!results.length || !imageUrl) {
    navigate("/");
    return null;
  }

  const handleRefine = async () => {
    if (!refinementText.trim()) {
      toast.error("Please enter refinement criteria");
      return;
    }

    setIsRefining(true);
    try {
      const { data, error } = await supabase.functions.invoke("visual-search", {
        body: { image: imageUrl, refinement: refinementText },
      });

      if (error) throw error;

      if (data?.results) {
        setResults(data.results);
        toast.success("Search refined successfully");
      }
    } catch (error) {
      console.error("Error refining search:", error);
      toast.error("Failed to refine search");
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 hover:bg-primary/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          New Search
        </Button>

        <div className="mb-8">
          <h1 className="text-5xl font-serif font-bold mb-4 text-foreground">
            Similar Items
          </h1>
          <p className="text-muted-foreground text-lg">
            Based on your uploaded image
          </p>
        </div>

        <div className="mb-8 flex items-center justify-center">
          <img
            src={imageUrl}
            alt="Search query"
            className="max-h-48 rounded-2xl shadow-lg border-2 border-border object-contain"
          />
        </div>

        <div className="mb-8">
          <div className="flex gap-2 max-w-2xl mx-auto">
            <Input
              placeholder="e.g., cotton fabric, red color, vintage style..."
              value={refinementText}
              onChange={(e) => setRefinementText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isRefining && handleRefine()}
              className="flex-1 h-12 rounded-xl border-2 focus-visible:ring-primary"
              disabled={isRefining}
            />
            <Button
              onClick={handleRefine}
              disabled={isRefining || !refinementText.trim()}
              className="h-12 px-6 rounded-xl bg-primary hover:bg-primary/90 transition-all gap-2"
            >
              <Sparkles className="h-5 w-5" />
              {isRefining ? "Refining..." : "Refine"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {results.map((item: any, index: number) => (
            <ProductCard key={index} item={item} />
          ))}
        </div>
      </div>

      {/* --- FOOTER START --- */}
      <footer className="relative mt-16 border-t border-border/50 bg-gradient-to-t from-secondary/20 to-transparent backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          {/* Loghi Oniverse e Atelier */}
          <div className="flex items-center justify-center gap-8 md:gap-12 mb-6 animate-fade-in">
            <img 
              src="/logos/oniverse-logo.png" 
              alt="Oniverse" 
              className="h-16 md:h-20 w-auto object-contain transition-transform duration-500 hover:scale-105" 
              style={{ filter: 'drop-shadow(0 10px 30px hsl(var(--primary) / 0.2))' }}
            />
            <div className="h-12 md:h-16 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
            <img 
              src="/logos/atelier-logo.png" 
              alt="Atelier" 
              className="h-16 md:h-20 w-auto object-contain transition-transform duration-500 hover:scale-105" 
              style={{ filter: 'drop-shadow(0 10px 30px hsl(var(--accent) / 0.2))' }}
            />
          </div>
          
          {/* Powered by Agile Lab */}
          <div className="flex items-center justify-center gap-3">
            <span className="text-sm text-muted-foreground font-medium">Powered by</span>
            <img 
              src="/logos/agilelab_logo.png" 
              alt="Agile Lab" 
              className="h-10 w-auto object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </footer>
      {/* --- FOOTER END --- */}
    </div>
  );
};

export default Results;
