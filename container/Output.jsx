import React from 'react';
import { HiOutlineClock, HiDownload } from 'react-icons/hi'; // Import icons from React Icons

const Output = ({ currencySymbol, sumAmt, revenue, netProfit, netProfitPercent }) => {

  const SumAmt = sumAmt === '' ? '0' : parseFloat(sumAmt).toLocaleString();
  const Revenue = revenue === '' ? '0' : parseFloat(revenue).toLocaleString();
  
  const formattedNetProfit = netProfit ? parseFloat(netProfit) : 0;
  const formattedNetProfitPercent = netProfitPercent ? parseFloat(netProfitPercent) : 0;
  console.log(SumAmt);
  return (
    <div className="flex flex-col items-center">
      <div className="w-[70%] lg:w-[70%] h-[72vh] md:h-[75vh] bg-[#272347] rounded-lg shadow-lg p-6 mr-8 mt-6">
        <h2 className="text-2xl text-white text-center font-semibold lg:mb-6 md:mb-2">Output</h2>
        <div className="flex flex-col space-y-6">
          <div className="bg-[#231e3f] p-3 rounded-md text-center text-white">
            <p className="text-sm pb-2 text-[#8f88bb] font-normal">Annual amount</p>
            <h3 className="text-xl font-light">{currencySymbol}{SumAmt ==='NaN' ? 0 : SumAmt }</h3>
          </div>
          <div className="bg-[#231e3f] p-3 rounded-md text-center text-white">
            <p className="text-sm pb-2 text-[#8f88bb] font-normal">Revenue</p>
            <h3 className="text-xl font-light">{currencySymbol}{Revenue ==='NaN' ? 0 : Revenue }</h3>
          </div>
          <div className="bg-[#231e3f] p-3 rounded-md text-center text-white">
            <p className="text-sm pb-2 font-normal">Net Profit Margin</p>
            <h2 className="text-2xl font-semibold">{formattedNetProfit}</h2>
          </div>
          <div className="bg-[#231e3f] p-3 rounded-md text-center text-white">
            <p className="text-sm pb-2 font-normal">Net Profit Percentage</p>
            <h2 className="text-2xl font-semibold">{formattedNetProfitPercent}%</h2>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Output;
