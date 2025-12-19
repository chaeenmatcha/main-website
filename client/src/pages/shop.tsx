import { Layout } from "@/components/layout/layout";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/ui/product-card";

export default function Shop() {
  return (
    <Layout>
      <section className="bg-secondary/20 pt-24 pb-12">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium mb-4">Shop Matcha</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our premium selection of ceremonial grade matcha and accessories.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
