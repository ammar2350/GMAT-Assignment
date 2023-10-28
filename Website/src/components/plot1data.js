import React from 'react';
import Plot from 'react-plotly.js';

const Plot1data = (data) => {
    const plotData = [
        {
        x: data.data1,
        y: data.data2,
        type: 'scatter',
        mode: 'lines',
        name: 'Yaw',
        },
    ];

    const layout = {
        margin: {
            //   l: kiri,
            r: 55,
            //   b: bawah,
            t: 20,
              // pad: 1,
            },
        // title: data.title,
        xaxis: {
        title: 'Waktu',
        },
        yaxis: {
        title: data.yaxis,
        },
    };

    return (
        <div className="w-full h-full">
            <Plot
            data={plotData}
            layout={layout}
            responsive={true}
            useResizeHandler={true}
            style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
};

export default Plot1data;
