import { createContext, useEffect, useReducer } from "react";

export const ProductSelectionContext = createContext();

export const productSelectionReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE":
            return { product: action.payload };
        case "DELETE":
            return { product: null };
        default:
            return state;
    }
}

export const ProductSelectionContextProvider = ({ children }) => {
    const [productState, productDispatch] = useReducer(productSelectionReducer, {
        product: null,
    });

    useEffect(() => {
        // Check for product in local storage before rendering anything
        const productID= localStorage.getItem("product");
    
        if (productID && productState.product === null) {
          console.log(productState.product, 'productState product')
          productDispatch({ type: "UPDATE", payload: productID });
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps   
      },[]); // This effect runs only once when the component mounts, can ignore the warnings
    
      // this allows products to be null but also checks when a product is null - is there a product in local storage, if so then productDispatch UPDATE
      //used to prevent product === null on page refresh
      if (productState.product === null) {
        const productID = localStorage.getItem("product")
        if (productID) {
          productDispatch({ type: "UPDATE", payload: productID });
        } 
      }


    useEffect(() => {
        console.log(productState);

      },[productState]); 

    return (
        <ProductSelectionContext.Provider value={{ ...productState, productDispatch }}>
            {children}
        </ProductSelectionContext.Provider>
    );
}