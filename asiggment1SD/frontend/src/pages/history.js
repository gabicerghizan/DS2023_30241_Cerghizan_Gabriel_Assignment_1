import React, { useState } from "react";
import HistoryTable from "../components/tables/historyTable";
import HistoryChart from "../components/charts/historyChart";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function History() {
  const [date, setDate] = useState(new Date());

  return (
    <Container>
      <div className="mx-5 mt-6 flex flex-row justify-start space-x-3">
        <div className="h-10 w-3 bg-[#0DE6AC]"></div>
        <div className="w-3 text-center font-sans text-xl font-bold">
          <h1>History</h1>
        </div>
      </div>
      <div className="float-left">
        <DatePicker
          className="bold"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd-MM-yyyy"
        />
      </div>
      <Row>
        <Col>
          <HistoryTable date={date} />
        </Col>
        <Col>
          <HistoryChart date={date} />
        </Col>
      </Row>
    </Container>
  );
}

export default History;
