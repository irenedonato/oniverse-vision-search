import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload, X, Loader2, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = async () => {
    if (!selectedImage) return;

    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke("visual-search", {
        body: { image: selectedImage },
      });

      if (error) throw error;

      navigate("/results", {
        state: {
          results: data.results,
          imageUrl: selectedImage,
        },
      });
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search failed",
        description: "Unable to process image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!selectedImage ? (
        <div className="space-y-6">
          <div className="border-2 border-dashed border-border rounded-3xl p-12 text-center hover:border-primary/40 transition-all duration-300 bg-card/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-6">
              <div className="p-6 rounded-full bg-primary/10">
                <Upload className="h-12 w-12 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-semibold mb-2">
                  Upload an Image
                </h3>
                <p className="text-muted-foreground">
                  Find similar items in our catalog
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => fileInputRef.current?.click()}
              size="lg"
              className="h-16 rounded-xl text-lg bg-primary hover:bg-primary/90 transition-all hover:shadow-[var(--shadow-soft)]"
            >
              <Upload className="mr-3 h-6 w-6" />
              Choose File
            </Button>
            <Button
              onClick={() => cameraInputRef.current?.click()}
              size="lg"
              variant="outline"
              className="h-16 rounded-xl text-lg border-2 hover:bg-primary/5 hover:border-primary/40 transition-all"
            >
              <Camera className="mr-3 h-6 w-6" />
              Take Photo
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="relative rounded-3xl overflow-hidden border-2 border-border shadow-[var(--shadow-elevated)] bg-card">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full max-h-96 object-contain"
            />
            <Button
              onClick={clearImage}
              size="icon"
              variant="destructive"
              className="absolute top-4 right-4 rounded-full shadow-lg"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <Button
            onClick={handleSearch}
            disabled={isProcessing}
            size="lg"
            className="w-full h-16 rounded-xl text-lg bg-primary hover:bg-primary/90 transition-all hover:shadow-[var(--shadow-soft)]"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-3 h-6 w-6" />
                Find Similar Items
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
