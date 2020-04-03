<template>
  <div>
    <h3>BaiduMap</h3>
    <p>
      <a href="http://lbsyun.baidu.com/jsdemo.htm#a1_2" target="_blank">百度地图官方示例</a>
      <a href="http://lbsyun.baidu.com/index.php?title=webapi" target="_blank">Web服务API</a>
    </p>
    <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
    <div id="mapContainer"></div>
    <div>
      当前位置：{{JSON.stringify(selectAddress.point)}}，{{selectAddress.address}}
    </div>
    <el-button type="primary" @click="geocoding">地理编码</el-button>
    <el-button type="primary" @click="reverseGeocoding">全球逆地理编码</el-button>
  </div>
</template>

<script>
  import MapUtil from '@/baiduMap'

  export default {
    name: "BaiduMap",
    data() {
      return {
        baiduKey: 'S5R7uI5TAunarUxvOduczhg32GnSlYTn',
        selectAddress: {}
      }
    },
    mounted() {
      let that = this;
      this.$nextTick(function () {
        let _options = {
          ak: that.baiduKey,
          callBack: (BMap) => {
            that.initMap(); // 异步加载方式
          },
          error: (err) => {
            console.error(err)
          }
        }
        // MapUtil.loadMap(_options);

        that.initMap(); // 非异步加载方式
      });
    },
    methods: {
      /**
       * 初始化百度地图
       * */
      initMap() {
        let that = this;
        let map = null, point = null;
        let mk = {}, infoWindow = {};

        // 初始化地图
        let initMap = () => {
          createMap(); // 创建地图
          setMap(); // 设置地图
          addMapControl(); // 添加地图控件
          addMapEvent(); // 添加地图事件
          getLocation(); // 浏览器定位
          addCustomControl(); // 自定义控件，支持搜索功能
        }

        // 创建地图
        let createMap = () => {
          map = new BMap.Map("mapContainer", {minZoom: 5, maxZoom: 19}); // 创建百度地图容器，并设置最大，最小级别
          point = new BMap.Point(113.988775, 22.557036); // 定义一个中心点坐标
          map.centerAndZoom(point, 5);  // 初始化地图，设置中心点坐标和地图级别[1-19]

          setTimeout(function () {
            map.setZoom(16);
          }, 1000);  //1秒后放大
        }

        // 地图事件设置函数
        let setMap = () => {
          map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
          map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
          map.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
          map.enableKeyboard(); //启用键盘上下左右键移动地图
        }

        // 地图控件添加函数
        let addMapControl = () => {
          //向地图中添加缩放控件
          var ctrl_nav = new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_TOP_LEFT,
            type: BMAP_NAVIGATION_CONTROL_LARGE
          });
          map.addControl(ctrl_nav);
          //向地图中添加缩略图控件
          var ctrl_ove = new BMap.OverviewMapControl({
            anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
            isOpen: 1
          });
          map.addControl(ctrl_ove);
          //向地图中添加比例尺控件
          var ctrl_sca = new BMap.ScaleControl({
            anchor: BMAP_ANCHOR_BOTTOM_LEFT
          });
          map.addControl(ctrl_sca);
        }

        // 添加地图事件
        let addMapEvent = () => {
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
              mk.addEventListener("dragend", getAddress);
              mk.enableDragging();    //可拖拽

              map.addOverlay(mk); // 把点添加到地图上
              map.panTo(rs.point);

              // 显示位置信息
              showInfo(rs);
            })
          });
        }

        // 浏览器定位
        let getLocation = () => {
          // 百度浏览器定位
          var geolocation = new BMap.Geolocation();
          geolocation.getCurrentPosition(function (r) {
            console.log(r)
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {

              // 删除原有mk点
              map.removeOverlay(mk);

              let myIcon = new BMap.Icon('/static/map32.png', new BMap.Size(32, 32));
              mk = new BMap.Marker(r.point, {icon: myIcon}); // 自定义图标

              // 拖拽事件
              mk.addEventListener("dragend", getAddress);
              mk.enableDragging();    //可拖拽

              // 显示位置
              getAddress(r);

              map.addOverlay(mk); // 把点添加到地图上
              map.panTo(r.point);

              console.log('您的当前位置：' + r.point.lng + ',' + r.point.lat);
            } else {
              console.error('获取位置失败：' + this.getStatus());
            }
          });
        }

        // 添加自定义控件，支持搜索功能
        function addCustomControl() {
          // 定义一个控件类
          function ZoomControl() {
            this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;		//anchor表示控件停靠在地图的哪个角
            this.defaultOffset = new BMap.Size(100, 20);		//提供偏移量，用来指示控件距离地图边界相隔多少像素。
          }

          // 通过JS的prototype属性继承BMap.Control
          ZoomControl.prototype = new BMap.Control();
          // 自定义控件必须实现自己的init方法，并将控件的DOM元素返回，该方法中创建div元素作为控件容器，并添加到地图容器中
          ZoomControl.prototype.initialize = function (map) {
            //创建一个DOM元素
            var div = document.createElement("div");
            div.innerHTML = `
                <div class="map-search-container">
                    <input type="text" id="address" class="map-search-input" placeholder="搜索地点" />
                    <button class="map-search-btn" type="button" >搜索</button>
                </div>`
            map.getContainer().appendChild(div);
            return div;
          }
          //创建控件
          var myZoom = new ZoomControl();
          //添加到地图中
          map.addControl(myZoom);
          map.addControl(new BMap.NavigationControl());
          map.addControl(new BMap.OverviewMapControl());

          var searchVal;
          //百度地图自动完成搜索
          var autoSearch = new BMap.Autocomplete({
            "input": "address",
            "location": map
          });

          // 设置搜索结果确认事件
          autoSearch.addEventListener("onconfirm", function (e) {
            var _value = e.item.value;
            searchVal = _value.province + _value.city + _value.district + _value.street + _value.business;
            document.getElementById("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />searchVal = " + searchVal;
            setPlace();
          });

          // 设置搜索事件
          document.getElementsByClassName('map-search-btn')[0].onclick = function () {
            searchVal = document.getElementById('address').value;
            if (searchVal.trim() == '') {
              that.$message({
                message: '请输入搜索地址',
                type: 'warning'
              });
              return;
            }

            // 设置地点
            setPlace();
          }

          // 设置地点
          function setPlace() {
            function mySearch(rs) {
              console.log('搜索位置：', rs)
              var pp = local.getResults().getPoi(0);
              if (!pp) {
                that.$message({
                  message: '信息模糊，请使用文本提示下拉搜索',
                  type: 'warning'
                });
                return;
              }
              // 记录位置
              that.selectAddress = {point: pp.point};
              map.centerAndZoom(pp.point, 15);
              // map.addOverlay(new BMap.Marker(pp.point));		//添加标注
              map.removeOverlay(mk);//删除之前的label

              let myIcon = new BMap.Icon('/static/map32.png', new BMap.Size(32, 32));
              mk = new BMap.Marker(pp.point, {icon: myIcon}); // 自定义图标

              // 拖拽事件
              mk.addEventListener("dragend", getAddress);
              mk.enableDragging();    //可拖拽

              map.addOverlay(mk); // 把点添加到地图上

              var _html = `
                <div class="maptips">
                  <div class="maptips_title" style="color:#3f292e;font-size:14px;font-weight:bold;margin-bottom: 10px;">
                    ${rs.keyword}
                  </div>
                  <div class="maptips_address" style="font-size:12px;" >
                    <b>地址：</b>${rs.keyword}
                  </div>
                </div>`;
              infoWindow = new BMap.InfoWindow(_html);
              mk.openInfoWindow(infoWindow, map.getCenter());
            };
            var local = new BMap.LocalSearch(map, {
              onSearchComplete: mySearch
            });
            local.search(searchVal);
          }
        }

        // 初始化地图
        initMap();

        // 获取位置信息
        function getAddress(e) {
          var gc = new BMap.Geocoder();
          gc.getLocation(e.point, function (rs) {
            showInfo(rs)
          });
        }

        //绑定Marker的拖拽事件
        function showInfo(rs) {
          console.log(rs)
          // 记录位置
          that.selectAddress = rs;
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
            </div>`;
          infoWindow = new BMap.InfoWindow(_html);
          mk.openInfoWindow(infoWindow, map.getCenter());
        }
      },
      /**
       * 地理编码
       * 官网：http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding  --服务文档
       */
      geocoding() {
        let _url = `http://api.map.baidu.com/geocoding/v3/?address=${this.selectAddress.address}&output=json&ak=${this.baiduKey}&callback=_geocodingResult`
        var head = document.getElementsByTagName('head')[0]; //兼容IE
        var script = document.createElement('script');
        window._geocodingResult = (res) => {
          console.log('地理编码v3', res);
        }
        script.type = 'text/javascript';
        script.src = _url;
        script.onerror = () => {
          console.error('解析失败')
        };
        head.appendChild(script);
      },
      //
      /**
       * 全球逆地理编码
       * 官网：http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding-abroad  --服务文档
       */
      reverseGeocoding() {
        let location = this.selectAddress.point.lat + ',' + this.selectAddress.point.lng;
        /**
         * v3版本API
         */
        // let _url = `http://api.map.baidu.com/reverse_geocoding/v3/?callback=_renderResult&ak=${this.baiduKey}&output=json&coordtype=wgs84ll&location=${location}`;
        // var head = document.getElementsByTagName('head')[0]; //兼容IE
        // var script = document.createElement('script');
        // window._renderResult = (res) => {
        //   console.log('全球逆地理编码v3', res);
        // }
        // script.type = 'text/javascript';
        // script.src = _url;
        // script.onerror = () => {
        //   console.error('解析失败')
        // };
        // head.appendChild(script);

        /**
         * v2版本API
         */
        let _url = `http://api.map.baidu.com/geocoder/v2/?callback=_renderResult&location=${location}&output=json&pois=1&ak=${this.baiduKey}`;
        var head = document.getElementsByTagName('head')[0]; //兼容IE
        var script = document.createElement('script');
        window._renderResult = (res) => {
          console.log('全球逆地理编码v2', res);
        }
        script.type = 'text/javascript';
        script.src = _url;
        script.onerror = () => {
          console.error('解析失败')
        };
        head.appendChild(script);
      },
    }
  }
</script>

<style type="text/css">
  .maptips_title {
    padding-right: 10px;
  }

  .map-search-container {
    box-sizing: border-box;
  }

  .map-search-container .map-search-input {
    width: 230px;
    box-sizing: border-box;
    float: left;
    margin-bottom: 0;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .map-search-container .map-search-input:focus {
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
  }

  .map-search-container .map-search-btn {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-left: -1px;
    color: #333;
    background-color: #fff;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 4px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-color: #ccc;
  }

  .map-search-container .map-search-btn:hover {
    background-color: #e6e6e6;
    border-color: #adadad;
  }
</style>

<style lang="scss" scoped>
  #mapContainer {
    margin: 30px auto;
    width: 700px;
    height: 500px;
  }
</style>
