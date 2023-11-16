import { log } from "console"
import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../utils/prisma"
import { Product, ProductCategory } from "@prisma/client"

export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams
    let categories = params.get("cat")?.split(",") as string[] | undefined
    let search = params.get("search") as string | undefined
    if(search == "undefined")
      search = undefined
    
    if(categories[0] == '' || categories[0] == 'undefined')
      categories = undefined

    console.log(search)
    console.log(categories);
    
    let response = {
      params: {
        categoriesSlugs: [] as any[],
        search: search
      },
      categories: [] as any[]
    }
    if(categories == undefined && search == undefined){
      let cat = await prisma.productCategory.findMany({
        include: {
          products: true,
        }
      })
      for(const category of cat || []) {
        response.categories.push(category)
        response.params.categoriesSlugs.push(category.slug)
      }
      return NextResponse.json(response)
    }

    else if(categories == undefined && search != undefined){
      let cat = await prisma.productCategory.findMany({
        where : {
          products: {
            some : {
              name: {
                contains: search,
                mode: "insensitive"
              }
            }
          }
        },
        include: {
          products: {
            where : {
              name: {
                contains: search,
                mode: "insensitive"
              }
            }
          }
        }
      })
      for(const category of cat || []) {
        response.categories.push(category)
        response.params.categoriesSlugs.push(category.slug)
      }
      return NextResponse.json(response)
    }
    else{
      for(const category of categories || [undefined]) {
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
                  contains: search,
                  mode: "insensitive"
                }
              }
            }
          }
        })
        
        response.categories.push(cat)
        
        response.params.categoriesSlugs.push(cat?.slug)
        return NextResponse.json(response)
      }
    }
  }