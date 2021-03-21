package com.hhu.service;
import com.sun.jna.ptr.ByReference;

public class PhotoExportService extends ByReference{

    public PhotoExportService() {
        this(0);
    }

    public PhotoExportService(int size) {
        super(size < 4 ? 4 : size);
        getPointer().clear(size < 4 ? 4 : size);
    }

    public PhotoExportService(String str) {
        super(str.length() + 1);
        setValue(str);
    }

    private void setValue(String str) {
        System.out.print(str);
        System.out.print(str.length());
        getPointer().setString(0, str);
    }

    public String getValue() {
        return getPointer().getString(0);
    }

}
