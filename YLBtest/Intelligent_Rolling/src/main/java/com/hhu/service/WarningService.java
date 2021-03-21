package com.hhu.service;

import com.hhu.model.GranularWarning;

/**
 * @author ：jin
 * @description:
 * @date ：Created in 2021/2/4 20:14
 */
public interface WarningService {
    Long getDensityWarning();

    int updateDensityWarning(Long newVal);

    GranularWarning getGranularWarning();

    int updateGranularWarning(Long newVal_x,Long newVal_y_min,Long newVal_y_max);
}
