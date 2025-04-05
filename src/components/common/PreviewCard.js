import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removeBookmark } from '../../store/slices/bookmarksSlice';
import './PreviewCard.css';

const PreviewCard = ({
   id,
   title,
   thumbnail,
   year,
   category,
   rating,
   onBookmarkRemoved,
}) => {
   const dispatch = useDispatch();
   const { bookmarks } = useSelector((state) => state.bookmarks);
   const [isHovered, setIsHovered] = useState(false);

   const isBookmarked = bookmarks.some((bookmark) => bookmark.id === id);

   const handleBookmark = () => {
      if (isBookmarked) {
         dispatch(removeBookmark(id));
         if (onBookmarkRemoved) {
            onBookmarkRemoved();
         }
      } else {
         dispatch(addBookmark(id));
      }
   };

   return (
      <div
         className="preview-card"
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
         <img src={thumbnail} alt={title} className="thumbnail" />
         {isHovered && (
            <div className="overlay">
               <div className="content-info">
                  <h3>{title}</h3>
                  <div className="details">
                     <span className="year">{year}</span>
                     <span className="category">{category}</span>
                     {rating && <span className="rating">{rating}</span>}
                  </div>
               </div>
               <button
                  className={`bookmark-button ${isBookmarked ? 'bookmarked' : ''}`}
                  onClick={handleBookmark}
               >
                  {isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
               </button>
            </div>
         )}
      </div>
   );
};

export default PreviewCard; 