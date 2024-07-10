import React from 'react';

const DataTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Slot</th>
          <th>Port</th>
          <th>ONT ID</th>
          <th>SN</th>
          <th>State</th>
          <th>Manufacturer</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.slot}</td>
            <td>{item.port}</td>
            <td>{item.ont_id}</td>
            <td>{item.sn}</td>
            <td>{item.state}</td>
            <td>{item.manufacturer}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;