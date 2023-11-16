"use client";
import { FC, memo, useEffect, useMemo, useState } from "react";
import { ProductFilters } from "./product-filters";
import { ProductsCategoryData } from "tp-kit/types";
import { Button, ProductCardLayout, ProductGridLayout } from "tp-kit/components";
import { ProductFiltersResult } from "../types";
import { filterProducts } from "../utils/filter-products";
import Link from "next/link";
import { addLine } from "../hooks/use-cart";
import { Circles } from "react-loader-spinner";

type Props = {
  categories: ProductsCategoryData[];
  showFilters?: boolean
};

const ProductList: FC<Props> = memo(function ({ categories, showFilters = false }) {
  const [filters, setFilters] = useState<ProductFiltersResult | undefined>();
  //const [fil, setFil] = useState<ProductFiltersResult | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const filteredCategories = useMemo(() => filterProducts(categories, filters), [filters, categories]);
  const [filCat, setFilCat] = useState<ProductsCategoryData[] | undefined>();
  useEffect(() => {
    setIsLoading(true)
    fetch(`http://localhost:3000/api/product-filters/?search=${filters?.search}&cat=${filters?.categoriesSlugs}`, {
    method: "GET"

    }).then((response) => {
        return response.json()
    }).then((datas) => {
        setFilCat(datas.categories)
        setIsLoading(false)
        
    })
  }, [filters])
  
  return (
    <div className="flex flex-row gap-8">
      {/* Filters */}
      {showFilters && <div className="w-full max-w-[270px]">
        <ProductFilters categories={categories} onChange={setFilters} />
      </div>}

      {/* Grille Produit */}
      <div className="flex-1 space-y-24">
        {isLoading ? 
        <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />: filCat?.map((cat) => (
          <section key={cat.id}>
            <h2 className="text-lg font-semibold mb-8 tracking-tight">
              <Link href={`/${cat.slug}`} className="link">{cat.name} ({cat.products.length})</Link>
            </h2>

            <ProductGridLayout products={cat.products}>
              {(product) => (
                <ProductCardLayout
                  product={product}
                  button={
                    <Button variant="ghost" className="flex-1 !py-4" onClick={() => addLine({...product})}>
                      Ajouter au panier
                    </Button>
                  }
                />
              )}
            </ProductGridLayout>
          </section>
        ))}
      </div>
    </div>
  );
});

ProductList.displayName = "ProductList";
export { ProductList };
