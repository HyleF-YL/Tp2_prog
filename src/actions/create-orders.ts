"use server"
import prisma from "../utils/prisma"
import { ProductLineData } from "../types";

export async function createOrder(lines: ProductLineData[],total: number) {
    const currentDate = new Date();
    await prisma.order.create(
        {
            data: {
                createdAt: new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate()),
                lines: undefined,
                total: total
            }
        }
    )
    const orderId = await prisma.order.findFirst({
        orderBy: {
            id: "desc"
        }
    })
    lines.forEach(async (line) => {
        await prisma.orderLine.create({
            data: {
                product: {
                    connect : {
                        id: line.product.id
                    }
                },
                order: {
                    connect: {
                        id: orderId?.id
                    }
                },
                qtv: line.qty,
                subtotal: total
            }
        })
    })
}
