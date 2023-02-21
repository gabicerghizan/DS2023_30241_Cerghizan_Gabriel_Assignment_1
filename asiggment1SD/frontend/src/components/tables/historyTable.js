import React, { useMemo, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { Button, Table } from "react-bootstrap";
import History from "../../services/History";
import AuthService, { refreshPage } from "../../services/AuthService";
import Moment from "moment";

function HistoryTable(date) {
  const [data, setData] = useState([]);
  const rerender = React.useReducer(() => ({}), {})[99999];
  let counter = 0;
  let selectedDate = Moment(date.date).format("YYYY-MM-DD");

  useMemo(() => {
    const getHistoryFromDevice = () => {
      let path = window.location.pathname;

      let deviceId = path.substring(9, 15);

      History.getAllByDeviceIdAndDate(deviceId, selectedDate)
        .then((response) => {
          setData(response.data);
        })
        .catch(function (error) {
          if (500 === error.response.status) {
            AuthService.refreshToken().then((response) => {
              localStorage.setItem("access_token", response.data.access_token);
              localStorage.setItem(
                "refresh_token",
                response.data.refresh_token
              );
            });
            History.getAllByDeviceIdAndDate(deviceId, selectedDate).then(
              (response) => {
                setData(response.data);
              }
            );
          }
        });
    };
    getHistoryFromDevice();
  }, [selectedDate]);

  function deleteHistory(id) {
    History.deleteHistoryById(id)
      .then((response) => {
        let path = window.location.pathname;

        let deviceId = path.substring(9, 15);

        History.getAll(deviceId).then((response) => {
          setData(response.data);
        });

        refreshPage();
      })
      .catch(function (error) {
        if (500 === error.response.status) {
          AuthService.refreshToken().then((response) => {
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
          });
          History.deleteHistoryById(id).then((response) => {
            let path = window.location.pathname;

            let deviceId = path.substring(9, 15);

            History.getAll(deviceId).then((response) => {
              setData(response.data);
            });

            refreshPage();
          });
        }
      });
  }

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Device ID</th>
            <th>Date</th>
            <th>Measurement</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.id}>
                <td>{++counter}</td>
                <td>{item.deviceId}</td>
                <td>{item.date.substring(0, 16).replace("T", " ")}</td>
                <td>{item.measurement}</td>
                <td>
                  <Button
                    variant="outline-dark"
                    onClick={() => deleteHistory(item.id) && rerender()}
                  >
                    <BsFillTrashFill />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default HistoryTable;
