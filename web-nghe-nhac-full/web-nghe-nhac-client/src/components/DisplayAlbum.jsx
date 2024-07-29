import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'

const DisplayAlbum = ({ album }) => {

    const { id } = useParams();
    const [albumData, setAlbumData] = useState("");
    const { playWithId, albumsData, songsData } = useContext(PlayerContext);

    useEffect(() => {
        albumsData.map((item) => {
            if (item._id == id) {
                setAlbumData(item);
            }
        })
    }, []);

    return albumData ? (
        <>
            <Navbar />
            <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
                <img src={albumData.image} alt='' />
                <div className='flex flex-col'>
                    <p className='text-white'>Playlist</p>
                    <h2 className='text-5xl text-white font-bold mb-4 md:text-7xl'>{albumData.name}</h2>
                    <h4 className='text-white'>{albumData.desc}</h4>
                    <p className='text-white mt-1'>
                        <img className='inline-block w-5' src={assets.spotify_logo} />
                        <b className='text-white'>Spotify</b>
                        • 1,321,324 likes
                        • <b className='text-white'>50 songs,</b>
                        about 2hr 30 min
                    </p>
                </div>
            </div>
            <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
                <p><b className='mr-4'>#</b>Title</p>
                <p>Album</p>
                <p className='hidden sm:block'>Date Added</p>
                <img className='m-auto w-4' src={assets.clock_icon} />
            </div>
            <hr />
            {
                songsData.filter((item) => item.album === album.name).map((item, index) => (
                    <div onClick={() => playWithId(item._id)} key={index} className='grid grid-cols-3 sm:grid-cols-4 gap-3 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'>
                        <p className='text-white'>
                            <b className='mr-4 text-[#a7a7a7]' >{index + 1}</b>
                            <img className='inline w-10 mr-5' src={item.image} alt='' />
                        </p>
                        <p className='text-[15px]'>{albumData.name}</p>
                        <p className='text-[15px] hidden sm:block' >5 days ago</p>
                        <p className='text-[15px] text-center'>{item.duration}</p>
                    </div>
                ))
            }
        </>
    ) : null;
}

export default DisplayAlbum