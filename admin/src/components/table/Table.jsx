import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import './table.scss';
import useFetch from '../../hooks/useFetch';
import { format } from 'date-fns';

const List = () => {
    const { data } = useFetch(`/transaction/latest`);

    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell">ID</TableCell>
                        <TableCell className="tableCell">User</TableCell>
                        <TableCell className="tableCell">Hotel</TableCell>
                        <TableCell className="tableCell">Room</TableCell>
                        <TableCell className="tableCell">Date</TableCell>
                        <TableCell className="tableCell">Price</TableCell>
                        <TableCell className="tableCell">Payment Method</TableCell>
                        <TableCell className="tableCell">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell className="tableCell">{row._id}</TableCell>
                            <TableCell className="tableCell">
                                <div className="cellWrapper">{row.user}</div>
                            </TableCell>
                            <TableCell className="tableCell">{row.hotel}</TableCell>
                            <TableCell className="tableCell">{`${row.room}`}</TableCell>
                            <TableCell className="tableCell">{`${format(new Date(row.startDate), 'MM/dd/yyyy')}- ${format(
                                new Date(row.endDate),
                                'MM/dd/yyyy'
                            )}`}</TableCell>
                            <TableCell className="tableCell">${row.price}</TableCell>
                            <TableCell className="tableCell">{row.payment}</TableCell>
                            <TableCell className="tableCell">
                                <span className={`status ${row.status}`}>{row.status}</span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default List;
