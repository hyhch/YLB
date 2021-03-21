package com.hhu.service;

import com.hhu.dao.WarningDao;
import com.hhu.model.GranularWarning;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author ：jin
 * @description:
 * @date ：Created in 2021/2/4 20:15
 */
@Service
public class WarningServiceImpl implements WarningService {

    @Autowired
    private WarningDao warningDao;

    @Override
    public Long getDensityWarning() {
        return warningDao.getDensityWarning();
    }

    @Override
    public int updateDensityWarning(Long newVal) {
        return warningDao.updateDensityWarning(newVal);
    }

    @Override
    public GranularWarning getGranularWarning() {
        return warningDao.getGranularWarning();
    }

    @Override
    public int updateGranularWarning(Long newVal_x,Long newVal_y_min,Long newVal_y_max) {
        return warningDao.updateGranularWarning(newVal_x,newVal_y_min,newVal_y_max);
    }
}
