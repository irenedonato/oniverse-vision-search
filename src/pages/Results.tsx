import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, imageUrl } = location.state || {};
  const [refinementText, setRefinementText] = useState("");
  const [isRefining, setIsRefining] = useState(false);

  if (!results || !imageUrl) {
    navigate("/");
    return null;
  }

  const handleRefine = async () => {
    if (!refinementText.trim()) return;
    setIsRefining(true);
    // TODO: Implement text-based refinement
    setTimeout(() => setIsRefining(false), 1000);
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
              placeholder="Refine by fabric, color, or style..."
              value={refinementText}
              onChange={(e) => setRefinementText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleRefine()}
              className="flex-1 h-12 rounded-xl border-2 focus-visible:ring-primary"
            />
            <Button
              onClick={handleRefine}
              disabled={isRefining || !refinementText.trim()}
              className="h-12 px-6 rounded-xl bg-primary hover:bg-primary/90 transition-all"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {results.map((item: any, index: number) => (
            <ProductCard key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
