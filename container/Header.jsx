import React from 'react';
import Image from 'next/image';
import logo from '../public/images/72BTImage.png';
import Currency from './Currency';

const Header = ({title,isCurrency,setClosePopUp,setCurrencyIdValue,CurrencyValue,currencyClick,currencySymbol,currencyId}) => {
  return (
    <header className="flex top-0 items-center h-12 mt-5% lg:mt-2% w-[220vh] bg-white">
      <div className='lg:ml-4 w-[10%] ml-2 md:w-[8%] lg:w-[6%]'>
        <Image 
          src={logo}
          alt="image"
          layout="responsive"
          width={10}
          height={4}
        />
      </div>
      <p 
        className='text-bold ml-[2%] font-[sf-pro-medium] lg:text-xl md:text-lg text-sm border-l-2 lg:pl-[3%] md:pt-1 lg:pt-1 pl-4 border-black'
      >
        {title}
      </p>
      <div className=''>
        <Currency
          currencyClick={currencyClick}
          currencySymbol={currencySymbol}
          currencyId={currencyId}
          setCurrencyIdValue={setCurrencyIdValue}
          setClosePopUp={setClosePopUp}
          isCurrency={isCurrency}
          CurrencyValue={CurrencyValue}  
        />
      </div>
    </header>
  );
};

export default Header;