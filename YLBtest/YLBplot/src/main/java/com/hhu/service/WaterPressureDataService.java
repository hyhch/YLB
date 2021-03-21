package com.hhu.service;

import com.hhu.model.WaterPressureData;

import java.util.List;

public interface WaterPressureDataService {
    List<WaterPressureData> select_wt_Data();
//    List<ProcessedPhoto> selectProcessedData();

//    byte[] getImage(String url) throws IOException;
}
