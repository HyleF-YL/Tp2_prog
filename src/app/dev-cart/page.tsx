"use client";
console.log("rendu page");
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { Button, Card, ProductCardLayout, ProductCartLine, SectionContainer } from "tp-kit/components";

import { addLine, clearCart, computeCartTotal, computeLineSubTotal, removeLine, updateLine } from "../../hooks/use-cart";
import { ProductLineData } from "../../types";
import { useStore } from "../../hooks/use-cart";
import { useEffect, useState } from "react";
import Cart from "../../components/Cart";
import CartCounter from "../../components/CartCounter";
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
            button={<Button variant={"ghost"} onClick={() => addLine({...product})} fullWidth>Ajouter au panier</Button>}
          />
        ))}
      </section>
      
      {/* /Produits */}

      {/* Panier */}
      <CartCounter/>
      <Cart/>
      {/* /Panier */}
    </SectionContainer>
  );
}