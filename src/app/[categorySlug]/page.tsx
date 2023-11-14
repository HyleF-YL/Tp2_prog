
import { BreadCrumbs, SectionContainer } from "tp-kit/components";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { ProductList } from "../../components/product-list";
import { NextPageProps } from "../../types";
import { Metadata } from "next";
import prisma from "../../utils/prisma";
import { cache } from "react";
import { notFound, useParams } from "next/navigation";
export const getItem = cache(async (param: string) => {
  console.log("getCategory")
  const categories = await prisma.productCategory.findFirst({
    where: {
      slug: {
        equals: param
      }
    },
    include: {
      products: true,
    }
  })

  return categories
})
type Props = {
  categorySlug: string;
};

async function getCategory(param: string) {
  console.log("getCategory")
  const categories = await prisma.productCategory.findFirst({
    where: {
      slug: {
        equals: param
      }
    },
    include: {
      products: true,
    }
  })

  return categories
}

export async function generateMetadata({ params, searchParams} : NextPageProps<Props>) : Promise<Metadata> {
  const test = await getItem(params.categorySlug);
  if(!test) return {};
  return {
    title: test.name,
    description: `Trouvez votre inspiration avec un vaste choix de boissons Starbucks parmi nos produits ${test.name}`
  }
}

export default async function CategoryPage({params}: NextPageProps<Props>) {

  const category = await getItem(params.categorySlug)
  if (!category) {
    notFound();
  }
  return <SectionContainer>
    <BreadCrumbs 
      items={[
        {
          label: "Accueil",
          url: "/"
        },
        {
          label: category.name,
          url: `/${category.slug}`
        }
      ]}
    />

    <ProductList categories={[category]} />
  </SectionContainer>
}