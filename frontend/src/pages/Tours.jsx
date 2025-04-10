import React, { useState, useEffect } from 'react';
import CommonSection from '../shared/CommonSection';
import '../styles/tours.css';
import TourCard from '../shared/TourCard';
import Newsletter from '../shared/Newsletter';
import { Row, Col, Container, Spinner } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '../utils/config';
import SearchBar from '../shared/SearchBar';

const Tours = () => {
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
      <CommonSection title={'All Tours'} />

      <section>
        <Container>
          <Row>
            <SearchBar setTours={setTours} />
          </Row>
        </Container>
      </section>

      <section className='pt-0'>
        <Container>
          <Row>
            {loading && <Spinner color='primary' />}
            {error && (
              <p className='text-danger'>Failed to load tours: {error}</p>
            )}
            {!loading &&
              !error &&
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
