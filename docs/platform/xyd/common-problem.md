# 新一代常见开发问题
## （1）签到无法识别交易类型（estxnID表）

<img src="/img/platform/xyd_sign_estxid.png" data-fancybox="gallery">

表:estxnid <br/>
**用途**：交易信息配置表，用于平台匹配交易类型 ，通过这些条件唯一确定一笔交易类型。 <br/>
**原则**：消费类：1域+3域+25域+60.1域     管理类：1域+25域+60.3域

```sql
select *from estxnID where msg_type='0800';
```
交易未配置： 交易代码表esTxnID
```sql
insert into esTxnID (APPL_ID, TXN_ID, MSG_TYPE, COND_CODE, FUNC_CODE, PROC_CODE, TXN_NAME, REQ_MIN_BITMAP, REQ_MAX_BITMAP, REJECT_BITMAP, ACK_BITMAP, CK_REQ_BITMAP, MAC_FLAG, VOID_FLAG, ORG_TXN_ID, REV_ORG_MSG_TYPE, REC_FLAG, DUP_HANDLE, ERR_HANDLE, SETT_FLAG, MCH_ACCU, CASHIER_ACCU, LOT_FLAG, BUSINESS_TYPE)
values (2, 2166, '0200', '81', '23', '780000', '账单缴费撤销', '702404C030C19801', '702404C030C19801', '703E00800EC18001', '703E00800EC18001', 0, 1, 0, 0, null, 0, 0, 0, 0, 0, 0, 1, null);
```
交易配置表 estrancfg
```sql
insert into estrancfg (DEVICENO, ETSTRANCODE, TRANSTEP, CONTENT)
values ('0002', '020078', '0502', '撤销交易请求');
```

## （2）监控上显示？？？（estxnid表中插入的）
<img src="/img/platform/xyd_sign_estxid.png" data-fancybox="gallery">

