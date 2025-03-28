import React from 'react';
import ServiceCard from './ServiceCard';
import { Col } from 'reactstrap';

import weatherImg from '../assets/images/weather.png';
import guideImg from '../assets/images/guide.png';
import customizationImg from '../assets/images/customization.png';

const services = [
  {
    imgUrl: weatherImg,
    title: 'Calculate Weather',
    description: 'Check the weather of your destination before you go',
  },
  {
    imgUrl: guideImg,
    title: 'Local Guide',
    description: 'Get a local guide to show you around',
  },
  {
    imgUrl: customizationImg,
    title: 'Customization',
    description: 'Customize your trip to your liking',
  },
];

const ServiceList = () => {
  return (
    <>
      {services.map((item, index) => (
        <Col lg='3' key={index}>
          <ServiceCard item={item} />
        </Col>
      ))}
    </>
  );
};

export default ServiceList;
