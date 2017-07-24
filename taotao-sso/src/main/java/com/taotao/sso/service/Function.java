package com.taotao.sso.service;

/**
 * Created by YMSX30004 on 2016/12/29.
 */
public interface Function<T,E> {

	public T callback(E e);
}
