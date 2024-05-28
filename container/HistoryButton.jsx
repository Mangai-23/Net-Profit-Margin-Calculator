import React,{useState} from 'react'
import History from './History'
import { HiOutlineClock} from 'react-icons/hi'; 
import PouchDb from 'pouchdb'
const HistoryButton = ({onData}) => {
    const [isHistory, setIsHistory] = useState(false);
    const [propsForHistory,setPropsForHistory]=useState([])
    const openHistory = async() => {
        setIsHistory(true)
        const pouchdb=new PouchDb('netProfit')
        try{
            const allDocs = await pouchdb.allDocs({
                include_docs: true,
                descending: true
            });
            const arr=allDocs.rows.map(input => {return({[input.doc._id]:input.doc.data})})
            setPropsForHistory(arr)
        }
        catch(err){
            console.log('Error : ',err)
        }
    }
    const handleEdit = (data) => {
        onData({
            propsForEdit:data
        })
    }
  return (
    <div>
        {isHistory && <History closeHistoryPopUp={() => setIsHistory(false)} propsData={propsForHistory} onProps={handleEdit} />}
        <button className='flex items-center space-x-2 bg-blue-500 text-white px-5 py-2 rounded-lg' onClick={openHistory} >
        <HiOutlineClock className="w-6 h-6" />
        <span>History</span>
        </button>
    </div>
  )
}

export default HistoryButton

