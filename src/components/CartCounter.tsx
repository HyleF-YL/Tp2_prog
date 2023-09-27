import { useStore } from "../hooks/use-cart";
import { ProductLineData } from "../types";

console.log("rendu counter");

export interface Caca {
    lines: ProductLineData[]
}

export default function CartCounter({lines}: Caca) {
    const count = useStore((state) => state.count)
    return(
        <h1>{count}</h1>
    );
}