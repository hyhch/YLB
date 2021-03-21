package com.hhu.dao;

import com.hhu.model.GranularWarning;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

/**
 * @author ：jin
 * @description: 描述:
 * @date ：Created in 2021/2/4 20:15
 */
@Repository
public interface WarningDao {
    Long getDensityWarning();

    int updateDensityWarning(Long newVal);

    GranularWarning getGranularWarning();

    int updateGranularWarning(@Param("newVal_x") Long newVal_x,
                              @Param("newVal_y_min")Long newVal_y_min,
                              @Param("newVal_y_max")Long newVal_y_max);

}
