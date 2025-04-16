import React from 'react';
import TourCard from '../../shared/TourCard';
import { Col, Spinner } from 'reactstrap';
import { useQuery } from 'react-query';
import apiClient from '../../utils/api';

const fetchFeaturedTours = async () => {
  const {
    data: { data },
  } = await apiClient.get('/tours/s/featured');
  return data;
};

const FeaturedTours = () => {
  const {
    data: tours,
    isLoading,
    isError,
    error,
  } = useQuery('featuredTours', fetchFeaturedTours);

  if (isLoading) return <Spinner color='primary' />;
  if (isError) return <p className='text-danger'>{error.message}</p>;

  return (
    <>
      {tours?.map((tour) => (
        <Col lg='3' className='mb-4' key={tour._id}>
          <TourCard tour={tour} />
        </Col>
      ))}
    </>
  );
};

export default FeaturedTours;
