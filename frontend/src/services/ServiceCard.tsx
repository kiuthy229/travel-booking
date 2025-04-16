import React from 'react';
import './service-card.css';

interface ServiceCardProps {
  item: {
    imgUrl: string;
    title: string;
    description: string;
  };
}

const ServiceCard: React.FC<ServiceCardProps> = ({ item }) => {
  const { imgUrl, title, description } = item;
  return (
    <div className='service__item'>
      <div className='service__img'>
        <img src={imgUrl} alt='' />
      </div>
      <h5>{title}</h5>
      <p>{description}</p>
    </div>
  );
};

export default ServiceCard;
