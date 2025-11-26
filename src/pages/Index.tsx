import { ImageUploader } from "@/components/ImageUploader";
import { Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">AI-Powered Visual Search</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-serif font-bold text-foreground tracking-tight">
            Oniverse Search
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Upload or capture an image to discover similar items from our collection.
            Refine your search with natural language.
          </p>
        </div>

        <ImageUploader />

        <div className="mt-24 text-center">
          <p className="text-sm text-muted-foreground">
            Powered by advanced AI image recognition
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
