import {createContext, useContext, useReducer, useEffect} from "react";
import {Outlet} from "react-router-dom";
import Map from "../Map/Map.jsx";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarkContext = createContext(null);
const BASE_URL = 'http://localhost:5000';
const initialState = {
    bookmarks: [],
    isLoading: false,
    currentBookmark: null,
    error: null,
}

const bookmarkReducer = (state, action) => {
    switch (action.type) {
        case 'bookmarks/loaded':
            return {
                ...state,
                isLoading: false,
                bookmarks: action.payload
            }
        case 'bookmark/loaded':
            return {
                ...state,
                isLoading: false,
                currentBookmark: action.payload
            }
        case 'bookmark/created':
            return {
                ...state,
                isLoading: false,
                bookmarks: [...state.bookmarks, action.payload],
                currentBookmark: action.payload,
            };
        case 'bookmark/deleted':
            return {
                ...state,
                isLoading: false,
                bookmarks: state.bookmarks.filter(item => item.id !== action.payload),
                currentBookmark: null
            };
        case 'rejected':
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case 'loading':
            return {
                ...state,
                isLoading: true,
            }
        default:
            throw new Error('Unknown action')
    }
}

export const useBookmarkData = () =>  useContext(BookmarkContext);

export function BookmarkLayoutWithContext() {
    const [{ bookmarks, isLoading, currentBookmark }, dispatch] = useReducer(
        bookmarkReducer, initialState
    );

    useEffect(() => {
        const fetchBookmarkList = async () => {
            dispatch({ type: 'loading' })
            try {
                const { data } = await axios.get(`${BASE_URL}/bookmarks`)
                dispatch({
                    type: 'bookmarks/loaded',
                    payload: data
                })
                console.log(data);
            } catch (e) {
                toast.error(e.message);
                dispatch({
                    type: 'rejected',
                    payload: e.message
                })
            }
        }

        fetchBookmarkList();
    }, [])

    const createBookmark = async (newBookmark) => {
        dispatch({ type: 'loading' })
        try {
            const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
            dispatch({
                type: 'bookmark/created',
                payload: data
            })
        } catch (e) {
            toast.error(e.message)
            dispatch({
                type: 'rejected',
                payload: e.message,
            })
        }
    }

    const getBookmark = async (id) => {
        dispatch({ type: 'loading' })
        try {
            const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
            dispatch({
                type: 'bookmark/loaded',
                payload: data,
            })
        } catch (e) {
            toast.error(e.message)
            dispatch({
                type: 'rejected',
                payload: e.message,
            })
        }
    }

    const deleteBookmark = async (id) => {
        dispatch({type: 'loading'})
        try {
            await axios.delete(`${BASE_URL}/bookmarks/${id}`)
            dispatch({
                type: 'bookmark/deleted',
                payload: id
            })
        } catch (e) {
            toast.error(e.message)
            dispatch({
                type: 'rejected',
                payload: e.message,
            })
        }
    }

    return(
        <BookmarkContext.Provider value={{ bookmarks, isLoading, currentBookmark, createBookmark, getBookmark, deleteBookmark }}>
            <div className="appLayout">
                <div className="sidebar">
                    <Outlet/>
                </div>
                <Map hotels={bookmarks || []} />
            </div>
        </BookmarkContext.Provider>
    )
}

