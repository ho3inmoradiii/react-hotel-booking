import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useBookmarkData } from "./BookmarkLayoutWithContext.jsx";
import { useNavigate } from "react-router-dom";

function SingleBookmark() {
    const { bookmarkId } = useParams();
    const { getBookmark, currentBookmark, isLoading } = useBookmarkData();
    const navigate = useNavigate();

    useEffect(() => {
        getBookmark(bookmarkId);
        console.log(currentBookmark)
    }, [bookmarkId])

    if (isLoading || !currentBookmark) return 'Loading...'

    return <>
        <div className="currentBookmark">
            <button className="btn btn--back" onClick={() => navigate(-1)}>← Back</button>
            <h2>{currentBookmark.cityName}</h2>
            <div className="bookmarkItem">
                <strong>{currentBookmark.cityName}</strong>
                <span>{currentBookmark.country}</span>
            </div>
        </div>
    </>
}

export default SingleBookmark;
