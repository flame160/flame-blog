# 短连接改长连接
短连接修改长连接可以参考471、300渠道。
## 短连接改长连接
许多老版本的通讯模板还是短链接，需要改为长连接。短链接版本如下：
<img src="/img/platform/szm_short.png" data-fancybox="gallery"/>

需要我们改为长连接版本：
<img src="/img/platform/szm_long.png" data-fancybox="gallery"/>

* 需要修改xpospChannelServiceContext.xml和新增RouteUtil工具类
```xml
<import resource="classpath:applicationContext-transporter.xml"/>

<bean id="routeUtil" class="com.ums.xposp.utils.RouteUtil" lazy-init="false">
<property name ="sourthSet">
    <set>
        <value>102000</value>
        ......
    </set>
</property>
<property name ="northSet">
    <set>
        <value>103400</value>
        ......
    </set>
</property>
</bean>
```

* 新增applicationContext-transporter.xml配置
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:context="http://www.springframework.org/schema/context"
       xmlns:p="http://www.springframework.org/schema/p"
       xmlns:util="http://www.springframework.org/schema/util"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
		http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util-3.2.xsd
		http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-3.0.xsd">

    <context:component-scan base-package="com.ums.xposp.common"/>
  
    <util:map id="transporterMap">
        <entry key="ULINK_TRADITIONAL_ADDRESS" value-ref="tcpTransportExcutorUlink" />
        <!-- <entry key="POST_ADDRESS" value-ref="tcpTransportExcutorPost" />-->
    </util:map>
    <!-- Socket连接池配置 -->
    <!-- 渠道一 -->
    <bean id="tcpTransportExcutorUlink" class="com.ums.xposp.common.TcpTransportPoolExecutor" init-method="start">
        <property name ="hosts" value="10.0.1.143:5319"/>
        <property name="definedMaxActive" value="30"/>
        <property name="sendHeartBeat" value="true"/>
        <property name="definedMaxWait" value="3000"/>
        <property name="definedMaxIdle" value="30"/>
    </bean>
    <bean id="removeSensitiveSwitch" class="com.ums.xposp.utils.LogUtils">
        <property name="removeSensitive" value="true" />
    </bean>
</beans> 
```

* 新增TcpService接口和实现类以及TcpTransportPoolExecutor线程池

<img src="/img/platform/szm_tcp.png" data-fancybox="gallery"/>

* 修改发送报文的方法
```java
//2.发送报文
// byte[] respData = TCPUtils.getInstance().sendReciveMsg(
//        iso_8583, XPOSPClientUtils.getChannelIp(),XPOSPClientUtils.getChannelPort());

// 长连接
byte[] respData = tcpService.sendReceiveMsg(AddressConst.ULINK_TRADITIOINAL_ADDRESS,iso_8583);
```

## 心跳日志
log4j.xml进行配置，参考渠道号471。
```xml
<?xml version="1.0" encoding="UTF-8"?>  
<!DOCTYPE log4j:configuration SYSTEM "log4j.dtd">  
<log4j:configuration xmlns:log4j="http://jakarta.apache.org/log4j/" debug="false">       
    <!-- 业务日志，生产环境使用 -->
    <appender name="FILE_LOG" class="org.apache.log4j.DailyRollingFileAppender">
        <param name="encoding" value="utf-8"/>
        <param name="Threshold" value="INFO"/>
        <param name="File" value="/logs/web/471/xposp-channel.log" />
        <param name="Append" value="true"/>
        <!--  <param name="MaxFileSize" value="15000KB" />
        <param name="MaxBackupIndex" value="100"/> -->
        <param name="DatePattern" value="'.'yyyy-MM-dd'.log'" />
        <layout class="org.apache.log4j.PatternLayout">
            <param name="ConversionPattern" value="%d{yyyy-MM-dd'T'HH:mm:ss.SSSZ}|%-5p|%t||%X{_traceId}||%X{_leftTraceId}|(%F,%L)|%m[LID=[%X{_leftTraceId}],ID=[%X{_traceId}],RID=[%X{_rightTraceId}]]%n" />
        </layout>
    </appender>

    <!-- 心跳日志 -->
    <appender name="heartBeatLogAppender" class="org.apache.log4j.DailyRollingFileAppender">
        <param name="encoding" value="utf-8"/>
        <param name="Threshold" value="DEBUG"/>
        <param name="File" value="/logs/web/471/heart-beat.log" />
        <param name="Append" value="true" />
        <param name="MaxFileSize" value="15000KB" />
        <param name="MaxBackupIndex" value="5"/>
        <layout class="org.apache.log4j.PatternLayout">
            <param name="ConversionPattern" value="%d{yyyy-MM-dd'T'HH:mm:ss.SSSZ}|%-5p|%t||%X{_traceId}||%X{_leftTraceId}|(%F,%L)|%m[LID=[%X{_leftTraceId}],ID=[%X{_traceId}],RID=[%X{_rightTraceId}]]%n" />
        </layout>
    </appender>

    <!-- 默认的异步文件日志输出，生产环境都采用此appender -->
    <appender name="ASYNC_FILE_LOG" class="org.apache.log4j.AsyncAppender">
        <param name="BufferSize" value="256"/>
        <param name="LocationInfo" value="true"/>
        <appender-ref ref="FILE_LOG"/>
    </appender>

    <!--  logger:自定义输出配置; category:自定义输出配置; logger、category 用法一致,可以配置通过 additivity 属性标记是否集成-->
    <logger name="heartBeatLog" additivity="false">
        <level value="info" />
        <appender-ref ref="heartBeatLogAppender"/>
    </logger>

    <category name="com.ums">
        <param name="additivity" value="false"/>
        <priority value="INFO" />
        <appender-ref ref="ASYNC_FILE_LOG" />
    </category>

    <root>
        <priority value="INFO" />
        <appender-ref ref="ASYNC_FILE_LOG" />
    </root>
</log4j:configuration>
```
