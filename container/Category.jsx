import React, { useState,useEffect } from 'react';
import Plus from '../public/icons/plus.jpg';
import Image from 'next/image';
import AddCategory from './Category';
const Category = ({onData}) => {
    const [isAdd, setIsAdd] = useState(false);
    const [categories, setCategories] = useState([]);
    const addCategory = () => {
        setIsAdd(true);
    };

    const fixCategories = (categoriesList) => {
        setCategories(categoriesList);
    };
    useEffect(()=>{
        onData({
            categories
        })
    },[categories])
    return (
        <div className='bg-[#2F2B52] pt-2'>
            {isAdd && <AddCategory closeCategoryPopUp={() => setIsAdd(false)} sendCategoryList={fixCategories} />}
            <button className='underline underline-offset-2 decoration-2 text-[hsl(166,75%,37%)] flex justify-center items-center rounded-md p-2 px-2 cursor-pointer bg-white ml-[7%]' onClick={addCategory}>
                Add New Category
                <Image src={Plus} className='ml-1' width='17' height='17' alt="Plus Icon" />
            </button>
        </div>
    );
}

export default Category;

