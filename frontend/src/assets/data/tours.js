import tourImg01 from '../images/tour-img01.jpg';
import tourImg02 from '../images/tour-img02.jpg';
import tourImg03 from '../images/tour-img03.jpg';
import tourImg04 from '../images/tour-img04.jpg';
import tourImg05 from '../images/tour-img05.jpg';
import tourImg06 from '../images/tour-img06.jpg';
import tourImg07 from '../images/tour-img07.jpg';

const tours = [
  {
    id: '01',
    title: 'Westminister Bridge',
    city: 'London',
    distance: 300,
    price: 99,
    address: '123 Main St, London',
    maxGroupSize: 10,
    desc: 'this is the description',
    reviews: [
      {
        name: 'jhon doe',
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg01,
    featured: true,
  },
  {
    id: '02',
    title: 'Bali, Indonesia',
    city: 'Indonesia',
    distance: 400,
    price: 99,
    address: '456 Bali Ave, Indonesia',
    maxGroupSize: 8,
    desc: 'this is the description',
    reviews: [
      {
        name: 'jhon doe',
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg02,
    featured: true,
  },
  {
    id: '03',
    title: 'Beautiful Sunrise, Thailand',
    city: 'Thailand',
    distance: 500,
    price: 99,
    address: '101 Sunrise Blvd, Thailand',
    maxGroupSize: 8,
    desc: 'this is the description',
    reviews: [
      {
        name: 'jhon doe',
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg04,
    featured: true,
  },
  {
    id: '05',
    title: 'Nusa Pendia Bali, Indonesia',
    city: 'Indonesia',
    distance: 500,
    price: 99,
    address: '202 Nusa St, Indonesia',
    maxGroupSize: 8,
    desc: 'this is the description',
    reviews: [
      {
        name: 'jhon doe',
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg05,
    featured: false,
  },
  {
    id: '06',
    title: 'Cherry Blossoms Spring',
    city: 'Japan',
    distance: 500,
    price: 99,
    address: '303 Cherry Ln, Japan',
    maxGroupSize: 8,
    desc: 'this is the description',
    reviews: [
      {
        name: 'jhon doe',
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg06,
    featured: false,
  },
  {
    id: '07',
    title: 'Holmen Lofoten',
    city: 'France',
    distance: 500,
    price: 99,
    address: '404 Holmen Dr, France',
    maxGroupSize: 8,
    desc: 'this is the description',
    reviews: [
      {
        name: 'jhon doe',
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg07,
    featured: false,
  },
  {
    id: '08',
    title: 'Snowy Mountains, Thailand',
    city: 'Thailand',
    distance: 500,
    price: 99,
    address: '505 Snowy Way, Thailand',
    maxGroupSize: 8,
    desc: 'this is the description',
    reviews: [
      {
        name: 'jhon doe',
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: tourImg03,
    featured: false,
  },
];

export default tours;
