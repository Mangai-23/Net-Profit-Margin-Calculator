import React, { useState } from 'react';
import CurrencyPopUp from './CurrencyPopup';
const Currency = ({isCurrency,setClosePopUp,setCurrencyIdValue,CurrencyValue,currencyClick,currencySymbol,currencyId}) => {
  return (
    <>
      <div className="flex pl-96 lg:ml-[500px] md:ml-[470px]">
        {isCurrency ? <CurrencyPopUp myCurrencySymbol={CurrencyValue}
            myCurrencyId={setCurrencyIdValue}
            closeCurrencyPopUp={setClosePopUp}/> : null}
        <span
          className="w-[55%] font-[sf-pro-medium] pl-2 text-[14px] bg-transparent"
        >Currency:</span>
        <select
          id="currencyPopUp"
          className={
            "text-[12px] ml-2 bg-transparent font-[sf-pro-medium] cursor-pointer outline-none"
          }
          onClick={currencyClick}
        >
          <option>
            {currencyId}({currencySymbol})
          </option>
        </select>
      </div>
    </>
  );
};

export default Currency;
