# 新一代mac计算
## （1）测试环境加密机程序
- 各个新一代上的：$HOME/modules/bin/UmsSecurity   
- 216上加密机程序代码：$HOME/modules/security

<img src="/img/platform/xyd_security.png" data-fancybox="gallery">

## （2）应用解包错误
看pin里面的报错哪个域解析错误，一般增值交易发到传统了，将**estpduinfo表**里面对应的1改成2。

<img src="/img/platform/xyd_pos_decode.png" data-fancybox="gallery">

## （3）签到返回算MAK
- 对于单倍长密钥算法，前12个字节为PIN的工作密钥的密文，后12个字节为MAC的工作密钥的密文。（其中，前8个字节是密文，后4个字节是checkvalue；前8个字节解出明文后，对8个数值0做单倍长密钥算法，取结果的前四位与checkvalue 的值比较应该是一致的）。
- 对于双倍长密钥算法，前20个字节为PIN的工作密钥的密文，后20个字节为MAC的工作密钥的密文。（其中，“PIN工作密钥”前16个字节是密文，后4个字节是checkvalue；前16个字节解出明文后，对8个数值0做双倍长密钥算法，取结果的前四位与checkvalue 的值比较应该是一致的；“MAC工作密钥”前8个字节是密文，再8个字节是二进制零，后4个字节是checkvalue；前8个字节解出明文后，对8个数值0做单倍长密钥算法，取结果的前四位与checkvalue 的值比较应该是一致的）。

<font color="red">签到返回62域：</font>

```bash
84772dae453ec6d67583327b0237513268d0648c
90f1788856631952000000000000000044b1eb7c
```
<img src="/img/platform/xyd_62.png" data-fancybox="gallery">

**终端主密钥32个4进行解密：85E52F31E03E5ECD**

<img src="/img/platform/xyd_32_4.png" data-fancybox="gallery">

**hsm_key中MAK进行解密，保护密钥16个2和16个1，为85E52F31E03E5ECD**

<img src="/img/platform/xyd_mak_decode.png" data-fancybox="gallery">

**checkvalue计算**

<img src="/img/platform/xyd_checkvalue.png" data-fancybox="gallery">

## （4）mac计算（算出MAK，用MAK对报文加密的MAC）
- 查看主密钥表hsm_tmk，其中TMK为主密钥密文，测试环境通过16个2和16个1加密，明文为32个4。
- 查看工作密钥表hsm_key，其中PIK为用于加密PIN的密钥，MAK为用于生成验证报文mac的密钥。

```sql
select *from hsm_tmk; //查看主密钥表
select *from hsm_key; //查看工作密钥表
```
- 终端通过62域签到报文17B4B586B689D4A4通过主密钥32个4进行解密，得到MAK明文（85EAA286A892DA6D），终端用其对报文加密得到MAC。

<img src="/img/platform/xyd_encode_mac.png" data-fancybox="gallery">

- 新一代通过hsm_key表中的MAK字段用32个2和32个1进行解密，得到MAK明文。

<img src="/img/platform/xyd_encode_mac.png" data-fancybox="gallery">

- MAC计算

<img src="/img/platform/xyd_mac.png" data-fancybox="gallery">

- 用于计算MAC的报文去掉前面后面的MAC，最终计算结果为241E08B2D7988DAD，比较相等

<img src="/img/platform/xyd_mac_equals.png" data-fancybox="gallery">
