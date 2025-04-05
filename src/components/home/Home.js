import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../store/slices/moviesSlice';
import { fetchTvSeries } from '../../store/slices/tvSeriesSlice';
import TrendingCard from '../common/TrendingCard';
import PreviewCard from '../common/PreviewCard';
import './Home.css';

const Home = () => {
   const dispatch = useDispatch();
   const { movies, loading: moviesLoading, error: moviesError } = useSelector(
      (state) => state.movies
   );
   const { tvSeries, loading: tvSeriesLoading, error: tvSeriesError } = useSelector(
      (state) => state.tvSeries
   );

   useEffect(() => {
      dispatch(fetchMovies());
      dispatch(fetchTvSeries());
   }, [dispatch]);

   if (moviesLoading || tvSeriesLoading) {
      return <div className="loading">Loading...</div>;
   }

   if (moviesError || tvSeriesError) {
      return (
         <div className="error-message">
            {moviesError || tvSeriesError}
         </div>
      );
   }

   // Get trending content (first 5 items from each category)
   const trendingMovies = movies.slice(0, 5);
   const trendingShows = tvSeries.slice(0, 5);

   // Get recommendations (remaining items)
   const recommendedContent = [...movies.slice(5), ...tvSeries.slice(5)];

   return (
      <div className="home-container">
         <section className="trending-section">
            <h2>Trending Now</h2>
            <div className="trending-grid">
               {trendingMovies.map((movie) => (
                  <TrendingCard
                     key={movie.id}
                     id={movie.id}
                     title={movie.title}
                     thumbnail={movie.thumbnail}
                     year={movie.year}
                     category={movie.category}
                     rating={movie.rating}
                  />
               ))}
               {trendingShows.map((show) => (
                  <TrendingCard
                     key={show.id}
                     id={show.id}
                     title={show.title}
                     thumbnail={show.thumbnail}
                     year={show.year}
                     category={show.category}
                     rating={show.rating}
                  />
               ))}
            </div>
         </section>

         <section className="recommendations-section">
            <h2>Recommended for You</h2>
            <div className="recommendations-grid">
               {recommendedContent.map((item) => (
                  <PreviewCard
                     key={item.id}
                     id={item.id}
                     title={item.title}
                     thumbnail={item.thumbnail}
                     year={item.year}
                     category={item.category}
                     rating={item.rating}
                  />
               ))}
            </div>
         </section>
      </div>
   );
};

export default Home; 