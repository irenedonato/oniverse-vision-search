import { ImageUploader } from "@/components/ImageUploader";
import { Sparkles, Search } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-16 space-y-8 animate-fade-in">
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground tracking-tight leading-[1.1]">
            Product Retriever
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
            Upload or capture an image to find similar items instantly.<br />
            <span className="text-primary/80 font-medium">Refine your results with natural language descriptions.</span>
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <ImageUploader />
        </div>

        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/15 via-accent/10 to-primary/15 text-primary border border-primary/30 shadow-lg backdrop-blur-sm">
            <Sparkles className="h-5 w-5 animate-pulse" />
            <span className="text-sm font-bold tracking-wider uppercase">AI-Powered Visual Search</span>
          </div>
        </div>
      </main>

      {/* --- FOOTER START --- */}
      <footer className="relative mt-8 border-t border-border/50 bg-gradient-to-t from-secondary/20 to-transparent backdrop-blur-sm">
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

export default Index;