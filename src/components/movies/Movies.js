import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../store/slices/moviesSlice';
import PreviewCard from '../common/PreviewCard';
import './Movies.css';

const Movies = () => {
   const dispatch = useDispatch();
   const { movies, loading, error } = useSelector((state) => state.movies);

   useEffect(() => {
      dispatch(fetchMovies());
   }, [dispatch]);

   if (loading) {
      return <div className="loading">Loading...</div>;
   }

   if (error) {
      return <div className="error-message">{error}</div>;
   }

   return (
      <div className="movies-container">
         <h1>Movies</h1>
         <div className="movies-grid">
            {movies.map((movie) => (
               <PreviewCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  thumbnail={movie.thumbnail}
                  year={movie.year}
                  category={movie.category}
                  rating={movie.rating}
               />
            ))}
         </div>
      </div>
   );
};

export default Movies; 