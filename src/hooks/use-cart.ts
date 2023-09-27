import { ProductData } from 'tp-kit/types'
import {create} from 'zustand'
import { ProductLineData } from '../types'

export interface CartData{
    lines: ProductLineData[]
}

const useStore = create<CartData>(() => ({
    lines: []
}))

/**
 * Ajoute une nouvelle ligne au panier.
 * Si le produit est déjà dans le panier, augmente la quantité de 1.
 * 
 * @param product 
 */
 export function addLine(product: ProductData) {
    let cart = useStore.getState()
    cart.lines.forEach((line) => {
        if(line['product'] == product)
            line['qty']++
            

    })
    
    let newLine: ProductLineData = {product: product,qty: 1}
    cart.lines.push(newLine)
    useStore.setState(() => ({lines: cart.lines}))
    
    
 }

 /**
  * Modifie une ligne produit du panier
  * 
  * @param line 
  */
 export function updateLine(line: ProductLineData) {}
 
 /**
  * Supprime la ligne produit du panier 
  * 
  * @param productId 
  * @returns 
  */
 export function removeLine(productId: number) {

 }
 
 /**
  * Vide le contenu du panier actuel
  */
 export function clearCart() {}
 
 /**
  * Calcule le total d'une ligne du panier
  */
 export function computeLineSubTotal(line: ProductLineData): number {}
 
 /**
  * Calcule le total du panier
  */
 export function computeCartTotal(lines: ProductLineData[]): number {}