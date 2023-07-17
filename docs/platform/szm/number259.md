# 259号文改造
在银行卡消费、POS通消费、预授权交易、担保交易组包，需要支持59域上送。如上述交易不支持59域上送，需要进行改造，新增59域上送改造。
## 商终密老平台到新一代平台8583报文
商终密老平台到新一代平台8583报文，主要看渠道流水有没有存59域和发送到新一代的报文是否包含59域，没有则透传终端送的59域。

**1. 终端报文转换消费请求实体时,检查实体类PaymentRequest是否有59域字段**
```java
PaymentRequest paymentRequest = new PaymentRequest(reqJson);
paymentRequest.setDeviceSn(request.getProxyDeviceInfo().getDevSn());
```

**2. TransferChannel中是否设置59域**
```java
if(StringUtils.isNotBlank(request.getSelfDefined059())){
    requestInfo.setSelfDefined59(request.getSelfDefined059());
}
ChannelResponseInfo responseInfo = new ChannelResponseInfo();
try {
    responseInfo =consumeProcess.process(cupsTrmnl,device,requestInfo);
    } catch (TransferFailedException e) {
    ...
}
```
**3. ConsumeProcess中packUp是否设置59域**
```java
if (StringUtils.isNotBlank(request.getSelfDefined59())) {
    entity.setSelfDefined59(request.getSelfDefined59());
}
```

## 商终密老平台到增值平台JSON报文
商终密老平台到增值平台JSON报文，需要改动的地方同到新一代平台。**需要注意的是将打包送给增值服务平台的报文59域转为hex。通过注解实现**。参考渠道号896。
<!-- ![](图片地址) -->
<img src="/img/platform/szm_259.png" data-fancybox="gallery"/>
<img src="/img/platform/szm_259_2.png" data-fancybox="gallery"/>

```java
@JSONField(name = "cust2",serializeUsing = HexSerializer.class,
        deserializeUsing = HexSerializer.class)
private String selfDefined59;
```

## 商终密新平台itaa-boot到增值服务平台
商终密新平台itaa-boot到增值服务平台则无需改动。

