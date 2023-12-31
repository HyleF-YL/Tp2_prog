import {
  BreadCrumbs,
  Button,
  FormattedPrice,
  ProductCardLayout,
  ProductGridLayout,
  ProductRating,
  ProductImage,
  SectionContainer,
} from "tp-kit/components";
import { NextPageProps } from "../../../types";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { Metadata } from "next";
import {
  ProductAttribute,
  ProductAttributesTable,
} from "../../../components/product-attributes-table";
import { cache } from "react";
import prisma from "../../../utils/prisma";
import { notFound } from "next/navigation";
import { getCategory } from "../page";

export const getItem = cache(async (param: Props) => {
  console.log("getCategory")
  const product = await prisma.product.findFirst({
    where: {
      slug: {
        equals: param.productSlug
      }
    }
  })
  const category = await prisma.productCategory.findFirst({
    where: {
      slug: {
        equals: param.categorySlug
      }
    },
    include: {
      products: {
        where : {
          NOT: {
            id: {
              equals: product?.id
            }
          }
        }
      }
    }
  })
  return {product,category}
})

type Props = {
  categorySlug: string;
  productSlug: string;
};

export async function generateMetadata({
  params,
  searchParams,
}: NextPageProps<Props>): Promise<Metadata> {
  const results = await getItem(params)
  if(!results.product || results.category) return {}
  return {
    title: results.product.name,
    description:
      results.product.desc ??
      `Succombez pour notre ${results.product.name} et commandez-le sur notre site !`,
  };
}

const productAttributes: ProductAttribute[] = [
  { label: "Intensité", rating: 3 },
  { label: "Volupté", rating: 2 },
  { label: "Amertume", rating: 1 },
  { label: "Onctuosité", rating: 4 },
  { label: "Instagramabilité", rating: 5 },
];

export default async function ProductPage({ params }: NextPageProps<Props>) {
  const currentProduct = await getItem(params)
  if(!currentProduct.product || !currentProduct.category)
    notFound()
  
  return (
    <SectionContainer wrapperClassName="max-w-5xl">
      <BreadCrumbs
        className="my-8"
        items={[
          {
            label: "Accueil",
            url: "/",
          },
          {
            label: currentProduct.category.name,
            url: `/${currentProduct.category.slug}`,
          },
          {
            label: currentProduct.product.name,
            url: `/${currentProduct.product.path}`,
          },
        ]}
      />

      {/* Produit */}
      <section className="flex flex-col md:flex-row justify-center gap-8">
        {/* Product Image */}
        <div className="relative">
          <ProductImage
            {...currentProduct.product}
            priority
            className="rounded-lg sticky top-12 object-cover sm:aspect-video md:aspect-auto w-full md:w-[300px]"
          />
        </div>

        {/* Product body */}
        <div className="flex-1">
          <div className="prose prose-lg">
            {/* Product Name */}
            <h1>{currentProduct.product.name}</h1>

            {/* Product Rating */}
            <ProductRating value={4} size={18} />

            {/* Desc */}
            <p>{currentProduct.product.desc}</p>

            {/* Prix et ajout au panier */}
            <div className="flex justify-between items-center gap-8">
              <p className="!my-0 text-xl">
                <FormattedPrice price={currentProduct.product.price} />
              </p>
              <Button variant={"primary"}>Ajouter au panier</Button>
            </div>
          </div>

          {/* Products attribute */}
          <ProductAttributesTable className="mt-6" data={productAttributes} />
        </div>
      </section>

      {/* Related products */}
      <section>
        <div className="mt-24">
          <div className="prose prose-lg mb-8">
            <h2>Vous aimerez aussi</h2>
          </div>

          <ProductGridLayout products={currentProduct.category.products}>
            {(product) => (
              <ProductCardLayout
                product={product}
                button={
                  <Button variant="ghost" className="flex-1 !py-4">
                    Ajouter au panier
                  </Button>
                }
              />
            )}
          </ProductGridLayout>
        </div>
      </section>
      {/* /Related products */}
    </SectionContainer>
  );
}
