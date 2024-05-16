import { DateRange } from 'react-date-range';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import format from 'date-fns/format';

import { AuthContext } from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';
import './Reserve.css';

const Reserve = ({ hotelId, cheapestPrice }) => {
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const [dataInput, setDataInput] = useState({
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        identityCardNumber: user._id,
    });
    const [selectRooms, setSelectRooms] = useState([]);
    const [priceRoom, setPriceRoom] = useState(0);
    const [datesRange, setDatesRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ]);
    const [payment, setPayment] = useState('');

    const { data } = useFetch(`/hotel/room/${hotelId}`);
    const { data: hotel } = useFetch(`/hotel/${hotelId}`);
    // console.log(data);

    const handleChangeInput = (e) => {
        const newData = { ...dataInput };
        newData[e.target.name] = e.target.value;

        setDataInput(newData);
    };

    const handleCheck = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;

        setSelectRooms(checked ? [...selectRooms, value] : selectRooms.filter((item) => item !== value));
    };
    // console.log(selectRooms);

    //Tính số ngày đặt phòng
    const MILISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    const dayDifference = (date1, date2) => {
        const start = new Date(date1);
        const end = new Date(date2);
        const timeDiff = Math.abs(start.getTime() - end.getTime());
        const diffDays = Math.ceil(timeDiff / MILISECONDS_PER_DAY);

        return diffDays;
    };
    const days = dayDifference(datesRange[0].endDate, datesRange[0].startDate);

    //////////////////////////////////////////////////////
    const handlePay = (e) => {
        setPayment(e.target.value);
    };

    const handleUpdatePrice = (e) => {
        setPriceRoom(e);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const start = format(datesRange[0].startDate, 'yyyy-MM-dd');
        const end = format(datesRange[0].endDate, 'yyyy-MM-dd');

        try {
            const res = await axios.post('http://localhost:5000/api/transaction', {
                user: user._id,
                hotel: hotel.title,
                room: selectRooms,
                startDate: start,
                endDate: end,
                price: (days + 1) * priceRoom * selectRooms.length,
                payment: payment,
                status: 'Booked',
            });
            // console.log(res.data);
        } catch (error) {
            console.log(error);
        }

        navigate('/transaction');
    };

    return (
        <div className="reserveContainer">
            <Form className="Formbook" onSubmit={handleSubmit}>
                <div className="reDetails ">
                    <div>
                        <h1> Date</h1>
                        <DateRange
                            editableDateInputs={true}
                            onChange={(item) => setDatesRange([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={datesRange}
                        />
                    </div>

                    <div className="reinfo">
                        <h1> Reserve info</h1>
                        <div className="forminput">
                            <FormGroup className="input">
                                <Label for="fullname"> Your Fullname:</Label>
                                <Input
                                    onChange={handleChangeInput}
                                    className="itemInput"
                                    id="fullname"
                                    name="fullname"
                                    placeholder="fullname"
                                    type="text"
                                    required
                                    value={dataInput.fullname}
                                />
                            </FormGroup>
                            <FormGroup className="input">
                                <Label for="email"> Your Email:</Label>
                                <Input
                                    onChange={handleChangeInput}
                                    className="itemInput"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                    required
                                    value={dataInput.email}
                                />
                            </FormGroup>
                            <FormGroup className="input">
                                <Label for="phoneNumber">Your phone number:</Label>
                                <Input
                                    onChange={handleChangeInput}
                                    className="itemInput"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    placeholder="phone"
                                    type="number"
                                    required
                                    value={dataInput.phoneNumber}
                                />
                            </FormGroup>
                            <FormGroup className="input">
                                <Label for="card">Yours Identity CardNumber:</Label>
                                <Input
                                    onChange={handleChangeInput}
                                    className="itemInput"
                                    id="identityCardNumber"
                                    name="identityCardNumber"
                                    placeholder="Identity CardNumber"
                                    type="text"
                                    required
                                    value={dataInput.identityCardNumber}
                                />
                            </FormGroup>
                        </div>
                    </div>
                </div>

                <div>
                    <h1>Select Room</h1>
                    <div className="roomscontainer">
                        {data?.map((item, i) => (
                            <FormGroup className="rItem" key={i} onClick={() => handleUpdatePrice(item?.price)}>
                                <div className="rItemInfo">
                                    <div className="rTitle">{item?.title}</div>
                                    <div className="rDesc">{item?.desc} </div>
                                    <div className="rMax">Max people : {item?.maxPeople} </div>
                                    <div className="rPrice">
                                        <b>${item?.price}</b>
                                    </div>
                                </div>
                                {item?.roomNumbers.map((number, i) => (
                                    <div className="rooms" key={i}>
                                        <Label>{number}</Label>
                                        <Input type="checkbox" value={Number(number)} onChange={handleCheck} />
                                    </div>
                                ))}
                            </FormGroup>
                        ))}
                    </div>
                </div>

                <div>
                    <strong className="bill">{`Total Bill :$ ${(days + 1) * priceRoom * selectRooms.length}`}</strong>
                    <div className="book">
                        <FormGroup>
                            <Input onChange={handlePay} id="payment" name="payment" type="select" className="select" required>
                                <option>Select Payment Method </option>
                                <option>Cash</option>
                                <option>Credit Card</option>
                            </Input>
                        </FormGroup>
                        <button className="buttonBook">Reserve Now!</button>
                    </div>
                </div>
            </Form>
        </div>
    );
};
export default Reserve;
