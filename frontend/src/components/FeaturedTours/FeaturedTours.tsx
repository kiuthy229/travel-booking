import React, { FC } from 'react';
import TourCard from '../../shared/TourCard';
import { Col, Spinner } from 'reactstrap';
import { useQuery } from 'react-query';
import { get } from '../../utils/api';
import { Tour } from '../../types/common';

const fetchFeaturedTours = async (): Promise<Tour[]> => {
  const { data } = (await get('/tours/featured')) as { data: Tour[] };
  return data;
};

const FeaturedTours: FC = () => {
  const {
    data: tours,
    isLoading,
    isError,
    error,
  } = useQuery<Tour[], Error>(['featuredTours'], fetchFeaturedTours);

  if (isLoading) return <Spinner color='primary' />;
  if (isError) return <p className='text-danger'>{error?.message}</p>;

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
