<template>
  <div class="ip">
    <h2>百度</h2>
    <div>
      1、http://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?query=192.168.0.0&co=&resource_id=6006&oe=utf8
      例：http://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?query=192.168.0.0&co=&resource_id=6006&oe=utf8
      <img src="../assets/baiduip.png">
      2、http://opendata.baidu.com/api.php?query=[ip地址字串]&co=&resource_id=6006&oe=utf8
      例：http://opendata.baidu.com/api.php?query=192.168.0.0&co=&resource_id=6006&oe=utf8
    </div>
    <h2>阿里巴巴</h2>
    <div>
      http://ip.taobao.com/service/getIpInfo.php?ip=[ip地址字串]
      例：http://ip.taobao.com/service/getIpInfo.php?ip=192.168.0.0
      返回值：{"code":0,"data":{"ip":"192.168.0.0","country":"XX","area":"","region":"XX","city":"内网IP","county":"内网IP","isp":"内网IP","country_id":"xx","area_id":"","region_id":"xx","city_id":"local","county_id":"local","isp_id":"local"}
    </div>
    <h2>国际化显示</h2>
    <div>
      http://ip-api.com/json/[ip地址字串]?lang=zh-CN
      例：http://ip-api.com/json/114.114.114.114?lang=zh-CN
      返回值：{"as":"AS174 Cogent Communications","city":"北京","country":"中国","countryCode":"CN","isp":"China Unicom Shandong
      Province network","lat":39.9042,"lon":116.407,"org":"NanJing XinFeng Information Technologies,
      Inc.","query":"114.114.114.114","region":"BJ","regionName":"北京","status":"success","timezone":"Asia/Shanghai","zip":""}
    </div>
    <h2>126</h2>
    <div>
      http://ip.ws.126.net/ipquery?ip=[ip地址字串]
      例：http://ip.ws.126.net/ipquery?ip=192.168.0.0
      返回值：var lo="广东省", lc="广州市"; var localAddress={city:"广州市", province:"广东省"}
    </div>
    <h2>太平洋</h2>
    <div>
      http://whois.pconline.com.cn/jsFunction.jsp?callback=jsShow&ip=[ip地址字串]
      例：http://whois.pconline.com.cn/jsFunction.jsp?callback=jsShow&ip=192.168.0.0
      返回值：if (window.jsShow){jsShow(' 局域网','');
    </div>
    <h2>360</h2>
    <div>
      http://ip.360.cn/IPQuery/ipquery?ip=[ip地址字串]
      例：http://ip.360.cn/IPQuery/ipquery?ip=192.168.0.0
      返回值：{"errno":0,"errmsg":"","data":"\u5c40\u57df\u7f51"
    </div>
    <h2>tool.lu</h2>
    <div>
      <a href="https://tool.lu/ip/" target="_blank">https://tool.lu/ip/</a>
    </div>
    <div>
      <img src="../assets/ip1.png"/>
      <img src="../assets/ip2.png"/>
    </div>
    图片IP签名：<img src="https://tool.lu/netcard/">

  </div>
</template>

<script>
  export default {
    name: "IP"
  }
</script>

<style lang="scss" scoped>
  .ip {
    width: 1000px;
    margin: 10px auto;
    div {
      text-align: left;
      line-height: 1.3;
      font-size: 14px;
      font-family: "Microsoft YaHei";
      white-space: pre-wrap;
      word-wrap: break-word;
      img {
        max-width: 100%;
      }
    }
  }
</style>
