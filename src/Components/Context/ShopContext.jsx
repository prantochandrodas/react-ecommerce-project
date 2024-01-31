
import { createContext } from 'react';
import all_product from '../Assets/all_product';

export const ShopContext=createContext();


const ShopContextProvider=({children})=>{
    console.log(all_product)
    const contextValue={all_product}

    return(
        <div>
            <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
        </div>
    )
}
export default ShopContextProvider;