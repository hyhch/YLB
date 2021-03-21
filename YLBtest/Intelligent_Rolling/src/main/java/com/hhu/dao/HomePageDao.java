package com.hhu.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

/**
 * @author ：jin
 * @description: 描述:
 * @date ：Created in 2021/2/16 19:49
 */
@Repository
public interface HomePageDao {

    int getTotalNum(int layNum);

    String getLatestDate(@Param("stm") String stm,@Param("etm") String etm);

    int getMaxGrading(@Param("stm") String stm,@Param("etm") String etm);

    int getMaxDensity(@Param("stm") String stm,@Param("etm") String etm);

    int getGradingProcessNum(@Param("stm") String stm,@Param("etm") String etm);

    int getLithologyProcessNum(@Param("stm") String stm,@Param("etm") String etm);

    int getWeatheringProcessNum(@Param("stm") String stm,@Param("etm") String etm);

    int getCurrentLay();
}
