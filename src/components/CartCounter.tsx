import { useStore } from "../hooks/use-cart";
import { ProductLineData } from "../types";

console.log("rendu counter");

export default function CartCounter() {
    const count = useStore((state) => state.count)
    return(
        <h1>{count}</h1>
    );
}