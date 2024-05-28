import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Close from '../public/icons/close.svg'
import Plus from '../public/icons/plus.jpg'
import { TbCategoryPlus } from "react-icons/tb";
import PouchDb from 'pouchdb'
import AddCategory from './AddCategory';


const Expenses = ({ onData,currencySymbol,categoryData,edit }) => {
    const [det, setDet] = useState({
        companyName: '',
        revenue: '',
        netProfit:'',
        netProfitPercent:''
    })
    const [btn,setBtn]=useState({
        disabled:'true',
        cursor:'cursor-not-allowed',
        opacity:0.5
    })
    const handleDet = (e) => {
        setDet({ ...det, [e.target.name]: e.target.value })
    }
    const [optionCategory,setOptionCategory]=useState([])
    const [expenseDetails, setExpenseDetails] = useState([{ id: 1, value: '' }])
    const [expenseCost, setExpenseCost] = useState([{ id: -1, value: '' }])
    const [category, setCategory] = useState([{ id: 1000, value: '' }])
    const [isCategory, setIsCategory] = useState(false);

    const CategoryPopup = () => {
        setIsCategory(true);
    };
    const closeCategoryPopUp = async() => {
        const pouchdb=new PouchDb('addCategory')
        try {
            const allDocs = await pouchdb.allDocs({
                include_docs: true,
                descending: true, // Sort documents in descending order
                limit: 2 // Limit to the top 2 documents
            });
            let previousDoc=null
            if(allDocs.rows.length>0){
                previousDoc=allDocs.rows[0]
            }
            if(previousDoc!==null){
                const documentData=previousDoc.doc.data || []
                setOptionCategory(documentData)
            }
        }
        catch(err){
            console.log(err)
        }
        setIsCategory(false);
      };

    useEffect(() => {
        if (edit !== null) {
            let values=Object.values(edit.propsForEdit)[0]
            setDet({
                companyName: values.companyName,
                revenue: values.revenue,
                netProfit: values.netProfit,
                netProfitPercent: values.netProfitPercent
            });
            const array=values.expenseDetails.map((val,index) => {
                return(
                    {id:index+1,value:val}
                )
            })
            setExpenseDetails(array)
            const arrayCost=values.expenseCost.map((val,index) => {
                return(
                    {id:-index-1,value:val}
                )
            })
            setExpenseCost(arrayCost)
            const arrayCategory=values.category.map((val,index)=>{
                return(
                    {id:index+1000,value:val}
                )
            })
        }
    }, [edit]);    
    const addExpense = () => {
        let newExpenseDetailsId = expenseDetails.length + 1
        let newExpenseCostId = expenseCost.length + 1
        let newCategoryId = category.length + 1000
        setExpenseDetails([...expenseDetails, { id: newExpenseDetailsId, value: '' }])
        setExpenseCost([...expenseCost, { id: -newExpenseCostId, value: '' }])
        setCategory([...category, { id: newCategoryId, value: '' }])
    }
    const handleExpenseDetailsChange = (id, value) => {
        const updatedExpense = expenseDetails.map(input =>
            input.id === id ? { ...input, value } : input
        );
        setExpenseDetails(updatedExpense);
    }
    const handleExpenseCostChange = (id, value) => {
        const updatedCost = expenseCost.map(input =>
            input.id === id ? { ...input, value } : input
        );
        setExpenseCost(updatedCost);
    }
    const handleCategoryChange = (id, value) => {
        const updatedCategory = category.map(input =>
            input.id === id ? { ...input, value } : input
        );
        setCategory(updatedCategory);
    }
    const getValueById = id => {
        const input = expenseCost.find(input => input.id === id);
        return input ? input.value : '';
    };

    const getValueByIdSelect = id => {
        const input = category.find(input => input.id === id);
        return input ? input.value : '';
    };
    const clearDet = () => {
        setDet({
            companyName: '',
            revenue: '',
            netProfit: '',
            netProfitPercent: ''
        });
        setExpenseDetails([{ id: 1, value: '' }]);
        setExpenseCost([{ id: -1, value: '' }]);
        setCategory([{ id: 1000, value: '' }]);
        setBtn({
            disabled: true,
            style: { cursor: 'not-allowed', opacity: 0.5 }
        });
        onData({ companyName: '', revenue: '', sumAmt: '', netProfit: '', netProfitPercent: '' });
    };
    const handleRemoveInput = (id) => {
        let filteredExpenseDetails = expenseDetails.filter(input => input.id !== id);
        let filteredExpenseCost = expenseCost.filter(input => input.id !== -id);
        let filteredCategory=category.filter(input => input.id===1000+id)
        if (filteredExpenseDetails.length === 0) {
            filteredExpenseDetails = [{ id: 1, value: '' }];
            filteredExpenseCost = [{ id: -1, value: '' }];
            filteredCategory = [{id:1000,value:''}]
        }
        setExpenseDetails(filteredExpenseDetails);
        setExpenseCost(filteredExpenseCost);
        setCategory(filteredCategory)
    }
    const handleRevenue =(val) => {
        setDet({...det,revenue:val})
    }
    useEffect(() => {
        const pouchdb = new PouchDb('addCategory');

        // Subscribe to changes feed
        const changes = pouchdb.changes({
            live: true,
            since: 'now',
            include_docs: true
        }).on('change', async () => {
            try {
                const allDocs = await pouchdb.allDocs({
                    include_docs: true,
                    descending: true, // Sort documents in descending order
                    limit: 2 // Limit to the top 2 documents
                });

                let previousDocId = null;
                if (allDocs.rows.length > 0) {
                    // Assuming the second document is the "previous" one
                    previousDocId = allDocs.rows[0].id;
                }
                if (previousDocId === null) {
                    previousDocId = 'category' + Date.now(); // Generatinga new ID if no previous document found
                }

                const document = await pouchdb.get(previousDocId);
                const documentData = document.data || [];
                setOptionCategory(documentData);
            } catch (err) {
                console.log('Error:', err); // Log the error for debugging
            }
        });

        // Cleanup function to unsubscribe from changes feed
        return () => {
            changes.cancel();
        };
    }, []);
    
    useEffect(() => {
        const anyInputEmpty = expenseDetails.some(input => input.value === '') || expenseCost.some(input => input.value === '');
        if(!anyInputEmpty){
            setBtn({disabled:anyInputEmpty,cursor:'cursor-pointer',opacity:1})
        }
        else{
            setBtn({disabled:anyInputEmpty,cursor:'cursor-not-allowed',opacity:0.5})
        }
    },[expenseDetails,expenseCost,category,categoryData])
    const handleCalculate = async() =>{
        const sumAmt = expenseCost.reduce((total, current) => {
            return total + parseFloat(current.value || 0)
        }, 0);
        const net=(1-(sumAmt/parseFloat(det.revenue))).toFixed(2);
        const netPercent=(net*100).toFixed(2);
        setDet({...det,netProfit:net,netProfitPercent:netPercent})
        onData({
            companyName:det.companyName,
            expenseDetails: expenseDetails.map(input => input.value),
            expenseCost: expenseCost.map(input => input.value),
            category: category.map(input => input.value),
            sumAmt,
            categoryData,
            revenue: det.revenue,
            netProfit: net,
            netProfitPercent: netPercent,

        });
        const pouchdb=new PouchDb('netProfit')
        const docId='net'+Date.now()
        console.log(typeof(docId))
        const document={
            companyName:det.companyName,
            expenseDetails:expenseDetails.map(val => val.value),
            expenseCost:expenseCost.map(val => val.value),
            category:category.map(val => val.value),
            sumAmt:sumAmt,
            netProfit:net,
            netProfitPercent:netPercent,
            revenue:det.revenue
        }
        try{
            await pouchdb.put({_id:docId,data:document})
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        // <div className='h-[100vh] w-full bg-[#2F2B52] pt-1'>
        //     <div className='w-[50%] bg-white h-[72vh] ml-[7%] mt-5 rounded-xl pt-5'>
        //         <div className='ml-5'>
        //             <h2 className='font-medium text-xl'>Company information</h2>
        //             <div className='pt-2'>
        //                 <p className='text-slate-700 font-normal mb-1'>Company Name</p>
        //                 <input type="text" placeholder='Enter Company Name' className='border-2 border-slate-850 w-[98%] rounded-lg pl-3 h-9 focus:outline-none' onChange={handleDet} name='companyName' value={det.companyName} id='companyName' />
        //             </div>
        //             <div>
        //                 <div className="flex mt-3">
        //                     <div className='w-[45%] text-slate-600 font-normal'>Title</div>
        //                     <div className='w-[23%] ml-2 text-slate-600 font-normal'>Cost</div>
        //                     <div className='w-[23%] ml-2 text-slate-600 font-normal'>Category</div>
        //                 </div>
        //                 <div className='overflow-y-auto h-[18vh] mt-2'>
        //                     {expenseDetails.map(input => (
        //                         <div key={input.id} className="flex mt-2">
        //                             <input
        //                                 type="text"
        //                                 placeholder='Enter the Expense Details'
        //                                 className='w-[45%] border-2 border-slate-850 rounded-lg pl-3 h-9 focus:outline-none'
        //                                 name='expenseDetails'
        //                                 value={input.value}
        //                                 onChange={(e) => handleExpenseDetailsChange(input.id, e.target.value)}
        //                             />
        //                             <input
        //                                 key={-input.id}
        //                                 type="text"
        //                                 placeholder='1,00,000'
        //                                 className='w-[23%] border-2 border-slate-850 rounded-lg pl-3 h-9 ml-2 focus:outline-none'
        //                                 name='expenseCost'
        //                                 value={getValueById(-input.id)}
        //                                 onChange={e => {
        //                                     const newValue = e.target.value.replace(/[^\d.]/g, '');
        //                                     handleExpenseCostChange(-input.id, newValue);
        //                                 }}
        //                             />
        //                             <select
        //                                 key={input.id + 1000}
        //                                 className='w-[23%] border-2 border-slate-850 text-slate-600 rounded-lg pl-3 h-9 ml-2 focus:outline-none'
        //                                 name='category'
        //                                 value={getValueByIdSelect(input.id + 1000)}
        //                                 onChange={(e) => handleCategoryChange(input.id + 1000, e.target.value)}
        //                             >
        //                                 {
        //                                     optionCategory.map((val,index)=>{
        //                                         return <option key={index} value={val}>{val}</option>
        //                                     })
        //                                 }

        //                             </select>
        //                             {(input.value!=='' && getValueById(-input.id)!=='') && (
        //                                 <Image
        //                                     src={Close}
        //                                     className='ml-2 cursor-pointer'
        //                                     width='20'
        //                                     height='20'
        //                                     onClick={() => handleRemoveInput(input.id)}
        //                                 />
        //                             )}
        //                         </div>
        //                     ))}
        //                 </div>
        //             </div>
        //             <button className={`underline underline-offset-2 decoration-2 text-[hsl(166,75%,37%)] flex justify-center items-center border-2 border-slate-850 rounded-md mt-5 p-1 px-2 ${btn.cursor} ${btn.opacity}`} onClick={addExpense} disabled={btn.disabled}>
        //                 Add Fields
        //                 <Image
        //                     src={Plus}
        //                     className='ml-1'
        //                     width='17'
        //                     height='17'
        //                 />
        //             </button>
        //             <div className='border-b border-1 mt-10 border-slate-850 mr-5'></div>
        //             <div className="flex mt-2">
        //                 <div className='w-[50%]'>
        //                     <p className='text-slate-700 font-normal'>Total Revenue</p>
        //                     <input 
        //                         type="text" 
        //                         className='mt-1 w-[97%] border-2 border-slate-850 rounded-lg pl-3 h-9 focus:outline-none' onChange={e => {
        //                             const newValue = e.target.value.replace(/[^\d.]/g, '');
        //                             handleRevenue(newValue);
        //                         }} 
        //                         name='revenue' 
        //                         id='revenue' 
        //                         value={det.revenue} 
        //                     />
        //                 </div>
        //                 <div className='w-[50%]'>
        //                     <p className='text-slate-700 font-normal'>Net Profit Margin</p>
        //                     <input type="text" className='mt-1 w-[97%] border-2 border-slate-850 rounded-lg pl-3 h-9 focus:outline-none' value={det.netProfit} readOnly />
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <div className='w-[50%] bg-white mt-5 h-[15vh] ml-[7%] rounded-xl flex'>
        //         <div className='w-[65%]'>
        //             <p className='text-slate-700 font-normal m-3 ml-5'>Start Calculation</p>
        //             <button className='w-[30%] bg-[hsl(166,75%,37%)] h-9 ml-5 rounded-md text-white' onClick={handleCalculate}>Calculate</button>
        //             <button className='w-[30%] bg-slate-500 h-9 ml-[20%] rounded-md' onClick={clearDet}>Clear</button>
        //         </div>
        //         <div>
        //             <p className='text-slate-700 font-normal m-3'>Net Profit Value</p>
        //             <div className='ml-3 w-[100%] border-2 border-slate-850 rounded-lg pl-3 h-9 focus:outline-none flex items-center'>
        //                 <input type="text" className='focus:outline-none w-[90%]' value={det.netProfitPercent} readOnly/>
        //                 <p className='text-slate-700 font-normal text-sm'>%</p>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className='md:h-[72vh] lg:h-[70vh] w-[100%] lg:w-[100%] ml-10 pt-1'>
            <div className='md:h-[75vh] h-[80vh] w-[100%] bg-white lg:h-[72vh] lg:ml-[7%] mt-10 lg:mt-5 rounded-xl pt-5'>
                <div className='ml-5'>
                    <div className='flex justify-between items-center'>
                        <h2 className='font-medium text-xl mb-2' title="Enter company information here">Company information</h2>
                        <button className='flex items-center space-x-2 bg-[hsl(166,75%,37%)] text-white px-4 py-2 rounded-lg mr-6' title="Add more Category" onClick={CategoryPopup}>
                            <TbCategoryPlus className="w-6 h-6" />
                            <span>Add Category</span>
                        </button>
                    </div>
                    <div className='pt-2'>
                        <p className='text-slate-700 font-normal mb-2' title="Enter company name here">Company Name</p>
                        <input
                            type="text"
                            placeholder='Enter Company Name'
                            className='border-2 border-slate-850 w-[98%] rounded-lg pl-3 h-9 focus:outline-none'
                            onChange={handleDet}
                            name='companyName'
                            value={det.companyName}
                            id='companyName'
                        />
                    </div>
                    <div>
                        <div className="flex mt-3">
                            <div className='w-[45%] text-slate-600 font-normal' title="Enter expense details here">Title</div>
                            <div className='w-[23%] ml-2 text-slate-600 font-normal' title="Enter expense cost here">Cost</div>
                            <div className='w-[23%] ml-2 text-slate-600 font-normal' title="Select expense category here">Category </div>
                        </div>
                        <div className='overflow-y-auto h-[18vh] mt-1'>
                            {expenseDetails.map(input => (
                                <div key={input.id} className="flex mt-2 mb-4">
                                    <input
                                        type="text"
                                        placeholder='Enter the Expense Details'
                                        className='w-[45%] border-2 border-slate-850 rounded-lg pl-3 h-9 focus:outline-none'
                                        name='expenseDetails'
                                        value={input.value}
                                        onChange={(e) => handleExpenseDetailsChange(input.id, e.target.value)}
                                    />
                                    <input
                                        key={-input.id}
                                        type="text"
                                        placeholder='1,00,000'
                                        className='w-[23%] border-2 border-slate-850 rounded-lg pl-3 h-9 ml-2 focus:outline-none'
                                        name='expenseCost'
                                        value={`${currencySymbol} ${getValueById(-input.id)}`}
                                        onChange={e => {
                                            const newValue = e.target.value.replace(/[^\d.]/g, '');
                                            handleExpenseCostChange(-input.id, newValue);
                                        }}
                                    />
                                    <select
                                        key={input.id + 1000}
                                        className='w-[23%] border-2 border-slate-850 text-slate-600 rounded-lg pl-3 h-9 mx-2 focus:outline-none'
                                        name='category'
                                        value={getValueByIdSelect(input.id + 1000)}
                                        onChange={(e) => handleCategoryChange(input.id + 1000, e.target.value)}
                                    >
                                        {
                                            optionCategory.map((val,index)=>{
                                                return <option key={index} value={val}>{val}</option>
                                            })
                                        }

                                    </select>
                                    {(input.value !== '' && getValueById(-input.id) !== '') && (
                                        <div className="cursor-pointer mt-2" onClick={() => handleRemoveInput(input.id)}>
                                            <Image
                                                src={Close}
                                                width={20}
                                                height={20}
                                                alt="Close Icon"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className={`underline underline-offset-2 decoration-2 text-[hsl(166,75%,37%)] flex justify-center items-center border-2 border-slate-850 rounded-md mt-5 p-1 px-2 ${btn.cursor} ${btn.opacity}`} disabled={btn.disabled} title="Please Enter all the fields">
                        Add Fields
                        <Image
                            src={Plus}
                            className='ml-1' onClick={addExpense}
                            width={17}
                            height={17}
                            alt="Plus Icon"
                        />
                    </button>
                    <div className='border-b border-1 mt-10 border-slate-850 mr-5'></div>
                    <div className="flex mt-4 gap-x-10 ">
                        <div className='w-[45%]'>
                            <p className='text-slate-700 font-normal' title="Enter Your Total Revenue">Total Revenue</p>
                            <input
                                type="text"
                                className='mt-1 w-[97%] border-2 border-slate-850 rounded-lg pl-3 h-9 focus:outline-none'
                                onChange={e => {
                                    const newValue = e.target.value.replace(/[^\d.]/g, '');
                                    handleRevenue(newValue);
                                }}
                                name='revenue'
                                id='revenue'
                                value={`${currencySymbol} ${det.revenue}`}
                            />
                        </div>
                        <div className='w-[45%]'>
                            <p className='text-slate-700 font-normal' title="Calculated Net Profit Margin">Net Profit Margin</p>
                            <input
                                type="text"
                                className='mt-1 w-[97%] border-2 border-slate-850 rounded-lg pl-3 h-9 focus:outline-none'
                                value={det.netProfit}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-[100%] bg-white mt-5 h-[15vh] lg:ml-[7%] rounded-xl flex'>
                <div className='w-[65%]'>
                    <p className='text-slate-700 font-normal m-3 ml-5'>Start Calculation</p>
                    <button className='w-[30%] bg-[hsl(166,75%,37%)] h-9 ml-5 rounded-md text-white' onClick={handleCalculate}>Calculate</button>
                    <button className='w-[30%] bg-slate-500 h-9 ml-[20%] rounded-md' onClick={clearDet}>Clear</button>
                </div>
                <div>
                    <p className='text-slate-700 font-normal m-3'>Net Profit Value</p>
                    <div className='ml-3 w-[100%] border-2 border-slate-850 rounded-lg pl-3 h-9 focus:outline-none flex items-center'>
                        <input
                            type="text"
                            className='focus:outline-none w-[90%]'
                            value={det.netProfitPercent}
                            readOnly
                        />
                        <p className='text-slate-700 font-normal text-sm'>%</p>
                    </div>
                </div>
            </div>
            {isCategory ? <AddCategory onClose={closeCategoryPopUp}/> : null}
        </div>
    )
}

export default Expenses
