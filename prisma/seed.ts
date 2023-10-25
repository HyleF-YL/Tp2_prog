import { PrismaClient, Product, ProductCategory } from "@prisma/client";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import prisma from "../src/utils/prisma";


async function main() {
    PRODUCTS_CATEGORY_DATA.forEach(async (product) => {
        await prisma.productCategory.create({
            data: {
                id: product.id,
                slug: product.slug,
                name: product.name
            }
        })
        product.products.forEach(async (p) => {
            await prisma.product.create({
                data: {
                    id: p.id,
                    slug: p.slug,
                    path: p.path,
                    name: p.name,
                    desc: p.desc,
                    img: p.img,
                    price: p.price,
                    category: {
                        connect: {
                            id: product.id
                        }
                    }
                }
            })
        })
    })
}
main().then(async () => {

    await prisma.$disconnect()

  })

  .catch(async (e) => {

    console.error(e)

    await prisma.$disconnect()

    process.exit(1)

  })