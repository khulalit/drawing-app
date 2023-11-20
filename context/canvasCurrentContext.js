import { createContext, useContext, useState } from "react";


const canvasCurrentcontext = createContext();

export const canvasCurrentProvider = ({ children })=>{
    const [canvas, setCanvas] = useState("fsdjlfjdsfjsdlfk");

    const contextValue = {
        canvas,
        setCanvas,
      };

    return <canvasCurrentcontext.Provider value={contextValue}>
        {children}
    </canvasCurrentcontext.Provider>
}

export const useCanvas = ()=>{
    const value = useContext(canvasCurrentcontext);

    console.log(value)

    if(!value) console.log('not defined');

    return value;
}


