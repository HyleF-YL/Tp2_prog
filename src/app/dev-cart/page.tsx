"use client";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { Button, Card, ProductCardLayout, ProductCartLine, SectionContainer } from "tp-kit/components";
const products = PRODUCTS_CATEGORY_DATA[0].products.slice(0, 3);

export default function DevCartPage() {
    
  return (
    <SectionContainer
      className="py-36"
      wrapperClassName="flex flex-col lg:flex-row gap-24"
    >
      {/* Produits */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
        {products.map((product) => (
          <ProductCardLayout
            key={product.id}
            product={product}
            button={<Button variant={"ghost"} fullWidth>Ajouter au panier</Button>}
          />
        ))}
      </section>
      {/* /Produits */}
      
      {/* Panier */}
      <section className="w-full lg:w-1/3 space-y-8">
                <Card className="flex flex-col justify-around">
                    <h2>Mon panier</h2>
                    <ProductCartLine 
                        onDelete={function noRefCheck(){}}
                        onQtyChange={function noRefCheck(){}} 
                        product={products[2]} qty={1}/>
                
                    <ProductCartLine 
                        onDelete={function noRefCheck(){}}
                        onQtyChange={function noRefCheck(){}} 
                        product={products[1]} qty={2}/>
                    
                    <div className="flex flex-row justify-between">
                        <h3>Total</h3>
                        <h3>{products[1]['price'] + products[2]['price'] + " €"}</h3>
                    </div>

                    <Button fullWidth>Commander</Button>
                </Card>
				<Button variant={"outline"} fullWidth>Vider le panier</Button>
			</section>
      {/* /Panier */}
    </SectionContainer>
  );
}