package com.hhu.service;

import com.hhu.dao.HomePageDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author ：jin
 * @description:
 * @date ：Created in 2021/2/16 19:48
 */
@Service
public class HomePageServiceImpl implements HomePageService {

    @Autowired
    private HomePageDao homePageDao;

    @Override
    public int getTotalNum(int layNum) {
        return homePageDao.getTotalNum(layNum);
    }

    @Override
    public String getLatestDate(String stm, String etm) {
        return homePageDao.getLatestDate(stm, etm);
    }

    @Override
    public int getMaxGrading(String stm, String etm) {
        return homePageDao.getMaxGrading(stm, etm);
    }

    @Override
    public int getMaxDensity(String stm, String etm) {
        return homePageDao.getMaxDensity(stm, etm);
    }

    @Override
    public int getGradingProcessNum(String stm, String etm) {
        return homePageDao.getGradingProcessNum(stm,etm);
    }

    @Override
    public int getLithologyProcessNum(String stm, String etm) {
        return homePageDao.getLithologyProcessNum(stm,etm);
    }

    @Override
    public int getWeatheringProcessNum(String stm, String etm) {
        return homePageDao.getWeatheringProcessNum(stm,etm);
    }

    @Override
    public int getCurrentLay() {
        return homePageDao.getCurrentLay();
    }
}
