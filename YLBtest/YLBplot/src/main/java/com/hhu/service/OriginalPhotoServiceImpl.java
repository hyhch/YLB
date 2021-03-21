package com.hhu.service;

import com.hhu.dao.OriginalPhotoDao;
import com.hhu.model.OriginalPhoto;
import com.hhu.model.ProcessedPhoto;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

@Service
public class OriginalPhotoServiceImpl implements OriginalPhotoService {
    @Resource
    private OriginalPhotoDao photoDao;

    @Override
    public List<OriginalPhoto> selectData() {
        List<OriginalPhoto> photo = photoDao.selectData() ;
        if (photo != null)
            return photo;
        return null;
    }

    @Override
    public List<ProcessedPhoto> selectProcessedData() {
        List<ProcessedPhoto> photo = photoDao.selectProcessedData();
        if (photo != null)
            return photo;
        return null;
    }

    @Override
    public byte[] getImage(String url) throws IOException {
        File file = new File("D:/test_img/" + url);
        FileInputStream inputStream = new FileInputStream(file);
        byte[] bytes = new byte[inputStream.available()];
        inputStream.read(bytes, 0, inputStream.available());
        return bytes;
    }
}
