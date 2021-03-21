package com.hhu.aop;

import com.hhu.annotation.LogAnnotation;
import com.hhu.model.LogTable;
import com.hhu.service.LogTableService;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.lang.reflect.Method;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Component
@Aspect
public class LogAopAspect {

    @Autowired
    private LogTableService logTableService;

    /**
     * 环绕通知记录日志通过注解匹配到需要增加日志功能的方法
     * 使用LogAnnotion注解时自动触发
     *
     * @param pjp
     * @return
     * @throws Throwable
     */
    @Around("@annotation(com.hhu.annotation.LogAnnotation)")
    public Object aroundAdvice(ProceedingJoinPoint pjp) throws Throwable {
        //方法执行前的处理，相当于前置通知
        //获取方法签名
        MethodSignature methodSignature = (MethodSignature) pjp.getSignature();
        //获取方法
        Method method = methodSignature.getMethod();
        //获取方法上面的注解
        LogAnnotation logAnnotation = method.getAnnotation(LogAnnotation.class);
        //获取操作描述的属性值
        String operateType = logAnnotation.operateType();
        //创建一个日志对象（准备记录日志）
        LogTable logTable = new LogTable();
        //设置操作说明
        logTable.setOperateType(operateType);

        Object result = null;
        try{
            //让代理方法执行
            result = pjp.proceed();
            //相当于后置通知（方法成功执行后）
            logTable.setOperateResult("正常");//设置操作结果
            //获取session中的属性（用户名）
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
            HttpSession session = request.getSession();
            String username = (String) session.getAttribute("username");
            logTable.setOperator(username);
        } catch (SQLException e){
            //相当于异常通知
            logTable.setOperateResult("失败");
            //获取session中的属性（用户名）
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
            HttpSession session = request.getSession();
            String username = (String) session.getAttribute("username");
            logTable.setOperator(username);
        } finally {
            //相当于最终通知
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String format = simpleDateFormat.format(new Date());
            logTable.setOperateDate(format);
//            logTable.setOperateDate(new Date().toLocaleString());

//            System.out.println("操作人："+logTable.getOperator());
//            System.out.println("操作类型："+logTable.getOperateType());
//            System.out.println("操作时间："+logTable.getOperateDate());
//            System.out.println("操作结果："+logTable.getOperateResult());

            logTableService.addLog(logTable.getOperator(),logTable.getOperateType(),logTable.getOperateDate(),logTable.getOperateResult());
        }
        return result;
    }
}
