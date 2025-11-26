import { ImageUploader } from "@/components/ImageUploader";
import { Sparkles, Search } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      {/* --- HEADER START --- */}
      <header className="relative flex items-center justify-center py-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <img 
          src="/logos/oniverse-logo.png" 
          alt="Oniverse" 
          className="relative h-28 md:h-40 w-auto object-contain animate-fade-in" 
          style={{ filter: 'drop-shadow(0 10px 30px hsl(var(--primary) / 0.15))' }}
        />
      </header>
      {/* --- HEADER END --- */}
      
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-16 space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 via-primary/15 to-primary/10 text-primary border border-primary/20 shadow-sm">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span className="text-sm font-semibold tracking-wide">AI-Powered Visual Search</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground tracking-tight leading-tight">
            Discover with
            <span className="block bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent mt-2">
              Visual Intelligence
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Upload or capture an image to find similar items instantly. Refine your results with natural language descriptions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <ImageUploader />
        </div>

        <div className="mt-32 text-center space-y-4 opacity-60 hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Search className="h-4 w-4" />
            <span>Powered by advanced AI image recognition</span>
          </div>
        </div>
      </main>

      {/* --- FOOTER START --- */}
      <footer className="relative mt-20 border-t border-border/50 bg-gradient-to-t from-secondary/20 to-transparent backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
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