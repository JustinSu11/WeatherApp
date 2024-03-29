import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import React, { useState } from 'react';
import './components.css'

export const WeatherDataChart = ({ data }) => {
    const [selectedWeatherAttribute, setSelectedWeatherAttribute] = useState('temp');

    //takes in the selected filter value and sets the weather attribute to the selected value
    const handleFilterChange = (event) => {
        setSelectedWeatherAttribute(event.target.value);
    }

    //Transform data to recharts format
    const transformedData = data.map(dataPoint => ({
        name: new Date(dataPoint.dt * 1000).toLocaleTimeString(),
        value: dataPoint[selectedWeatherAttribute],
        unit: (selectedWeatherAttribute === 'temp' || selectedWeatherAttribute === 'feels_like' ? '°' : selectedWeatherAttribute === 'humidity' ? '%' : null),
    }));

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const { value, unit } = payload[0].payload;
            return (
                <div className="custom-tooltip-for-WeatherDataChart">
                    <p className="WeatherDataChart-value">{`${value} ${unit}`}</p>
                    <p className="WeatherDataChart-label">{label}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div>
            {/*dropdown for filter */}
            <select value={selectedWeatherAttribute} onChange={handleFilterChange}>
                <option value="temp">Temperature</option>
                <option value="feels_like">Feels Like</option>
                <option value="humidity">Humidity</option>
            </select>
            {/*recharts*/}
            <div className='weather-data-chart-container'>
                <LineChart width={600} height={300} data={transformedData}>
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis datakey="value"/>
                    <Tooltip content={<CustomTooltip />} />
                </LineChart>
            </div>
        </div>
    )
  };