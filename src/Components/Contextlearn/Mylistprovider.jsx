import { useState, useCallback, createContext, useContext } from 'react';


const productsContext = createContext();

export const Mylistprovider = ({ children })=> {
    const products = [{ name: 'mobile', price: 10 }, { name: 'watch', price: 20 }, { name: 'headphone', price: 14 }];
    const [cartitems, setCartitems] = useState([]);
    const [value, setValue] = useState(null);
    const [totalPrice, setTotalprice] = useState(0);

    const addTocart = useCallback((value) => {
        console.log(value);
        if (value == null) {
            return;
        }
        setCartitems((prev) => { return [...prev, value] });
        setTotalprice(totalPrice+value.price);
        setValue(null);
    }, [value, cartitems])

    return (
        <productsContext.Provider value={{ products, cartitems, addTocart, totalPrice,value, setValue }}>
            {children}
        </productsContext.Provider>
    );
}

export const useCart = () => useContext(productsContext);