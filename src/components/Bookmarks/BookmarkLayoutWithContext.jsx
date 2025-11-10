import { createContext, useState, useContext } from "react";
import {Outlet} from "react-router-dom";
import Map from "../Map/Map.jsx";

const BookmarkContext = createContext(null);
export const useBookmarkData = () =>  useContext(BookmarkContext);

export function BookmarkLayoutWithContext() {
    const [sharedData, setSharedData] = useState(null);

    return(
        <BookmarkContext.Provider value={{sharedData, setSharedData}}>
            <div className="appLayout">
                <div className="sidebar">
                    <Outlet/>
                </div>
                <Map hotels={sharedData || []} />
            </div>
        </BookmarkContext.Provider>
    )
}

