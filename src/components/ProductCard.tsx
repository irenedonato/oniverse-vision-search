import { Card } from "@/components/ui/card";

interface ProductCardProps {
  item: {
    name: string;
    image: string;
    similarity: number;
    price?: string;
    category?: string;
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
      <div className="p-4 space-y-2">
        <h3 className="font-serif font-semibold text-lg text-card-foreground line-clamp-2">
          {item.name}
        </h3>
        {item.category && (
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            {item.category}
          </p>
        )}
        <div className="flex items-center justify-between pt-2">
          {item.price && (
            <span className="text-lg font-semibold text-primary">
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
