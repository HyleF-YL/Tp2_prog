import { BreadCrumbs, SectionContainer } from "tp-kit/components";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { ProductList } from "../components/product-list";
import { Metadata } from "next";
import prisma from "../utils/prisma";

async function listProducts(){
  const categories = await prisma.productCategory.findMany({
    include: {
      products: true,
    }
  })

  return categories
}

export const metadata:Metadata = {
  title: `Page d’accueil - Starbucks`,
  description: "Commandez de délicieuses boissons préparées avec soin par nos baristas"
}

export default async function Home() {
  const categories = await listProducts()
  return (<SectionContainer>
    <BreadCrumbs items={[
      {
        label: "Accueil",
        url: "/"
      }
    ]} />

    <ProductList categories={categories} showFilters />
  </SectionContainer>);
}
