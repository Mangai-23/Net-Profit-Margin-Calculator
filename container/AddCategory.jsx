import React, { useState, useEffect } from 'react';
import { Dialog } from "@mui/material";
import Image from 'next/image';
import Trash from '../public/icons/trash.png';
import PouchDB from 'pouchdb'
import Close from '../public/icons/close.svg';

const AddCategory = ({onClose}) => {
    const [val,setVal]=useState('')
    const [pouchDbStatus,setPouchDbStatus]=useState(null)
    const [addCategoryBtn, setAddCategoryBtn] = useState({
        disabled: true,
        cursor: 'not-allowed',
        opacity: 0.5
    });
    const [presentDocument,setPresentDocument]=useState([])
    // const onClosePopUp = () => {
    //     console.log(props);
    //     // props.closeCategoryPopUp(false);
    // };

    const handleChange = (e) => {
        if(e.target.value!==''){
            setVal(e.target.value)
            setAddCategoryBtn({...addCategoryBtn,disabled:false,cursor:'pointer'})
        }
        else{
            setAddCategoryBtn({...addCategoryBtn,disabled:true,cursor:'not-allowed'})
        }
    };

    const addCategory = async () => {
        const pouchdb = new PouchDB('addCategory');
        const docId = 'category_' + Date.now();

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
            if(previousDocId===null){
                previousDocId=docId
            }
            const doc = await pouchdb.get(previousDocId);

            const document = doc.data || [];
            document.push(val); // Assuming val is defined elsewhere
            await pouchdb.put({ _id: docId, data: document });
            console.log('Document updated successfully');
            console.log('Previous document ID:', previousDocId); // Log previous document ID
            setVal('');
            const docForDisplay=await pouchdb.get(docId)
            setPresentDocument(docForDisplay.data)
        } catch (err) {
            if (err.status === 404) {
                // Document doesn't exist, create a new one
                const document = [val]; // Assuming val is defined elsewhere
                await pouchdb.put({ _id: docId, data: document });
                console.log('Document created successfully');
                setVal('');
            } else if (err.name === 'conflict') {
                // Document update conflict, retry the update
                console.warn('Document update conflict, retrying...');
                await addCategory(); // Retry the update
            } else {
                console.error('Document updation error:', err); // Log error for debugging
                console.log('Original error message:', err.message); // Log original error message
            }
        }
    };
    const deleteVal = async (index) => {
        const filteredVal = presentDocument.filter((val, ind) => ind !== index);
        setPresentDocument(filteredVal);
    
        const pouchdb = new PouchDB('addCategory');
        const docId = 'category_' + Date.now(); // Ensure docId is unique
    
        try {
            await pouchdb.put({ _id: docId, data: filteredVal });
            console.log('Document updated successfully');
        } catch (err) {
            console.error('Error updating document:', err);
        }
    };
    
    useEffect(() => {
        const fetchData = async () => {
            const pouchdb = new PouchDB('addCategory');
            try {
                const allDocs = await pouchdb.allDocs({
                    include_docs: true,
                    descending: true, // Sort documents in descending order
                    limit: 2 // Limit to the top 2 documents
                });
    
                let prev = [];
                if (allDocs.rows.length > 0) {
                    prev = allDocs.rows[0].doc.data;
                }
                setPresentDocument(prev);
            } catch (err) {
                console.error('Error fetching documents:', err);
            }
        };
    
        fetchData();
    }, []);
    
    
    return (
        <Dialog
            fullWidth={false}
            maxWidth="md"
            open={true}
            PaperProps={{
                style: {
                    minWidth: "30%",
                    maxWidth: "90%",
                    height: "57vh",
                },
            }}
        >
            <div>
                <div className="p-3 flex justify-between items-center border-b-2">
                    <h1 className="font-[interSemiBold] text-[20px]">Add New Category</h1>
                    <Image
                        width="35"
                        height="15"
                        className="h-[25px] cursor-pointer"
                        src={Close}
                        onClick={onClose}
                        alt="Close Icon"
                    />
                </div>
                <input type='text' className='border-2 border-slate-850 w-[90%] rounded-lg pl-3 h-9 focus:outline-none m-2' onChange={handleChange} value={val} />
                <button onClick={addCategory} className={`w-[30%] bg-[hsl(166,75%,37%)] h-9 ml-2 mt-1 rounded-md text-white cursor-${addCategoryBtn.cursor} sm:w-[40%]} disabled={addCategoryBtn.disabled`}>Add Category</button>
                <ul className='ml-5 mt-1 w-[90%] text-lg overflow-y-auto'>
                    {
                        presentDocument.map((val, index) => (
                            <div className='flex mt-1' key={index}>
                                <li>{val}</li>
                                <Image 
                                    width='35'
                                    height='15'
                                    className='h-[25px] cursor-pointer ml-auto'
                                    src={Trash}
                                    alt='Trash Icon'
                                    onClick={() => deleteVal(index)}
                                />
                            </div>
                           
                        ))
                    }
                </ul>

            </div>
        </Dialog>
    );
}

export default AddCategory;

AddCategory.jsx