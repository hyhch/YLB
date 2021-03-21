package com.hhu.dao;

import com.hhu.model.ObservedData;
//import com.hhu.model.OriginalPhoto;
//import com.hhu.model.ProcessedPhoto;

import java.util.List;

public interface ObservedDataDao {
    List<ObservedData> select_ob_Data();
//    List<ProcessedPhoto> selectProcessedData();
}
