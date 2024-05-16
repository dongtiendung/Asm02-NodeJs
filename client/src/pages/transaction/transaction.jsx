import { format } from "date-fns";
import { Table } from "reactstrap";
import React, { useContext } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import "./transaction.scss";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Transaction = () => {
  const { user } = useContext(AuthContext);
  const { data } = useFetch(`/transaction/${user._id}`);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <h2>Your Transactions:</h2>
      <Table bordered responsive striped>
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
                <td>
                  <span className="number">0{i + 1}</span>
                </td>
                <td>{e.hotel}</td>
                <td>{`${e.room}`}</td>
                <td>{`${format(new Date(e.startDate), "MM/dd/yyyy")} - ${format(
                  new Date(e.endDate),
                  "MM/dd/yyyy"
                )}`}</td>
                <td>${e.price}</td>
                <td>{e.payment}</td>
                <td className="status">
                  <span className={`status ${e.status}`}>{e.status}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <MailList />
      <Footer />
    </div>
  );
};
export default Transaction;
