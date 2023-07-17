# 多渠道号项目获取渠道号逻辑
## 1. 删除原全局变量chnId
RouteServiceImpl中删除注解@Value("${chnId}")。
```java
@Service("routeService")
public class RouteServiceImpl implements RouteService {
    private static final Logger logger = LoggerFactory.getLogger(RouteServiceImpl.class);

    //@Value("${chnId}")  //删除改注解
    private String chnId;
}
```
## 2. 删除给全局变量赋值的方法
ChannelProxyServiceImpl中删除给全局变量赋值的方法。
```java
routeService.setRequestChnId(proxyRequest.getChnId());
innerRouteService.setRequestChnId(proxyRequest.getChnId());
```
## 3. 转发调用方法添加局部变量chnId
InnerRouteServiceImpl和RouteServiceImpl类转发调用方法添加局部变量chnId。**注意：是所有方法**，以updateChnflowInfo为例。
```java
@Override
public void updateChnflowInfo(ChnFlowInfoUpdateRequest chnFlowInfoUpdateRequest, String chnId)throws AppBizException {
     ......
    //2.webservice交易
    TransProxyResponse transProxyResponse = doTransProxy(transProxyRequest,chnId);
    ...... 
}
```
## 4. 各类交易中调用方法传终端上送chnId
```java
innerRouteService.updateChnflowInfo(chnFlowInfoUpdateRequest, cupsTrmnl.getChnId());
```


