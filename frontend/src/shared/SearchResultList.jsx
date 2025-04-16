import React from 'react';
import CommonSection from '../shared/CommonSection';
import TourCard from '../shared/TourCard';
import { Col, Container, Row, Spinner } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import Newsletter from './Newsletter';
import apiClient from '../utils/api';

const fetchTours = async (search) => {
  const response = await apiClient.get(`/tours${search}`);
  return response.data;
};

const SearchResultList = () => {
  const location = useLocation();

  const {
    data: {data: tours},
    isLoading,
    isError,
    error,
  } = useQuery(['searchTours', location.search], () =>
    fetchTours(location.search)
  );

  return (
    <>
      <CommonSection title={'Tour Search Results.'} />
      <section>
        <Container>
          <Row>
            {isLoading && <Spinner color='primary' />}
            {isError && (
              <p className='text-danger'>
                Failed to load tours: {error.message}
              </p>
            )}
            {!isLoading &&
              !isError &&
              tours?.map((tour) => (
                <Col lg='3' md='4' sm='6' className='mb-4' key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))}
            {!isLoading && !isError && tours.length === 0 && (
              <Col>
                <h5 className='text-center'>
                  No tours found. Try adjusting your search criteria.
                </h5>
              </Col>
            )}
          </Row>
        </Container>
        <Newsletter />
      </section>
    </>
  );
};

export default SearchResultList;
