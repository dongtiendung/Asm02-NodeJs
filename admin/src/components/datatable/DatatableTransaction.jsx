import './datatable.scss';
import { DataGrid } from '@mui/x-data-grid';

import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import useFetch from '../../hooks/useFetch';

const DatatableTransaction = ({ columns }) => {
    const location = useLocation();
    const path = location.pathname.split('/')[1];
    
    const [list, setList] = useState([]);

    const { data } = useFetch(`/${path}`);

    useEffect(() => {
        setList(data);
    }, [data]);

    return (
        <div className="datatable">
            <div className="datatableTitle">All {`${path}`}</div>
            <DataGrid
                className="datagrid"
                rows={list}
                columns={columns}
                // pageSize={8}
                // rowsPerPageOptions={[9]}
                checkboxSelection
                getRowId={(row) => row._id}
            />
        </div>
    );
};

export default DatatableTransaction;
