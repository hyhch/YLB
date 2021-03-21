package com.hhu.service;

/**
 * @author ：jin
 * @description: 描述:
 * @date ：Created in 2021/2/16 19:48
 */
public interface HomePageService {

    int getTotalNum(int layNum);

    String getLatestDate(String stm, String etm);

    int getMaxGrading(String stm, String etm);

    int getMaxDensity(String stm, String etm);

    int getGradingProcessNum(String stm, String etm);

    int getLithologyProcessNum(String stm, String etm);

    int getWeatheringProcessNum(String stm, String etm);

    int getCurrentLay();

}
