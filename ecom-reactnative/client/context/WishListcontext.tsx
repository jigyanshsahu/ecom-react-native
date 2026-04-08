import { dummyWishlist } from "@/assets/assets";
import { Product, WishlistContextType } from "@/constants/types";
import React, { createContext, useContext, useEffect, useState } from "react";

const WishListcontext = createContext<WishlistContextType | undefined    >(undefined)
  export const WishListProvider = ({children}: {children: React.ReactNode}) => {
    const [wishlist, setwishlist] = useState<Product[]>([])
  const [loading, setloading] = useState(false)
  const fetchwishlist = async () => {
    setloading(true)
    setwishlist(dummyWishlist)
    setloading(false)

  }
  const toggleWishlist = async (product: Product) => {  
       const exists = wishlist.find((p)=> p._id === product._id);
       setwishlist((prev)=>{
        if(exists){
            return prev.filter((p)=> p._id !== product._id)
       }
       return [...prev, product]
       })  
}
  const isInWishlist =  (productId: string) => {  
      return wishlist.some((p)=> p._id === productId);
  }

  useEffect(() =>{
    fetchwishlist()
  },[])

    return (
      <WishListcontext.Provider value={{ wishlist, loading, toggleWishlist, isInWishlist }}>
        {children}
      </WishListcontext.Provider>
    );

  };

  export const useWishlist = () => {
     const context = useContext(WishListcontext);
        if(context === undefined){
            throw new Error("useWishlist must be used within a WishListProvider");
        }
        return context;
  };