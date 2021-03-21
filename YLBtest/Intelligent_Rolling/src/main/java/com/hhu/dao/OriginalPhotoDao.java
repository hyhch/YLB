package com.hhu.dao;

import com.hhu.model.OriginalPhoto;
import com.hhu.model.ProcessedPhoto;

import java.util.List;

public interface OriginalPhotoDao {
    List<OriginalPhoto> selectData();
    List<ProcessedPhoto> selectProcessedData();
}
