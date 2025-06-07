// File: src/components/Dashboard/Cards.js
import React from 'react';
import '../../index.css';

const Cards = ({ title, value, bgColor }) => {
  return (
    <div
      className="dashboard-card"
      style={{ backgroundColor: bgColor }}
    >
      <div className="card-title">{title.toUpperCase()}</div>
      <div className="card-value">{value !== null ? value : '-'}</div>
    </div>
  );
};

export default Cards;
