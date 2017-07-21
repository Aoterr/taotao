package com.taotao.web.httpclient;

import org.apache.http.conn.HttpClientConnectionManager;

/**
 * Created by YMSX30004 on 2016/12/27.
 */

	public class IdleConnectionEvictor extends Thread {

		private final HttpClientConnectionManager connMgr;

		private volatile boolean shutdown;

		public IdleConnectionEvictor(HttpClientConnectionManager connMgr) {
			this.connMgr = connMgr;
			this.start();
		}

		@Override
		public void run() {
			try {
				while (!shutdown) {
					synchronized (this) {
						wait(5000);
						// 关闭失效的连接
						connMgr.closeExpiredConnections();
					}
				}
			} catch (InterruptedException ex) {
				// 结束
			}
		}

		public void shutdown() {
			shutdown = true;
			synchronized (this) {
				notifyAll();
			}
		}
	}
