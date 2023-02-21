import React, { useState, useMemo } from "react";
import History from "../../services/History";
import { CanvasJSChart } from "canvasjs-react-charts";
import AuthService from "../../services/AuthService";
import Moment from "moment";

function HistoryChart(date) {
  const [data, setData] = useState([]);

  let selectedDate = Moment(date.date).format("YYYY-MM-DD");
  useMemo(() => {
    const getHistoryFromDevice = () => {
      let path = window.location.pathname;

      let deviceId = path.substring(9, 15);

      History.getAllByDeviceIdAndDate(deviceId, selectedDate)
        .then((response) => {
          let points = [];
          for (var i = 0; i < response.data.length; i++) {
            points.push({
              x: new Date(
                response.data[i].date.substring(0, 16).replace("T", " ")
              ),
              y: response.data[i].measurement,
            });
          }

          setData(points);
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
                let points = [];
                for (var i = 0; i < response.data.length; i++) {
                  points.push({
                    x: new Date(
                      response.data[i].date.substring(0, 16).replace("T", " ")
                    ),
                    y: response.data[i].measurement,
                  });
                }

                setData(points);
              }
            );
          }
        });
    };
    getHistoryFromDevice();
  }, [selectedDate]);

  const options = {
    theme: "light2",
    title: {
      text: "Energy Consumption",
    },
    axisY: {
      title: "Consumption",
      prefix: "W",
    },
    data: [
      {
        type: "line",
        xValueFormatString: "YYYY-MM-DD HH:MM",
        yValueFormatString: "#,##0 Units",
        dataPoints: data,
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
}

export default HistoryChart;
