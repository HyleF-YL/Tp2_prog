
import { ProductData } from 'tp-kit/types'
import {create} from 'zustand'
import { ProductLineData } from '../types'

export interface CartData{
    lines: ProductLineData[]
    count: number
}

export const useStore = create<CartData>(() => ({
    lines: [] as ProductLineData[],
    count: 0
}))

/**
 * Ajoute une nouvelle ligne au panier.
 * Si le produit est déjà dans le panier, augmente la quantité de 1.
 * 
 * @param product 
 */
 export function addLine(product: ProductData) {
    let cart = useStore.getState()
    
    
    let productAlreadyInCart = false

    cart.lines.forEach((line) => {
        
        if(line['product']['id'] == product['id']){
            line['qty']++
            productAlreadyInCart = true
        }
            

    })
    if (!productAlreadyInCart){
        let newLine: ProductLineData = {product: product,qty: 1}
        cart.lines.push(newLine)
    }
    useStore.setState(() => ({lines: [...cart.lines], count: cart.lines.length}))
    
 }

 /**
  * Modifie une ligne produit du panier
  * 
  * @param line 
  */
 export function updateLine(line: ProductLineData) {
    let cart = useStore.getState()
    let index = cart.lines.findIndex((element) => element == line)
    cart.lines[index] = line
    
    useStore.setState(() => ({lines: [...cart.lines],count: cart.lines.length}))
 }
 
 /**
  * Supprime la ligne produit du panier 
  * 
  * @param productId 
  * @returns 
  */
 export function removeLine(productId: number) {
    let cart = useStore.getState()
    cart.lines.forEach((line, index) => {
        if(line['product']['id'] == productId)
            cart.lines.splice(index,1)
    })

    useStore.setState(() => ({lines: [...cart.lines], count: cart.lines.length}))
 }
 
 /**
  * Vide le contenu du panier actuel
  */
 export function clearCart() {
    useStore.setState(() => ({lines: [],count: 0}))
 }
 
 /**
  * Calcule le total d'une ligne du panier
  */
 export function computeLineSubTotal(line: ProductLineData): number {
    return line['qty'] * line['product']['price']
    
 }
 
 /**
  * Calcule le total du panier
  */
 export function computeCartTotal(lines: ProductLineData[]): number {

    let sumCart = 0
    lines.forEach((line) => {
        sumCart += computeLineSubTotal(line)
    })
    return sumCart
 }