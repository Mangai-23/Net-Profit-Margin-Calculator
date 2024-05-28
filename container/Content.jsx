import React, { useState } from 'react';
import Heading from './Heading';
import Output from './Output';
import Expenses from './Expenses';
import { HiOutlineClock, HiDownload } from 'react-icons/hi'; 
import Pdfcomp from './Pdfcomp';
// import History from './History'; // Import the History component
import HistoryButton from './Historybutton';
// Import any other necessary modules here

const Content = ({ currencySymbol }) => {
  const [expenseData, setExpenseData] = useState(null);
    const [categoryData,setCategoryData]=useState(null);
    const [editData,setEditData]=useState(null);
    const handleExpenseData = (data) => {
        setExpenseData(data);
    };
    const handleCategoryData = (data) => {
        setCategoryData(data);
    }
    const handleEdit = (data) => {
        setEditData(data)
    }
  // const data = [
  //   expenseData.companyName,
  //   expenseData.revenue,
  //   expenseData.sumAmt,
  //   expenseData.netProfit,
  //   expenseData.netProfitPercent
  // ];
 //console.log(data);
  return (
    <>
      <div className='md:h-[170vh] lg:h-[130vh] w-[220vh]'>
        <div className='justify-center items-center'>
        <Heading />
        </div>
        <div className="lg:flex md:flex sm:block mt-2">
          <Expenses 
            onData={handleExpenseData}
            currencySymbol={currencySymbol} 
            // categoryData={categoryData} 
            edit={editData} 
          />
          <div className='ml-32 w-[70%]'>
            <Output 
              currencySymbol={currencySymbol}
              sumAmt={expenseData?.sumAmt}
              revenue={expenseData?.revenue}
              netProfit={expenseData?.netProfit}
              netProfitPercent={expenseData?.netProfitPercent}
            />
            <div className="lg:w-[75%] md:w-[80%] mt-5 lg:ml-12 ml-4">
              <div className="bg-[#272347] rounded-lg shadow-lg p-6 flex ml-6 justify-center gap-10 items-center">
                {/* <button className="flex items-center space-x-2 bg-blue-500 text-white px-5 py-2 rounded-lg" onClick={historyPopup}>
                  <HiOutlineClock className="w-6 h-6" />
                  <span>History</span>
                </button> */}
                <HistoryButton  onData={handleEdit} />
                <div>
                  <button className="flex items-center ml-2 space-x-2 bg-[hsl(166,75%,37%)] text-white px-3 py-2 rounded-lg">
                      <HiDownload className="w-6 h-6" />
                      <Pdfcomp 
                          currencySymbol={currencySymbol}
                          companyName={expenseData?.companyName}
                          sumAmt={expenseData?.sumAmt}
                          revenue={expenseData?.revenue}
                          netProfitPercent={expenseData?.netProfitPercent}
                      />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {isHistory ? <History data={data} onClose={closeHistoryDialog}/> : null} */}
      {/* <Category onData={handleCategoryData}/> */}
    </>
  );
};

export default Content;
