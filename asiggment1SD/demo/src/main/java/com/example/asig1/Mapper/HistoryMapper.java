package com.example.asig1.Mapper;


import com.example.asig1.DTO.MeasurementDTO;
import com.example.asig1.Model.History;

import java.text.ParseException;
import java.text.SimpleDateFormat;

public class HistoryMapper {
    public static History toHistoryfromMeasurementDTO(MeasurementDTO measurementDTO) throws ParseException{
        SimpleDateFormat formatter =new SimpleDateFormat("yyyy-MM-dd  HH:mm:ss");
        History history=new History();
        history.setDeviceId(measurementDTO.getId());
        history.setDate((formatter).parse(measurementDTO.getDate()));
        history.setMeasurement(measurementDTO.getMeasurement());
        return history;
    }
}
