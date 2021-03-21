package com.hhu.model;

/**
 * @author ：jin
 * @description:
 * @date ：Created in 2021/2/4 21:05
 */
public class GranularWarning {
    private Long x;
    private Long y_min;
    private Long y_max;

    public Long getX() {
        return x;
    }

    public void setX(Long x) {
        this.x = x;
    }

    public Long getY_min() {
        return y_min;
    }

    public void setY_min(Long y_min) {
        this.y_min = y_min;
    }

    public Long getY_max() {
        return y_max;
    }

    public void setY_max(Long y_max) {
        this.y_max = y_max;
    }

    public GranularWarning(Long x, Long y_min, Long y_max) {
        this.x = x;
        this.y_min = y_min;
        this.y_max = y_max;
    }

    public GranularWarning() {
    }
}
