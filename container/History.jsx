import React,{useState,useEffect} from 'react'
import { Dialog } from "@mui/material";
import Close from '../public/icons/close.svg';
import Image from 'next/image';
import PouchDb from 'pouchdb'
import Trash from '../public/icons/trash.png'
const History = (props) => {
    const onClosePopUp = () => {
        props.closeHistoryPopUp(false);
    };
    const [propsFromHistory,setPropsFromHistory]=useState(props.propsData)
    const editHistory = (index) => {
        props.onProps(propsFromHistory[index])
        props.closeHistoryPopUp(false);
    }
    propsFromHistory.forEach(val => {
        const data = Object.values(val)[0];
    })
    const deleteData = async(id) => {
        const pouchdb=new PouchDb('netProfit')
        try{
            id=String(id)
            console.log(id)
            const doc=await pouchdb.get(id)
            doc._deleted=true
            await pouchdb.put(doc,{force:true})
            console.log('Document deleted sucessfully')
        }
        catch(err){
            console.log('Error : ',err)
        }
    }
    return (
        <Dialog
            fullWidth={false}
            maxWidth="md"
            open={true}
            PaperProps={{
                style: {
                    minWidth: "50%",
                    maxWidth: "90%",
                    height: "75vh",
                },
            }}
        >
            <div className='overflow-y-auto'>
                <div className="p-3 flex justify-between items-center border-b-2">
                    <h1 className="font-[interSemiBold] text-[20px]">History</h1>
                    <Image
                        width="35"
                        height="15"
                        className="h-[25px] cursor-pointer"
                        src={Close}
                        onClick={onClosePopUp}
                        alt="Close Icon"
                    />
                </div>
                <div>
                    <div className='flex-wrap mt-4 grid grid-cols-4 overflow-x-hidden gap-4 ml-3'>
                        {propsFromHistory.map((val, index) => {
                            const displayData=Object.values(val)[0];
                            const displayKey=Object.keys(val)[0]
                            return (
                                <>
                                    <div className='w-[90%] h-[15vh] bg-blue-100 rounded-xl overflow-hidden' key={index} onClick={() => editHistory(index)}>
                                    <Image
                                        width="25"
                                        height="10"
                                        className="h-[18px] cursor-pointer ml-auto mr-2 mt-2"
                                        src={Trash}
                                        alt="Close Icon"
                                        onClick={() => deleteData(displayKey)}
                                    />
                                        <p className='text-center text-xl font-semibold w-[100%]'>{displayData.companyName}</p>
                                        <p className='text-center w-[100%]'>{displayData.netProfitPercent}%</p>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default History
