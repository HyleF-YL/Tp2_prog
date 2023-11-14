
import { BreadCrumbs, SectionContainer } from "tp-kit/components";
import { ProductList } from "../../components/product-list";
import { NextPageProps } from "../../types";
import { Metadata } from "next";
import prisma from "../../utils/prisma";
import { cache } from "react";
import { notFound, useParams } from "next/navigation";
export const getCategory = cache(async (param: string) => {
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

export async function generateMetadata({ params, searchParams} : NextPageProps<Props>) : Promise<Metadata> {
  const test = await getCategory(params.categorySlug);
  if(!test) return {};
  return {
    title: test.name,
    description: `Trouvez votre inspiration avec un vaste choix de boissons Starbucks parmi nos produits ${test.name}`
  }
}

export default async function CategoryPage({params}: NextPageProps<Props>) {

  const category = await getCategory(params.categorySlug)
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