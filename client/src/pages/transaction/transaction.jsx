import { useContext } from 'react';
import { Table } from 'reactstrap';
import { format } from 'date-fns';

import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import { AuthContext } from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';
import './transaction.scss';

const Transaction = () => {
    const { user } = useContext(AuthContext);
    const { data } = useFetch(`/transaction/${user._id}`);

    return (
        <div>
            <Navbar />
            <Header type="list" />

            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Hotel</th>
                        <th>Room</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Payment Method</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((e, i) => {
                        return (
                            <tr key={i}>
                                <td className='number'>0{i + 1}</td>
                                <td>{e.hotel}</td>
                                <td>{`${e.room}`}</td>
                                <td>{`${format(new Date(e.startDate), 'MM/dd/yyyy')}- ${format(
                                    new Date(e.endDate),
                                    'MM/dd/yyyy'
                                )}`}</td>
                                <td>${e.price}</td>
                                <td>{e.payment}</td>
                                <td>
                                    {e.status === 'Booked' ? (
                                        <span className="booked">{e.status}</span>
                                    ) : e.status === 'Checkin' ? (
                                        <span className="checkin">{e.status}</span>
                                    ) : (
                                        <span className="checkout">{e.status}</span>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};
export default Transaction;
