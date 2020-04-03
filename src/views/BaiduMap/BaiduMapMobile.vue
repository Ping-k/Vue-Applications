<template>
  <div>
    <h3>BaiduMap</h3>
    <p>
      <a href="http://lbsyun.baidu.com/jsdemo.htm#a1_2" target="_blank">百度地图官方示例</a>
    </p>
    <div id="container"></div>
  </div>
</template>

<script>
  export default {
    name: "BaiduMapMobile",
    data() {
      return {}
    },
    mounted() {
      // 初始化地图
      this.initMap();
    },
    methods: {
      /**
       * 初始化百度地图
       */
      initMap() {
        var map = new BMap.Map("container", {minZoom: 5, maxZoom: 19}); // 创建百度地图容器，并设置最大，最小级别
        var point = new BMap.Point(113.988775, 22.557036); // 定义一个中心点坐标
        map.centerAndZoom(point, 5);  // 初始化地图，设置中心点坐标和地图级别[1-19]

        setTimeout(function () {
          map.setZoom(15);
        }, 2000);  //2秒后放大到19级

        map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
        map.enableDragging(true); // 启用地图拖拽事件，默认启用(可不写)
        map.enableDoubleClickZoom(true);  // 启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard(true); // 启用键盘上下左右键移动地图

        // 添加点击事件
        map.addEventListener("click", (e) => {
          console.log('点击位置：', e)
          var gc = new BMap.Geocoder();
          gc.getLocation(e.point, function (rs) {
            console.log('解析点击位置：', rs)

            // 删除原有mk点
            map.removeOverlay(mk);

            let myIcon = new BMap.Icon('/static/map32.png', new BMap.Size(32, 32));
            mk = new BMap.Marker(rs.point, {icon: myIcon}); // 自定义图标

            // 拖拽事件
            mk.addEventListener("dragend", showInfo);
            mk.enableDragging();    //可拖拽

            // 显示位置
            getAddress(rs.point);

            map.addOverlay(mk); // 把点添加到地图上
            map.panTo(rs.point);

            var addComp = rs.addressComponents;
            var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;//获取地址
            console.log('拖拽位置：', rs, address);
            //画图 ---》显示地址信息
            map.removeOverlay(mk.getLabel());//删除之前的label
            var label = new BMap.Label(address, {offset: new BMap.Size(15, -35)});
            label.setStyle({padding: '10px'})
            mk.setLabel(label);

            var _html = `
            <div class="maptips">
              <div class="maptips_title" style="color:#3f292e;font-size:14px;font-weight:bold;margin-bottom: 10px;">
                ${rs.business}
              </div>
              <div class="maptips_address" style="font-size:12px;" >
                <b>地址：</b>${address}
              </div>
            </div>
            `;
            infoWindow = new BMap.InfoWindow(_html);
            mk.openInfoWindow(infoWindow, map.getCenter());

          })
        });

        // 向地图中添加缩放控件
        var ctrl_nav = new BMap.NavigationControl({
          anchor: BMAP_ANCHOR_TOP_LEFT,
          type: BMAP_NAVIGATION_CONTROL_SMALL
        });
        map.addControl(ctrl_nav);
        // 向地图中添加缩略图控件
        var ctrl_ove = new BMap.OverviewMapControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: 0});
        map.addControl(ctrl_ove);
        // 向地图中添加比例尺控件
        var ctrl_sca = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});
        map.addControl(ctrl_sca);


        let mk = {};
        let infoWindow = {}

        //绑定Marker的拖拽事件
        function showInfo(e) {
          var gc = new BMap.Geocoder();
          gc.getLocation(e.point, function (rs) {
            var addComp = rs.addressComponents;
            var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;//获取地址
            console.log('拖拽位置：', rs, address);
            //画图 ---》显示地址信息
            var label = new BMap.Label(address, {offset: new BMap.Size(15, -35)});
            label.setStyle({padding: '10px'})
            map.removeOverlay(mk.getLabel());//删除之前的label
            mk.setLabel(label);

            var _html = `
            <div class="maptips">
              <div class="maptips_title" style="color:#3f292e;font-size:14px;font-weight:bold;margin-bottom: 10px;">
                ${rs.business}
              </div>
              <div class="maptips_address" style="font-size:12px;" >
                <b>地址：</b>${address}
              </div>
            </div>
            `;
            infoWindow = new BMap.InfoWindow(_html);
            mk.openInfoWindow(infoWindow, map.getCenter());

          });
        }

        //获取地址信息，设置地址label
        function getAddress(point) {
          var gc = new BMap.Geocoder();
          gc.getLocation(point, function (rs) {
            var addComp = rs.addressComponents;
            var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;//获取地址
            console.log('当前定位：', rs, address);
            //画图 ---》显示地址信息
            var label = new BMap.Label(address, {offset: new BMap.Size(15, -35)}); // left,top
            label.setStyle({padding: '10px'})
            map.removeOverlay(mk.getLabel());//删除之前的label
            mk.setLabel(label);

            var _html = `
            <div class="maptips">
              <div class="maptips_title" style="color:#3f292e;font-size:14px;font-weight:bold;margin-bottom: 10px;">
                ${rs.business}
              </div>
              <div class="maptips_address" style="font-size:12px;" >
                <b>地址：</b>${address}
              </div>
            </div>
            `;
            infoWindow = new BMap.InfoWindow(_html);
            mk.openInfoWindow(infoWindow, map.getCenter());
          });
        }

        // 百度IP定位
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
          console.log(r)
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            // mk = new BMap.Marker(r.point);

            let myIcon = new BMap.Icon('/static/map32.png', new BMap.Size(32, 32));
            mk = new BMap.Marker(r.point, {icon: myIcon}); // 自定义图标

            // 拖拽事件
            mk.addEventListener("dragend", showInfo);
            mk.enableDragging();    //可拖拽

            // 显示位置
            getAddress(r.point);

            map.addOverlay(mk); // 把点添加到地图上
            map.panTo(r.point);

            console.log('您的当前位置：' + r.point.lng + ',' + r.point.lat);
          } else {
            console.error('获取位置失败：' + this.getStatus());
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  #container {
    margin: 30px auto;
    width: 100%;
    max-width: 750px;
    height: 400px;
  }
</style>
