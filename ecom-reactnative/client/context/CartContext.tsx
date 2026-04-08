import { dummyCart, dummyWishlist } from "@/assets/assets";
import { CartItem, Product, WishlistContextType } from "@/constants/types";
import React, { createContext, useContext, useEffect, useState } from "react";


export type Cartitem = {
    id: string;
    productId: string;
    product: Product;
    quantity: number;
    size: string;
    price: number;
}
type CartContextType = {
    cartItems : Cartitem[],
    addToCart : (product: Product, size: string) => Promise<void>;
    removeFromCart : (productId: string, size: string) => Promise<void>;
    updateQuantity : (productId: string, quantity: number, size: string) => Promise<void>;
       clearCart : () => Promise<void>;
       cartTotal : number;
        itemCount : number;
        isLoading : boolean; 

}
const CartContext = createContext<CartContextType | undefined    >(undefined)
  export const CartProvider = ({children}: {children: React.ReactNode}) => {
 

const [cartItems, setcartItems] = useState<Cartitem[]>([])
const [isLoading, setisLoading] = useState(false)
const [cartTotal, setcartTotal] = useState(0)
const fetchCartItems = async () => {
    setisLoading(true)
   const servercart = dummyCart;
   const mappedItems: Cartitem[] = servercart.items.map((item: any) => ({
    id: item.product._id,
    productId: item.product._id,
    product: item.product,
    quantity: item.quantity,
    size: item.size || "M",
    price: item.price
   }))
   setcartItems(mappedItems);
   setcartTotal(servercart.totalAmount);
   setisLoading(false)

  }
  const addToCart = async (product: Product, size: string) => {
    
  }
  const removeFromCart = async (productId: string, size: string) => {

  }
  const updateQuantity = async (productId: string, quantity: number, size: string = "M") => {

  }
  const clearCart =  async () => {

  }
  const itemcount = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
  useEffect(() => {
    fetchCartItems()
  }, [ ])
  
     return (
      <CartContext.Provider value={{
        cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, itemCount: itemcount, isLoading
      }}>
        {children}
      </CartContext.Provider>
    );
  };

  export const useCart = () => {
     const context = useContext(CartContext);
        if(context === undefined){
            throw new Error("useCart must be used within a CartProvider");
        }
        return context;
  };