package com.hhu.service;

import com.hhu.dao.ObservedDataDao;
import com.hhu.model.ObservedData;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class ObservedDataServiceImpl implements ObservedDataService {
    @Resource
    private ObservedDataDao obeservedDao;

    @Override

    public List<ObservedData> select_ob_Data() {
        List<ObservedData> observe = obeservedDao.select_ob_Data() ;
        if (observe != null)
            return observe;
        return null;
    }

}
