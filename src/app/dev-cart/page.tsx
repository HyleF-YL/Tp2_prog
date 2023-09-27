"use client";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { Button, Card, ProductCardLayout, ProductCartLine, SectionContainer } from "tp-kit/components";

import { addLine, clearCart, computeCartTotal, computeLineSubTotal, removeLine, updateLine } from "../../hooks/use-cart";
import { ProductLineData } from "../../types";
import { useStore } from "../../hooks/use-cart";
import { useEffect, useState } from "react";
const products = PRODUCTS_CATEGORY_DATA[0].products.slice(0, 3);

export default function DevCartPage() {
  const lines = useStore((state) => state.lines)
  const [totalCart,setTotalCart] = useState(computeCartTotal(lines))

  useEffect(() => {
    setTotalCart(computeCartTotal(lines))
  }, [lines])
  
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
            button={<Button variant={"ghost"} onClick={() => addLine({...product})} fullWidth>Ajouter au panier</Button>}
          />
        ))}
      </section>
      
      {/* /Produits */}

      {/* Panier */}
      <section className="w-full lg:w-1/3 space-y-8">
                <Card className="flex flex-col justify-around">
                    <h2>Mon panier</h2>
                    {
                      lines.map((line) => {
                        return <ProductCartLine key={line['product']['id']} 
                        onDelete={() => removeLine(line['product']['id'])}
                        onQtyChange={(value: number) => {
                          
                          let oldQty = line['qty']
                          line['qty'] = value
                          if(oldQty < value)
                            line['product']['price'] = computeLineSubTotal(line) - (line['product']['price'] * oldQty)
                          else if(oldQty > value)
                            line['product']['price'] = (line['product']['price'] * oldQty) - computeLineSubTotal(line)

                          updateLine(line)
                        }} 
                        product={line['product']} qty={line['qty']}/>
                      })
                    }
                    <div className="flex flex-row justify-between">
                        <h3>Total</h3>
                        <h3>{totalCart + " €"}</h3>
                    </div>

                    <Button fullWidth>Commander</Button>
                </Card>
				<Button variant={"outline"} onClick={() => clearCart()} fullWidth>Vider le panier</Button>
			</section>
      {/* /Panier */}
    </SectionContainer>
  );
}