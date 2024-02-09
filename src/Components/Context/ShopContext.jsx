
import { createContext, useEffect, useState } from 'react';
import Loading from '../../Pages/Loading';


export const ShopContext = createContext();
const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0
    }
    return cart;
}

const ShopContextProvider = ({ children }) => {
    const [all_product,setAll_product]=useState([])
    const [cartItems, setCartItems] = useState(getDefaultCart())
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        setLoading(true)
        fetch('https://react-ecommerce-server-phi.vercel.app/allproducts')
        .then((res)=>res.json())
        .then((data)=>{
            setAll_product(data)
            setLoading(false)
        })


        if(localStorage.getItem('loginId')){
            fetch(`https://react-ecommerce-server-phi.vercel.app/getCart`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({'loginId':`${localStorage.getItem('loginId')}`})
            })
            .then((res)=>res.json())
            .then((data)=>{
                setCartItems(data)  
            })
           }
    },[])
    if(loading){
        return <Loading/>
    }
    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
       if(localStorage.getItem('loginId')){
        fetch(`https://react-ecommerce-server-phi.vercel.app/addtoCart`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'itemId':itemId,'loginId':`${localStorage.getItem('loginId')}`})
        })
        .then((res)=>res.json())
        .then((data)=>console.log(data))
       }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if(localStorage.getItem('loginId')){
            fetch(`https://react-ecommerce-server-phi.vercel.app/removeformCart`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({'itemId':itemId,'loginId':`${localStorage.getItem('loginId')}`})
            })
            .then((res)=>res.json())
            .then((data)=>console.log(data))
           }
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
        if(localStorage.getItem('loginId')){
            for(const item in cartItems)
            {
                if(cartItems[item]>0)
                {
                    totalItem+= cartItems[item]
                }
            }
        }
        
        return totalItem;
    }
    const contextValue = {getTotalCartAmount,getTotalCartItems, addToCart,removeFromCart,all_product,setCartItems, cartItems }
    return (
        <div>
            <ShopContext.Provider value={contextValue}>
                {children}
            </ShopContext.Provider>
        </div>
    )
}
export default ShopContextProvider;