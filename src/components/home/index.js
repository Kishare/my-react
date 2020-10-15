import React from 'react';

const Home = ({ data }) => {
  const { name, phone } = data;

  return (
    <li>
      <span>{`name : ${name} | `}</span>
      <span>{`phone : ${phone}`}</span>
    </li>
  );
};

export default Home;
