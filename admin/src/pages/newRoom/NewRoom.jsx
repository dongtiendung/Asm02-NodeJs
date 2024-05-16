import './NewRoom.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

import { useState } from 'react';
import { roomInputs } from '../../formSource';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewRoom = () => {
    const navigate = useNavigate();
    const [info, setInfo] = useState({});
    const [hotelId, setHotelId] = useState();
    const [room, setRoom] = useState([]);

    const { data } = useFetch('/hotel');
    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const roomNumbers = room.split(',');
        try {
            await axios.post(`/room/${hotelId}`, { ...info, roomNumbers: roomNumbers });
            navigate('/room');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Add New Room</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form>
                            {roomInputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input
                                        id={input.id}
                                        onChange={handleChange}
                                        type={input.type}
                                        placeholder={input.placeholder}
                                    />
                                </div>
                            ))}
                            <div className="selectHotels">
                                <label>Chose a hotel</label>
                                <select id="hotelId" onChange={(e) => setHotelId(e.target.value)}>
                                    <option value="">Chose a hotel</option>
                                    {data.map((hotel) => (
                                        <option key={hotel._id} value={hotel._id}>
                                            {hotel.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="formInput">
                                <label>Rooms</label>
                                <textarea onChange={(e) => setRoom(e.target.value)} />
                            </div>
                            <button onClick={handleClick}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewRoom;
