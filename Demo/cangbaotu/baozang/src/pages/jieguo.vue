<template>
  <div style="height:100%;" v-show="jiazaiok">
    <transition appear>
      <img id="mbimg" v-on:load="huihuakaishi" style="display: none" crossOrigin='anonymous' v-bind:src='mbimgsrc'  />
    </transition>
<div style="height: 5vh;text-align: center;font-size: 3vh;color: red">长按图片保存</div>
    <canvas id="huaban" v-bind:width="huabanw" v-bind:height="huabanh"  v-show="!jiazaiok"></canvas>
    <img v-show="jiazaiok" crossOrigin='anonymous' style="width:90vw;height: 80vh;" v-bind:src='downImg' />
    <div class="zm_center">
      <a v-if='false' download="downImg" v-bind:href='downImg' style='text-decoration:none'>
        <div style='background-color:red;width: 86vw;min-height: 30px;text-align: center;line-height:3.5vh;height: auto;'
          class='zm_btn' v-on:click='baocun'>分享给朋友 </div>
      </a>

    </div>
  </div>
</template>

<script>
  import {
    getList,
    postInfo
  } from "../service/getData";
  export default {
    name: "huanying",
    components: {},
    data() {
      return {
        jiazaiok:false,
        huabanw:300,
        huabanh:600,
        huaban: "null",
        mbimgsrc:"",
        jgimgsrc:"",
        downImg: "",
        diaochajieguo:"",
        x:30,
        y:50,
        H:30
      };
    },
    computed: {
      // 计算属性的 getter
      ceshijieguo: function () {
        // `this` 指向 vm 实例
        return "123"
      }
    },
    created: function () {
      console.log(window.innerWidth,window.innerHeight)
      this.huabanw=(window.innerWidth-20)*4
      this.huabanh=(window.innerHeight*0.8)*4
     //加载答案
      var that = this
        getList("zmapi/selnownode", {
          lccode: this.$route.params.liuchengcode,
          banben: this.$route.params.banben,
          jiedian: 'jieshu'
        }, function (r) {
        //  console.log("wenti_jiazaiwenti", r)
          let jiedianinfo = r.data.jg.peizhi
          let jgneirong=JSON.parse(jiedianinfo.daan)
         if(jgneirong.type=="img"){
          that.mbimgsrc=jgneirong[that.$route.params.wenti][that.$route.params.daan]
          that.diaochajieguo=""
         }else{
          that.mbimgsrc=jiedianinfo.fengmian
          that.diaochajieguo=jgneirong[that.$route.params.wenti][that.$route.params.daan]
          if(jgneirong.x){
            that.x=jgneirong.x
            that.y=jgneirong.y            
            that.h=jgneirong.h
          }
         }     
        });
    },
    methods: {
      huihuakaishi: function (el) {
        var mbimg = document.getElementById("mbimg")
        // mbimg.setAttribute("crossOrigin",'anonymous')
        // mbimg.src="http://api.yunkucun.top/ZmEngineSuCai/dzEaUZNd70scWW3XDRpy2MJK.png";
        this.huaban = document.getElementById("huaban")
        var ctx = this.huaban.getContext("2d");
        ctx.drawImage(mbimg, 0, 0, this.huaban.width, this.huaban.height);
        ctx.fillStyle = "#edea55";
        //ctx.fillRect(0,0,150,75);
        // ctx.font = " 30px arial"
        // xiezi_juzhong(ctx, "测试结果", 50)
        ctx.font = "80px arial"
        
        // ctx.fillStyle = "#00FF00";
        // ctx.fillText("str", 30, 30);
        console.log(this.diaochajieguo)
        ctx.textAlign = "left";
        xiezi(ctx,this.diaochajieguo,this.x,this.y,this.h);
        this.downImg = this.huaban.toDataURL('image/jpeg')
        //分享选项
        wxfenxiang({
        biaoti: $("title").text(), // 分享标题
        link: window.location.href.split("#")[0]+"#/home/"+ this.$route.params.liuchengcode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        img: $("#fenxiangtupian").attr("src"), // 分享图标
        miaoshu:$("#miaoshu").text(),
        huidiao: function (res) {
          //这里是回调函数 
         console.log(res)
        }
      })
        this.jiazaiok=true
      },
      baocun: function () {
        //保存图片
        //window.open("_blank", document.getElementById("huaban").toDataURL('image/png'))
    
      }

    }
  };

</script>
<style>

</style>
