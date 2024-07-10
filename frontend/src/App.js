import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [huaweiData, setHuaweiData] = useState([]);
    const [zteSnsData, setZteSnsData] = useState([]);
    const [zteStateData, setZteStateData] = useState([]);

    useEffect(() => {
        axios.get('/api/huawei')
            .then(response => setHuaweiData(response.data))
            .catch(error => console.error('Error fetching Huawei data:', error));

        axios.get('/api/zte-sns')
            .then(response => setZteSnsData(response.data))
            .catch(error => console.error('Error fetching ZTE SNs data:', error));

        axios.get('/api/zte-state')
            .then(response => setZteStateData(response.data))
            .catch(error => console.error('Error fetching ZTE state data:', error));
    }, []);

    return (
        <div className="App">
            <h1>OntInfo Data</h1>
            <h2>Huawei</h2>
            <table>
                <thead>
                    <tr>
                        <th>Slot</th>
                        <th>Port</th>
                        <th>ONT ID</th>
                        <th>SN</th>
                        <th>State</th>
                    </tr>
                </thead>
                <tbody>
                    {huaweiData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.slot}</td>
                            <td>{item.port}</td>
                            <td>{item.ont_id}</td>
                            <td>{item.sn}</td>
                            <td>{item.state}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>ZTE SNs</h2>
            <table>
                <thead>
                    <tr>
                        <th>Slot</th>
                        <th>Port</th>
                        <th>ONT ID</th>
                        <th>SN</th>
                        <th>State</th>
                    </tr>
                </thead>
                <tbody>
                    {zteSnsData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.slot}</td>
                            <td>{item.port}</td>
                            <td>{item.ont_id}</td>
                            <td>{item.sn}</td>
                            <td>{item.state}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>ZTE State</h2>
            <table>
                <thead>
                    <tr>
                        <th>Slot</th>
                        <th>Port</th>
                        <th>ONT ID</th>
                        <th>State</th>
                    </tr>
                </thead>
                <tbody>
                    {zteStateData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.slot}</td>
                            <td>{item.port}</td>
                            <td>{item.ont_id}</td>
                            <td>{item.state}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
