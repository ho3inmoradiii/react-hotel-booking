import { useBookmarkData } from "./BookmarkLayoutWithContext.jsx";
import { Link } from 'react-router-dom';
import { HiTrash } from "react-icons/hi";

function BookmarkPage() {
    const { isLoading, currentBookmark, bookmarks, deleteBookmark } = useBookmarkData();

    const handleDelete = async (e, id) => {
        e.preventDefault();
        await deleteBookmark(id);
    }

    if (isLoading) return <div>Loading...</div>;
    if (!bookmarks.length) return <p>there is no bookmarked location</p>;

    return <>
        <div>
            <h2>BookmarkList</h2>
            <div className="bookmarkList">
                {bookmarks.map(bookmark => {
                    return <Link key={bookmark.id} to={`/bookmark/${bookmark.id}?lat=${bookmark.latitude}&lng=${bookmark.longitude}`}>
                        <div
                            className={`bookmarkItem ${
                                bookmark.id === currentBookmark?.id ? "current-bookmark" : ""
                            }`}
                        >
                            <div>
                                <strong>{bookmark.cityName}</strong> &nbsp; <span>{bookmark.country}</span>
                            </div>
                            <button onClick={(e) => handleDelete(e, bookmark.id)}>
                                <HiTrash className="trash"/>
                            </button>
                        </div>
                    </Link>
                })}
            </div>
        </div>
    </>
}

export default BookmarkPage;
