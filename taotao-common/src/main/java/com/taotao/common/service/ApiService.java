package com.taotao.common.service;


import com.taotao.common.httpclient.HttpResult;
import org.apache.http.NameValuePair;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by YMSX30004 on 2016/12/27.
 */
@Service
public class ApiService implements BeanFactoryAware {


    private BeanFactory beanFactory;

    @Autowired
    private RequestConfig requestConfig;

    public String doGet(String url) throws Exception {


        // 创建http GET请求
        HttpGet httpGet = new HttpGet(url);

        httpGet.setConfig(requestConfig);


        CloseableHttpResponse response = null;


        try {
            // 执行请求
            response = getHttpClient().execute(httpGet);
            // 判断返回状态是否为200
            if (response.getStatusLine().getStatusCode() == 200) {
                return EntityUtils.toString(response.getEntity(), "UTF-8");

            }
        } finally {
            if (response != null) {
                response.close();
            }
        }
        return null;
    }

    /**
     * 带有参数的GET请求，返回:null,请求失败，String数据，请求成功
     *
     * @param url
     * @param params
     * @return
     * @throws ClientProtocolException
     * @throws IOException
     * @throws URISyntaxException
     */
    public String doGet(String url, Map<String, String> params) throws Exception {
        URIBuilder builder = new URIBuilder(url);
        for (Map.Entry<String, String> entry : params.entrySet()) {
            builder.setParameter(entry.getKey(), entry.getValue());
        }
        return this.doGet(builder.build().toString());
    }

    /**
     * 带有参数的POST请求
     *
     * @param url
     * @param params
     * @return
     * @throws ParseException
     * @throws IOException
     */
    public HttpResult doPost(String url, Map<String, String> params) throws ParseException, IOException {
        // 创建http POST请求
        HttpPost httpPost = new HttpPost(url);
        httpPost.setConfig(requestConfig);
        if (null != params) {
            // 设置post参
            List<NameValuePair> parameters = new ArrayList<NameValuePair>(0);
            for (Map.Entry<String, String> entry : params.entrySet()) {
                parameters.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));
            }
            // 构造一个form表单式的实体
            UrlEncodedFormEntity formEntity = new UrlEncodedFormEntity(parameters);
            // 将请求实体设置到httpPost对象中
            httpPost.setEntity(formEntity);
        }

        CloseableHttpResponse response = null;
        try {
            // 执行请求
            response = getHttpClient().execute(httpPost);
            return new HttpResult(response.getStatusLine().getStatusCode(), EntityUtils.toString(
                    response.getEntity(), "UTF-8"));
        } finally {
            if (response != null) {
                response.close();
            }
        }
    }

    /**
     * 没有参数的POST请求
     *
     * @param url
     * @return
     * @throws ParseException
     * @throws IOException
     */
    public HttpResult doPost(String url) throws ParseException, IOException {
        return this.doPost(url, null);
    }

    public HttpResult doPostJson(String url, String json) throws ParseException, IOException {
// 创建http POST请求
        HttpPost httpPost = new HttpPost(url);
        httpPost.setConfig(requestConfig);
        if (null != json) {
            // 构造一个form表单式的实体
            StringEntity stringEntity = new StringEntity(json, ContentType.APPLICATION_JSON);
            // 将请求实体设置到httpPost对象中
            httpPost.setEntity(stringEntity);
        }
        CloseableHttpResponse response = null;
        try {
            // 执行请求
            response = getHttpClient().execute(httpPost);
            return new HttpResult(response.getStatusLine().getStatusCode(), EntityUtils.toString(
                    response.getEntity(), "UTF-8"));
        } finally {
            if (response != null) {
                response.close();
            }
        }
    }

    private CloseableHttpClient getHttpClient() {
        //通过Bean工厂获取bean，保证HttpClient对象是多例
        return this.beanFactory.getBean(CloseableHttpClient.class);
    }

    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        this.beanFactory = beanFactory;

    }

}



