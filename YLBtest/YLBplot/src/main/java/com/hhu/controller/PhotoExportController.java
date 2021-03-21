package com.hhu.controller;


import com.hhu.service.PhotoExportService;
import com.sun.jna.Library;
import com.sun.jna.Native;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.io.File;

@Controller
@RequestMapping("/")
public class PhotoExportController {

    /*
    * 初始化动态链接库
    * */
    public interface Dll extends Library {
        PhotoExportController.Dll mydll = (PhotoExportController.Dll) Native.load("F:\\java_web\\mwonline\\Intelligent_Rolling0\\Intelligent_Rolling.dll", PhotoExportController.Dll.class);// 加载动态库文件
        int mainWork(PhotoExportService  PCpath,PhotoExportService  str,PhotoExportService  starttime,PhotoExportService endtime);
//          int test(PhotoExportService  PCpath,PhotoExportService  str,PhotoExportService  starttime,PhotoExportService endtime);
    }



    /*
    *2020-01-12
    * 周彤
    * */
    @ResponseBody
    @RequestMapping("photoExport")
    public String getZhou(HttpServletRequest request){

        System.setProperty("jna.encoding", "GBK");  //解决中文乱码
        String startTime = "";
        String endTime = "";
        String photoDirInUSB = "";
        String photoPathInPC = "";
        String message = "";
        startTime = request.getParameter("startTime"); //搜寻时间范
        endTime = request.getParameter("endTime");     //围内的照片
        photoPathInPC = "D:\\copyfile\\";  //拷贝到本地文件夹的路径
        photoDirInUSB = "stonefile";      //U盘中存储照片的文件夹名称
        PhotoExportService ST = new PhotoExportService(startTime);
        PhotoExportService ES = new PhotoExportService(endTime);
        PhotoExportService PC = new PhotoExportService(photoPathInPC);
        PhotoExportService PU = new PhotoExportService(photoDirInUSB);
        //创建照片本地存储文件夹
        File dirfile=new File(photoPathInPC);
        if(!dirfile.exists()){
            dirfile.mkdirs();
        }


        int ret = PhotoExportController.Dll.mydll.mainWork(PC,PU,ST,ES);

        switch (ret){
            case 1:
                message = "照片导入成功！";
                break;
            case -1:
                message = "复制文件失败";
                break;
            case -2:
                message = "无符合条件照片";
                break;
            case -3:
                message = "数据库连接失败";
                break;
            case -4:
                message = "未连接存储设备";
                break;
            default:
                message = "照片导入失败！";
                break;
        }

        return message;
    }

}




//    public int getZhou(HttpServletRequest request){
//        String startTime = "";
//        String endTime = "";
//        String photoDirInUSB = "";
//        String photoPathInPC = "";
//        startTime = request.getParameter("startTime"); //搜寻时间范
//        endTime = request.getParameter("endTime");     //围内的照片
//        photoDirInUSB = "堆石照片";      //U盘中存储照片的文件夹名称
//        photoPathInPC = "D:\\copyfile\\";  //拷贝到本地文件夹的路径
//
//        System.out.print("================================");
//        System.out.print("================================");
//        System.out.print(startTime+"---"+endTime);
//
//
////        System.setProperty("jna.encoding", "GBK");//解决中文乱码
////        String go = Dll.INSTANCE.go("777");
////        System.out.println(go);
//
//        PhotoExportController.Dll.mydll.test01(photoPathInPC,photoDirInUSB,startTime,endTime);
//
//
//        return 1;
//    }
//
//}



