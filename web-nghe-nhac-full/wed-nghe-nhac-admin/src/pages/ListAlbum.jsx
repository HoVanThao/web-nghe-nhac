import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { url } from '../App';
import { toast } from 'react-toastify';

const ListAlbum = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchAlbums();
    }, []);

    const fetchAlbums = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            if (response.data.success) {
                setData(response.data.albums); // Ensure this is the correct key
            } else {
                toast.error("Failed to fetch album");
            }
        } catch (error) {
            toast.error("Error Occurred");
        }
    }

    const removeAlbum = async (id) => {
        try {
            const response = await axios.post(`${url}/api/album/remove`, { id });
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchAlbums();
            } else {
                toast.error(response.data.message || "Failed to remove album");
            }
        } catch (error) {
            toast.error("Error Occurred while removing");
        }
    }

    return (
        <div>
            <p>All Album List</p>
            <br />
            <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
                <b>Image</b>
                <b>Name</b>
                <b>Description</b>
                <b>Album Colour</b>
                <b>Action</b>
            </div>
            {Array.isArray(data) && data.map((item, index) => {
                return (
                    <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
                        <img className='w-12' src={item.image} alt="" />
                        <p>{item.name}</p>
                        <p>{item.desc}</p>
                        <input type='color' value={item.bgColour} readOnly />
                        <p className='cursor-pointer' onClick={() => removeAlbum(item._id)}>x</p>
                    </div>
                );
            })}
        </div>
    );
}

export default ListAlbum;