[更改环境变量](https://jingyan.baidu.com/article/fec7a1e5b263f61190b4e732.html)
- 在“系统变量”中新建环境变量，变量名为：NLS_LANG 变量值为：AMERICAN_AMERICA.ZHS16GBK ，然后确定即可。
- 接着在"系统变量"中再新建一个环境变量，变量名为：LANG 变量值为：zh_CN.GBK 然后确定。

## （3）TCP/UDP Socket调试工具
显示十六进制值发送

<img src="/img/platform/xyd_socket.png" data-fancybox="gallery">

## （4）tranlist.debug找不到日志
监控上有显示，但是tranlist.debug中找不到该交易的日志,解决方法：
1. trace_log0314中有没有该笔交易

<img src="/img/platform/xyd_trace_log.png" data-fancybox="gallery">

2. posTranReq.debug255找到以下字段 nbcsa/home/nttnb_run/log/debug> **view ./posTranReq.debug255**

<img src="/img/platform/xyd_debug255.png" data-fancybox="gallery">

3. 然后就可以进入该笔交易的日志

<img src="/img/platform/xyd_pos_trans_req.png" data-fancybox="gallery">

16为交易时间，1220842为**posTranReq.debug255**查找出来的

## （5）UNPACK解包失败（pin中日志）
<img src="/img/platform/xyd_unpack_error.png" data-fancybox="gallery">

TPDU的原因，发到传统了，需要ULINK那边添加，或者生产上用的测试的tpdu。

<img src="/img/platform/xyd_unpack_tpdu.png" data-fancybox="gallery">

看pin里面的报错哪个域解析错误，一般增值交易发到传统了，将<font color="red">estpduinfo</font>表里面对应的1改成2。

## （6）邮箱绑定失败（ibsrun/bin）
清除ibsrun/bin中的.IBS_VAR_4X下所有文件和._IBS_SYSTEM_LOCK。 **ls -a可以显示.IBS_VAR_4X和._IBS_SYSTEM_LOCK**。

<img src="/img/platform/xyd_ls_a.png" data-fancybox="gallery">

216上mk.sh的时候出现STOPPING 可能是136山中间脚本邮箱未起来，不出现ibsComp.log，可能是脚本里面报错。

<img src="/img/platform/xyd_mk_stopping.png" data-fancybox="gallery">

## （7）签到失败可能原因
<img src="/img/platform/xyd_sign_error.png" data-fancybox="gallery">

可能原因：MSGHEAD不对。

<img src="/img/platform/xyd_sign_msghead.png" data-fancybox="gallery">

## （8）java前置更改长度
config中的applicationContext .xml中修改。
::: warning
注意：通讯程序中对应的长度也要进行修改
:::
<img src="/img/platform/xyd_java_font.png" data-fancybox="gallery">

## （9）后线发对账通知
swCommfun.c中switch修改为dbsvr

<img src="/img/platform/xyd_sw_commfun.png" data-fancybox="gallery">

## （10）传统改增值（以山东为例）
* 签到要用增值签到，签到之后将estpduinfo中tpdu对应的appl_id改为传统1
* 签到（0800003）的时候需要修改增值对应的路由脚本215.SCR，让其走增值。

<img src="/img/platform/xyd_ct_to_zz.png" data-fancybox="gallery">

## （11）仿真00  终端96
仿真返00  终端96 ：**hsm_tmk表未配置 ，62域未解析出来**。

136青岛中修改格式转换组2012.FMT如下图所示。

<img src="/img/platform/xyd_pos96.png" data-fancybox="gallery">

日志返回00，仿真96，可能原因：**调用安全模块保存密钥出错HsmKeyUpdate**。
查看hsm_key、hsm_tmk是否配置<font color="red">hsm_system中PARAM为ADDR的地址（144.131.254.56:6666）是不是对的。</font> 

## （12）中间业务脚本变量名称太长（底层写的不能超过20位）
**测试中19位就报下面错误**

<img src="/img/platform/xyd_ibs_long.png" data-fancybox="gallery">

## （13）签到
1. 签到后发交易返A0H，签到去的地方不对，看看签到日志中的路由。
53——本地    42/470<br />
2. 签到和发交易都返96L,平台errlog中SQL error -14400。fjnl、espostrn、estrnlog未建分区。
**建分区:**
```sql
alter table ESTRNLOG add Partition ESTRNLOG_P20201230 values ('20201230');
alter table ESTRNLOG add Partition ESTRNLOG_P20201231 values ('20201231');
```

## （14）关闭MAC校验
estidinfo中的MAC_ALG设置为0

<img src="/img/platform/xyd_mac_off.png" data-fancybox="gallery">

## （15）POSP解包错误
看pin中那个域解包错误，看是不是par包对应格式有问题，或者**tpdu**用错（改下estpduinfo表，对应的1改成2增值）

<img src="/img/platform/xyd_posp_error.png" data-fancybox="gallery">

## （16）内容输出
estidinfo表的MAC_ALG设置为0，终端分组为PSZ。

<img src="/img/platform/xyd_mac_alg0.png" data-fancybox="gallery">

## （17）ftp的密码设置
FTPPWD=123456$1234  设置密码的时候有$符号会被过滤，需要加上单引号FTPPWD='123456$1234'。

## （18）更改密码
* 数据库解锁：
```sql
alter user ntthb_run account unlock;
```
* 数据库执行：
```sql
alter user ntthe_run identified by Ntthe_136;
```
* 应用修改：
```bash
view $HOME/.bash_profile
view $HOME/ibsrun/ini/ibs_ifcfg.ini
hsmdbu $SWITCH_DBUSER $SWITCH_DBPASS
```

## （19）撤销返回25H
37域和61域以外，60域后面也需要和缴费相同。缴费送22000003000**60**，撤销送2300000300050时候会报25H，送跟缴费一样则成功。

缴费有返回38域授权码，撤销未上送38域授权码。

## （20）TC值上送
青海不送48域时，62域和63域中间业务脚本没有进行交换，让终端62域送值，63域不送值。

## （21）卡组织代码和IC卡参数下载63域返0
卡组织代码缴费63域返回CUP及其它说明: **IC卡参数下载ulink62域返回0，是终端上送的63域不对**
<img src="/img/platform/xyd_ic_card.png" data-fancybox="gallery">
