package com.hhu.service;

import com.hhu.model.OriginalPhoto;
import com.hhu.model.ProcessedPhoto;

import java.io.IOException;
import java.util.List;

public interface OriginalPhotoService {
    List<OriginalPhoto> selectData();
    List<ProcessedPhoto> selectProcessedData();

    byte[] getImage(String url) throws IOException;
}
