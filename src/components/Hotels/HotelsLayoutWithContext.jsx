import { createContext, useState, useContext } from "react";
import {Outlet} from "react-router-dom";
import Map from "../Map/Map.jsx";

// eslint-disable-next-line react-refresh/only-export-components
const DataContext = createContext(null);
export const useSharedData = () => useContext(DataContext);

export function HotelsLayoutWithContext() {
    const [sharedData, setSharedData] = useState(null);
    const [currentHotel, setCurrentHotel] = useState(null);

    return (
        <DataContext.Provider value={{sharedData, setSharedData, currentHotel, setCurrentHotel}}>
            <div className="appLayout">
                <div className="sidebar">
                    <Outlet/>
                </div>
                <Map hotels={sharedData || []} />
            </div>
        </DataContext.Provider>
    )
}


