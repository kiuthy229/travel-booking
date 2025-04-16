import React from 'react';
import CommonSection from '../shared/CommonSection';
import '../styles/tours.css';
import TourCard from '../shared/TourCard';
import Newsletter from '../shared/Newsletter';
import { Row, Col, Container, Spinner } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import SearchBar from '../shared/SearchBar';
import apiClient from '../utils/api';
import { useQuery } from 'react-query';

const fetchTours = async (search) => {
  const {
    data: { data },
  } = await apiClient.get(`/tours${search}`);
  return data;
};

const Tours = () => {
  const location = useLocation();
  const {
    data: tours,
    isLoading,
    isError,
    error,
  } = useQuery(['tours', location.search], () => fetchTours(location.search));

  return (
    <>
      <CommonSection title={'All Tours'} />

      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>

      <section className='pt-0'>
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
                <Col lg='3' className='mb-4' key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))}
          </Row>
        </Container>
      </section>

      <Newsletter />
    </>
  );
};

export default Tours;
