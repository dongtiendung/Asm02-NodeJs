import { format } from 'date-fns';

export const userColumns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 250,
        renderCell: (params) => {
            return <div className="cellWithImg">{params.row._id}</div>;
        },
    },
    {
        field: 'user',
        headerName: 'User',
        width: 100,
        renderCell: (params) => {
            return <div className="cellWithImg">{params.row.username}</div>;
        },
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 230,
        renderCell: (params) => {
            return <div className="cellWithImg">{params.row.email}</div>;
        },
    },
    {
        field: 'phone',
        headerName: 'Phone',
        width: 230,
        renderCell: (params) => {
            return <div className="cellWithImg">{params.row.phoneNumber}</div>;
        },
    },
];
export const hotelColumns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 230,
        renderCell: (params) => {
            return <div className="cellWithImg">{params.row._id}</div>;
        },
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 230,
    },
    {
        field: 'type',
        headerName: 'Type',
        width: 60,
    },
    {
        field: 'title',
        headerName: 'Title',
        width: 230,
    },
    {
        field: 'city',
        headerName: 'City',
        width: 100,
    },
];
export const roomColumns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 230,
        renderCell: (params) => {
            return <div className="cellWithImg">{params.row._id}</div>;
        },
    },
    {
        field: 'title',
        headerName: 'Title',
        width: 230,
    },
    {
        field: 'desc',
        headerName: 'Description',
        width: 200,
    },
    {
        field: 'price',
        headerName: 'Price',
        width: 100,
    },
    {
        field: 'maxPeople',
        headerName: 'Max People',
        width: 100,
    },
];
export const transactionColumns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 210,
        renderCell: (params) => {
            return <div className="cellWithImg">{params.row._id}</div>;
        },
    },
    {
        field: 'user',
        headerName: 'User',
        width: 60,
    },
    {
        field: 'hotel',
        headerName: 'Hotel',
        width: 200,
    },
    {
        field: 'room',
        headerName: 'Room',
        width: 100,
        renderCell: (params) => {
            return <div className="cellWithImg">{`${params.row.room}`}</div>;
        },
    },
    {
        field: 'startDate',
        headerName: 'Date',
        width: 200,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">{`${format(new Date(params.row.startDate), 'MM/dd/yyyy')} - ${format(
                    new Date(params.row.endDate),
                    'MM/dd/yyyy'
                )}`}</div>
            );
        },
    },

    {
        field: 'price',
        headerName: 'Price',
        width: 70,
    },
    {
        field: 'payment',
        headerName: 'Payment Method',
        width: 100,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 100,
    },
];
