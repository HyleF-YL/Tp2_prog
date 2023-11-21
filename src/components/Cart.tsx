import { Button, Card, ProductCardLayout, ProductCartLine, SectionContainer } from "tp-kit/components";
import { addLine, removeLine, computeLineSubTotal, updateLine, clearCart, computeCartTotal, useStore } from "../hooks/use-cart";
import { useState, useEffect, useTransition } from "react";
import { createOrder } from "../actions/create-orders";


export default function Cart() {
    const lines = useStore((state) => state.lines)
    const [totalCart,setTotalCart] = useState(computeCartTotal(lines))
    const [isPending,startTransition] = useTransition();

    useEffect(() => {
        setTotalCart(computeCartTotal(lines))
    }, [lines])
    return (
        <section className="w-full space-y-8">
            <Card className="flex flex-col justify-around">
                <h2>Mon panier</h2>
                {
                lines.map((line) => {
                    return <ProductCartLine key={line['product']['id']}
                    onDelete={() => removeLine(line['product']['id'])}
                    onQtyChange={(value: number) => {
                    
                    let oldQty = line['qty']
                    line['qty'] = value
                    if(oldQty < value)
                        line['product']['price'] = computeLineSubTotal(line) - (line['product']['price'] * oldQty)
                    else if(oldQty > value)
                        line['product']['price'] = (line['product']['price'] * oldQty) - computeLineSubTotal(line)

                    updateLine(line)
                    }} 
                    product={line['product']} qty={line['qty']}/>
                })
                }
                <div className="flex flex-row justify-between mt-3">
                    <h3>Total</h3>
                    <h3>{totalCart + " €"}</h3>
                </div>
                
                <Button className="mt-2" fullWidth onClick={() => startTransition(() => {
                    createOrder(lines,totalCart)
                    clearCart()
                })}>Commander</Button>
                <Button className="mt-4" variant={"outline"} onClick={() => clearCart()} fullWidth>Vider le panier</Button>
            </Card>
            
        </section>  
    );
}