import { log } from "console"
import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../utils/prisma"
import { Product, ProductCategory } from "@prisma/client"

export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams
    const categories = params.get("cat")?.split(",")
    const search = params.get("search")
    console.log(categories);
    
    let response = {
      params: {
        categoriesSlugs: [] as any[],
        search: search
      },
      categories: [] as any[]
    }
    if(categories[0] == 'undefined' || categories?.length <= 0){
      const categories = await prisma.productCategory.findMany({
        include: {
          products: true,
        }
      })
      for(const category of categories || []) {
        response.categories.push(category)
        response.params.categoriesSlugs.push(category.slug)
      }
      return NextResponse.json(response)
    }

    for(const category of categories || []) {
      let cat = await prisma.productCategory.findFirst({
        where: {
          slug: {
            equals: category
          }
        },
        include: {
          products: {
            where : {
              name: {
                contains: search?.toString(),
                mode: "insensitive"
              }
            }
          }
        }
      })
      
      response.categories.push(cat)
      
      response.params.categoriesSlugs.push(cat?.slug)
    }
    return NextResponse.json(response)
  }