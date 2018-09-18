var uploadfilesrc = 'http://localhost:8002/upload'
/* eslint-disable */
function ZMTitle(titlepname) {
  //console.log($('.html_title').text())
  $('.html_title').text(titlepname)
}

//绑定图片上传控件
function ZmImgUps(divId, filesArr, yulanId, imgshuliang = 99,shangchuanhuidiao) {
  // 这里是简单的调用，其余api请参考文档
  weui.uploader('#' + divId, {
    url: uploadfilesrc,
    auto: false,
    onBeforeQueued: function (files) {
      // `this` 是轮询到的文件, `files` 是所有文件
      if (["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0) {
        weui.alert('请上传图片');
        return false; // 阻止文件添加
      }
      if (this.size > 2 * 1024 * 1024) {
        weui.alert('请上传不超过2M的图片');
        return false;
      }
      if (filesArr.length + files.length > imgshuliang) { // 防止一下子选择过多文件
        weui.alert('最多只能上传' + imgshuliang + '张图片，请先删除');
        return false;
      }

      // return true; // 阻止默认行为，不插入预览图的框架
    },
    onBeforeSend: function (data, headers) {
      //console.log("onBeforeSend", this, data, headers);
      // $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
      // $.extend(headers, { Origin: 'http://127.0.0.1' }); // 可以扩展此对象来控制上传头部

      // return false; // 阻止文件上传
    },
    onSuccess: function (ret) {
     // console.log("onSuccess",this, ret);
     if(shangchuanhuidiao)shangchuanhuidiao(true,ret)
      // return true; // 阻止默认行为，不使用默认的成功态
    },
    onError: function (err) {
     // console.log("onError",this, err);
     if(shangchuanhuidiao)shangchuanhuidiao(false,err)
      // return true; // 阻止默认行为，不使用默认的失败态
    },
    onQueued: function () {
      filesArr.push(this);
    }
  });
  // 缩略图预览
  document.querySelector('#' + yulanId).addEventListener('click', function (e) {
    var target = e.target;

    while (!target.classList.contains('weui-uploader__file') && target) {
      target = target.parentNode;
    }
    if (!target) return;

    var url = target.getAttribute('style') || '';
    var id = target.getAttribute('data-id');

    if (url) {
      url = url.match(/url\((.*?)\)/)[1].replace(/"/g, '');
    }
    var gallery = weui.gallery(url, {
      onDelete: function () {
        weui.confirm('确定删除该图片？', function () {
          var index;
          for (var i = 0, len = filesArr.length; i < len; ++i) {
            var file = filesArr[i];
            if (file.id == id) {
              index = i;
              break;
            }
          }
          if (index !== undefined) filesArr.splice(index, 1);

          target.remove();
          gallery.hide();
        });
      }
    });
  });
}

//显示地图
function zmshowmap(divId,zuobiao,weizhiname){
  let map  = new AMap.Map(divId, {
    zoom: 16, //级别
    center: zuobiao //中心点坐标
  }); 
  // 构造点标记
  let marker = new AMap.Marker({
    icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
    position: zuobiao
  });
  map.add([marker]);
  //添加工具条
  map.plugin(["AMap.ToolBar"], function () {
    map.addControl(new AMap.ToolBar());
  });
  //构建信息窗体中显示的内容
  let infowindow = new AMap.AdvancedInfoWindow({
    content: weizhiname,
    placeSearch: false,
    asOrigin: false,
    offset: new AMap.Pixel(0, -30)
  });
  infowindow.open(map, zuobiao);
  return map;
}

function zmDituSousuo(divId,zuobiao,huidiaojg){
    //创建地图
    var map = new AMap.Map(divId, {
      zoom: 9,
      center: zuobiao
    });
    //加载PlaceSearch和Autocomplete插件
    AMap.service(["AMap.PlaceSearch", "AMap.Autocomplete"], function () {
      try {
        ready(map,huidiaojg);
      } catch (e) {
        console.error(e);
      }
    });
}
function ready(map,huidiao) {
  //搜索框支持自动完成提示
  var auto = new AMap.Autocomplete({
    city:'010',
    citylimit:true,
    input: 'tipinput'
  });
  //构造地点查询类
  var placeSearch = new AMap.PlaceSearch({
    city: "北京市",
    citylimit: true,
    pageSize: 5,
    pageIndex: 1,
    map: map,
    type: '餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|道路附属设施|地名地址信息|公共设施',
    extensions: "all",
    autoFitView: true,
    panel: "poiList"
  });
  //监听搜索框的提示选中事件
  AMap.event.addListener(auto, "select", function (e) {
    //开始搜索对应的poi名称
    placeSearch.search(e.poi.name, function (status, results) {
      console.log("xxx", results);
      //显示结果列表
      $('#ditupanel').removeClass('hidden');
      //隐藏loading状态
      $(document.body).removeClass('searching');
    });
    //显示loading状态
    $(document.body).addClass('searching');
  });

  //监听marker/列表的选中事件
  AMap.event.addListener(placeSearch, 'selectChanged', function (results) {
    //获取当前选中的结果数据
    huidiao(results.selected.data);
  });
  $('#clearSearchBtn').click(function () {
    //清除搜索框内容
    $('#tipinput').val('');
    placeSearch.clear();
  });
}
