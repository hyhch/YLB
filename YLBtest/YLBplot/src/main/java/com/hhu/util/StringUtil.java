package com.hhu.util;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.util.Base64;
import java.util.Random;

public class StringUtil {

    final static Base64.Decoder b64decoder = Base64.getDecoder();
    final static Base64.Encoder b64encoder = Base64.getEncoder();

    public static String decode(String s, String encoding) {
        try {
            return URLDecoder.decode(s, encoding);
        } catch (Exception e) {
            return s;
        }
    }

    public static String encode(String s, String encoding) {
        try {
            return URLEncoder.encode(s, encoding);
        } catch (Exception e) {
            return s;
        }
    }

    public static String b64decode(String s) {
        try {
            return new String(b64decoder.decode(s), "utf-8");
        } catch (Exception e) {
            return s;
        }
    }

    public static String b64encode(String s) {
        try {
            return b64encoder.encodeToString(s.getBytes());
        } catch (Exception e) {
            return s;
        }
    }

    public static String qdecode(String s) {
        if (isEmpty(s)) return "";
        System.out.println("qdecode " + s);
        // base64码表中有+，/等特殊字符，需要转义再解码
        if (s.indexOf("@") != -1) s = s.replaceAll("@", "+");
        System.out.println("qdecode 替换@为+ " + s);
        if (s.indexOf("_") != -1) s =  s.replaceAll("_", "/");
        System.out.println("qdecode 替换_为/ " + s);
        try {
            String res =  new String(b64decoder.decode(s), "utf-8");
            System.out.println(String.format("qdecode '%s' 为 '%s' via base64", s, res));
            return res;
        } catch (Exception e) {
            String res = decode(s, "utf-8");
            System.out.println(String.format("qdecode '%s' 为 '%s' via utf-8", s, res));
            return res;
        }
    }

    public static boolean isEmpty(String s) {
        if (s == null || s.length() == 0) return true;
        return false;
    }

    public final static String md5(String s) {
        char hexDigits[] = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'};
        try {
            byte[] btInput = s.getBytes();
            // 获得MD5摘要算法的 MessageDigest 对象
            MessageDigest mdInst = MessageDigest.getInstance("MD5");
            // 使用指定的字节更新摘要
            mdInst.update(btInput);
            // 获得密文
            byte[] md = mdInst.digest();
            // 把密文转换成十六进制的字符串形式
            int j = md.length;
            char str[] = new char[j * 2];
            int k = 0;
            for (int i = 0; i < j; i++) {
                byte byte0 = md[i];
                str[k++] = hexDigits[byte0 >> 4 & 0xf];
                str[k++] = hexDigits[byte0 & 0xf];
            }
            return new String(str);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static String getRandomStr(int length) {
        String base = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        int randomNum;
        char randomChar;
        Random random = new Random();
        // StringBuffer类型的可以append增加字符
        StringBuffer str = new StringBuffer();

        for (int i = 0; i < length; i++) {
            // 可生成[0,n)之间的整数，获得随机位置
            randomNum = random.nextInt(base.length());
            // 获得随机位置对应的字符
            randomChar = base.charAt(randomNum);
            // 组成一个随机字符串
            str.append(randomChar);
        }
        return str.toString();
    }

    public static void main(String[] args) throws Exception {
//        System.out.println(b64encode("背影-橘子朱.txt"));
//        System.out.println(qdecode("6IOM5b2xLeapmOWtkOacsS50eHQ="));
//        System.out.println(qdecode("%E8%83%8C%E5%BD%B1-%E6%A9%98%E5%AD%90%E6%9C%B1.txt"));
//        System.out.println(qdecode("5oub5qCH6Zi25q61"));
//        System.out.println(qdecode("6K@36Zeu"));
        String s = "BHTJCAa2018";
        System.out.println(md5(s));
        System.out.println("7ADEBAFCC7044374D9849F0E88EA612");
//        System.out.println("7ADEBAFC0C7044374D9849F0E88EA612");
    }

}
