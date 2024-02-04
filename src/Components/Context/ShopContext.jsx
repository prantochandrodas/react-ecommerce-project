
import { createContext, useState } from 'react';
import all_product from '../Assets/all_product';

export const ShopContext = createContext();
const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length + 1; index++) {
        cart[index] = 0
    }
    return cart;
}

const ShopContextProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState(getDefaultCart())
    console.log(cartItems)

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
       
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }

    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0){
               
                let itemInfo=all_product.find((product)=>product.id===Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems=()=>{
        let totalItem=0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem+= cartItems[item]
            }
        }
        return totalItem;
    }
    const contextValue = {getTotalCartAmount,getTotalCartItems, addToCart,removeFromCart,all_product, cartItems }
    return (
        <div>
            <ShopContext.Provider value={contextValue}>
                {children}
            </ShopContext.Provider>
        </div>
    )
}
export default ShopContextProvider;