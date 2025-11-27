import { Card } from "@/components/ui/card";

interface ProductCardProps {
  item: {
    name: string;
    image: string;
    similarity: number;
    price?: string;
    category?: string;
    sizes?: string;
    colors?: string;
    fabric?: string;
    cluster?: string;
  };
}

export const ProductCard = ({ item }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden border-2 border-border hover:border-primary/40 transition-all duration-300 hover:shadow-[var(--shadow-soft)] bg-card">
      <div className="aspect-square overflow-hidden bg-secondary/30">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 space-y-3">
        <h3 className="font-serif font-semibold text-lg text-card-foreground line-clamp-2">
          {item.name}
        </h3>
        
        <div className="space-y-1.5 text-sm">
          {item.sizes && (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Taglie:</span>
              <span className="font-medium text-foreground">{item.sizes}</span>
            </div>
          )}
          {item.colors && (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Colori:</span>
              <span className="font-medium text-foreground">{item.colors}</span>
            </div>
          )}
          {item.fabric && (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Tessuto:</span>
              <span className="font-medium text-foreground uppercase">{item.fabric}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          {item.price && (
            <span className="text-xl font-semibold text-primary">
              {item.price}
            </span>
          )}
          <span className="text-sm text-muted-foreground">
            {Math.round(item.similarity * 100)}% match
          </span>
        </div>
      </div>
    </Card>
  );
};
