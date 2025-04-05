import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookmarks, removeBookmark } from '../../store/slices/bookmarksSlice';
import PreviewCard from '../common/PreviewCard';
import './Bookmark.css';

const Bookmark = () => {
   const dispatch = useDispatch();
   const { bookmarks, loading, error } = useSelector((state) => state.bookmarks);

   useEffect(() => {
      dispatch(fetchBookmarks());
   }, [dispatch]);

   const handleRemoveBookmark = (id) => {
      dispatch(removeBookmark(id));
   };

   if (loading) {
      return <div className="loading">Loading...</div>;
   }

   if (error) {
      return <div className="error-message">{error}</div>;
   }

   return (
      <div className="bookmark-container">
         <h1>Bookmarks</h1>
         {bookmarks.length === 0 ? (
            <p className="no-bookmarks">No bookmarks yet. Start adding your favorite content!</p>
         ) : (
            <div className="bookmark-grid">
               {bookmarks.map((bookmark) => (
                  <PreviewCard
                     key={bookmark.id}
                     id={bookmark.id}
                     title={bookmark.title}
                     thumbnail={bookmark.thumbnail}
                     year={bookmark.year}
                     category={bookmark.category}
                     rating={bookmark.rating}
                     onBookmarkRemoved={() => handleRemoveBookmark(bookmark.id)}
                  />
               ))}
            </div>
         )}
      </div>
   );
};

export default Bookmark; 