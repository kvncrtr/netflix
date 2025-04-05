import React, { useState, useEffect } from 'react';
import { tvSeriesService } from '../../services';
import PreviewCard from '../common/PreviewCard';
import './TvSeries.css';

const TvSeries = () => {
   const [tvShows, setTvShows] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      // Fetch TV shows data from API
      const fetchTvShows = async () => {
         try {
            setLoading(true);
            const response = await tvSeriesService.getAll();
            setTvShows(response.data);
            setError(null);
         } catch (error) {
            console.error('Error fetching TV shows:', error);
            setError('Failed to load TV shows. Please try again later.');
         } finally {
            setLoading(false);
         }
      };

      fetchTvShows();
   }, []);

   if (loading) {
      return <div className="loading">Loading...</div>;
   }

   if (error) {
      return <div className="error-message">{error}</div>;
   }

   return (
      <div className="tv-series-container">
         <h1>TV Series</h1>
         <div className="tv-series-grid">
            {tvShows.map((show) => (
               <PreviewCard key={show.id} item={show} type="tv-series" />
            ))}
         </div>
      </div>
   );
};

export default TvSeries; 