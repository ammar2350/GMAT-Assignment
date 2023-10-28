import React from 'react';
import Plot from 'react-plotly.js';

const Gyroscope = ({ data }) => {
  // Siapkan data untuk plot
  const plotData = [
    {
      x: data.clock,  // Sumbu X adalah waktu (clock)
      y: data.yaw,    // Data yaw
      type: 'scatter',
      mode: 'lines',
      name: 'Yaw',
    },
    {
      x: data.clock,  // Sumbu X adalah waktu (clock)
      y: data.pitch,  // Data pitch
      type: 'scatter',
      mode: 'lines',
      name: 'Pitch',
    },
    {
      x: data.clock,  // Sumbu X adalah waktu (clock)
      y: data.roll,   // Data roll
      type: 'scatter',
      mode: 'lines',
      name: 'Roll',
    },
  ];

  // Konfigurasi layout plot
  const layout = {
    margin: {
    //   l: kiri,
    //   r: kanan,
    //   b: bawah,
      t: 20,
      // pad: 1,
    },
    // title: 'GYROSCOPE',
    xaxis: {
      title: 'Waktu',
    },
    yaxis: {
      title: 'Gyroscope',
    },
  };

  return (
    <Plot
      data={plotData}
      layout={layout}
      useResizeHandler={true}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default Gyroscope;
