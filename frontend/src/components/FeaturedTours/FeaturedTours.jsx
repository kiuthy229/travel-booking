import React from 'react';
import TourCard from '../../shared/TourCard';
import { Col, Spinner } from 'reactstrap';
import useFetch from '../../hooks/useFetch';
import { BASE_URL } from 'utils/config';

const FeaturedTours = () => {
  const {
    data: tours,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours/s/featured`);

  if (loading) return <Spinner color='primary' />;
  if (error)
    return <p className='text-danger'>Failed to load tours: {error}</p>;

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
