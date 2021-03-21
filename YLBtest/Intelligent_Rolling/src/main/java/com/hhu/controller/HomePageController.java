package com.hhu.controller;

import com.alibaba.fastjson.JSONObject;
import com.hhu.annotation.LogAnnotation;
import com.hhu.service.HomePageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import java.util.ArrayList;

/**
 * @author ：jin
 * @description:
 * @date ：Created in 2021/2/16 19:44
 */
@Controller
@RequestMapping("/")
public class HomePageController {

    @Autowired
    private HomePageService homePageService;

    @Autowired
    private JedisPool jedisPool;

    //redis的key
    private final String REDIS_KEY = "homepage";


    /**
     * 查询最近三个月的碾压情况信息
     *
     * @param stm
     * @param etm
     * @return
     */
    @LogAnnotation(operateType = "碾压情况信息查询")
    @ResponseBody
    @RequestMapping("getHomePageMessage")
    public ArrayList getRoutineList(String stm, String etm) {

        ArrayList<Object> list = new ArrayList<>();

        /*
        先在缓存中进行查询，如果有直接返回，如果没有则查询数据库，并将结果存入缓存中
         */

//        try (Jedis jedis = jedisPool.getResource()) {
//            if (!jedis.exists(REDIS_KEY)) {
                System.out.println("从数据库中查询");
                //当前层采集照片总数
                //先查询碾压到了哪一层
                int layNum = homePageService.getCurrentLay();
                int totalNum = homePageService.getTotalNum(layNum);
                list.add(totalNum);
                //最新采集时间
                String latestDate = homePageService.getLatestDate(stm, etm);
                list.add(latestDate.substring(0, 10));
//        int maxGrading = homePageService.getMaxGrading(stm, etm);
//        list.add(maxGrading);
//        int maxDensity = homePageService.getMaxDensity(stm, etm);
//        list.add(maxDensity);
                //级配已处理数目
                int gradingProcessNum = homePageService.getGradingProcessNum(stm, etm);
                list.add(gradingProcessNum);
                list.add(totalNum - gradingProcessNum);
                //岩性识别已处理数目
                int lithologyProcessNum = homePageService.getLithologyProcessNum(stm, etm);
                list.add(lithologyProcessNum);
                list.add(totalNum - lithologyProcessNum);
                //风化度识别已处理数目
                int weatheringProcessNum = homePageService.getWeatheringProcessNum(stm, etm);
                list.add(weatheringProcessNum);
                list.add(totalNum - weatheringProcessNum);

                //将数据库查询结果存入缓存
                String jsonString = JSONObject.toJSONString(list);
//                jedis.set(REDIS_KEY, jsonString);
                //设置过期时间半小时
//                jedis.expire(REDIS_KEY, 60 * 30);
                return list;
//            } else {
//                System.out.println("从redis中查询");
//                String s = jedis.get(REDIS_KEY);
//                return JSONObject.parseObject(s, ArrayList.class);
//            }
//        }

    }

}
