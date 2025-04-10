import React, { useState, useEffect } from 'react';
import CommonSection from '../shared/CommonSection';
import TourCard from '../shared/TourCard';
import { Col, Container, Row, Spinner } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '../utils/config';
import Newsletter from './Newsletter';

const SearchResultList = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${BASE_URL}/tours${location.search}`);
        const result = await response.json();

        if (response.ok) {
          setTours(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('Failed to fetch tours. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [location.search]);

  return (
    <>
      <CommonSection title={'Tour Search Results.'} />
      <section>
        <Container>
          <Row>
            {loading && <Spinner color='primary' />}
            {error && (
              <p className='text-danger'>Failed to load tours: {error}</p>
            )}
            {!loading &&
              !error &&
              tours?.map((tour) => (
                <Col lg='3' md='4' sm='6' className='mb-4' key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))}
            {!loading && !error && tours.length === 0 && (
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
