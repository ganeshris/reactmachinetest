// HomePage.js

import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart'; // Import BarChart component

const Card = ({ index }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6 m-4 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg flex flex-col items-center justify-center text-center">
      <h3 className="text-lg font-semibold mb-2">INDEX {index}</h3>
      <p className="text-gray-600">{index}.</p>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Welcome to the Dashboard!</h2>
      <div className="flex flex-wrap justify-center">
        <Card index={1} />
        <Card index={2} />
        <Card index={3} />
      </div>
      <div className="w-full mt-8 flex justify-center">
        {/* Add BarChart component */}
        <BarChart
          xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
          series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
          width={700}
          height={400}
        />
      </div>
    </div>
  );
};

export default HomePage;
