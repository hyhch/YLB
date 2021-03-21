package com.hhu.service;

import com.hhu.dao.AccelerationDataDao;
import com.hhu.model.AccelerationData;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class AccelerationDataServiceImpl implements AccelerationDataService {
    @Resource
    private AccelerationDataDao accelerationDao;

    @Override
/*    public List<OriginalPhoto> selectData() {
        List<OriginalPhoto> photo = photoDao.selectData() ;
        if (photo != null)
            return photo;
        return null;
    }*/
/*    public List<OBSERVED_DATA> selectData() {
        List<OBSERVED_DATA> observe = obeservedDao.selectData() ;
        if (observe != null)
            return observe;
        return null;
    }*/
    public List<AccelerationData> select_ac_Data() {
        List<AccelerationData> acceleration = accelerationDao.select_ac_Data() ;
        if (acceleration != null)
            return acceleration;
        return null;
    }

 /*   @Override
    public List<ProcessedPhoto> selectProcessedData() {
        List<ProcessedPhoto> photo = photoDao.selectProcessedData();
        if (photo != null)
            return photo;
        return null;
    }*/

/*    @Override
    public byte[] getImage(String url) throws IOException {
        File file = new File("D:/test_img/" + url);
        FileInputStream inputStream = new FileInputStream(file);
        byte[] bytes = new byte[inputStream.available()];
        inputStream.read(bytes, 0, inputStream.available());
        return bytes;
    }*/
}
