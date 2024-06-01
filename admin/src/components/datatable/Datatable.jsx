import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const [list, setList] = useState([]);

  const { data } = useFetch(`/${path}`);

  const handleDelete = async (id) => {
    try {
      // Kiểm tra điều kiện trước khi xóa
      if (id === "room") {
        await axios.delete(`/${path}/${id}`);
        setList(list.filter((item) => item._id !== id));
      } else {
        const checkResponse = await axios.delete(`/${path}/${id}`);
        if (checkResponse.data) {
          await axios.delete(`/${path}/${id}`);
          setList(list.filter((item) => item._id !== id));
        } else {
          alert("Cannot delete this item because it has related transactions.");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setList(data);
  }, [data]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {path !== "user" && (
              <Link
                to={`/${path}/${params.row._id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="viewButton">Edit</div>
              </Link>
            )}
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add new {`${path}`}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
