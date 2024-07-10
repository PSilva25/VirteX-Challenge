import React from 'react';
import PropTypes from 'prop-types';

function DataDisplay({ data }) {
  return (
    <div>
      {data.length > 0 ? (
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

DataDisplay.propTypes = {
  data: PropTypes.array.isRequired
};

export default DataDisplay;