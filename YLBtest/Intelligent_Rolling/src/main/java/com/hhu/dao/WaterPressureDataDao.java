package com.hhu.dao;

import com.hhu.model.WaterPressureData;


import java.util.List;

public interface WaterPressureDataDao {
    List<WaterPressureData> select_wt_Data();
//    List<ProcessedPhoto> selectProcessedData();
}
