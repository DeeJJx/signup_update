import { ProductSelectionContext } from "../context/ProductSelectionContext";
import { useContext } from "react";

export const useProductSelectionContext = () => {
    const context = useContext(ProductSelectionContext);

    if(!context){
        throw Error('useProductSelectioncontext must be used inside an ProductSelectionContextProvider');
    }

    return context
}