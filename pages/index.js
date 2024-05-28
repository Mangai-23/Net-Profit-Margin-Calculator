import Head from 'next/head';
import Content from '../container/Content';
import Header from '../container/Header';
import { useState } from 'react';
// import '../styles/global.css'

export default function Home() {
  const [isCurrency,setIsCUrrency] = useState(false)
  const [currencySymbol,setCurrencySymbol] = useState('\u20B9')
  const [currencyId,setCurrencyId] = useState('INR')
  const currencyClick = ()=>{
    setIsCUrrency(true)
  }
  const CurrencyValue = (currencySymbols) => {
    setCurrencySymbol(currencySymbols);
  };
  const setCurrencyIdValue = (currencyIds) => {
    setCurrencyId(currencyIds)
  };
  const setClosePopUp = (closeCurrency) => {
    setIsCUrrency(closeCurrency)
  };

  return (
    <div className='bg-[#2F2B52] h-[320vh] md:h-[170vh] w-[220vh] lg:h-[140vh]'>
      <Head>
        <title>Net Profit Margin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <div className="w-full h-screen bg-black"></div> */}
      <Header 
        title="Net Profit Margin Calculator"
        currencyClick={currencyClick}
        currencySymbol={currencySymbol}
        currencyId={currencyId}
        setCurrencyIdValue={setCurrencyIdValue}
        setClosePopUp={setClosePopUp}
        isCurrency={isCurrency}
        CurrencyValue={CurrencyValue}
      />
      
      <Content  
        currencySymbol={currencySymbol}
      />
      
      {/* Description */}
      {/* Content */}
      {/* Feedback */}
      {/* Footer */}
    </div>
  );
}
