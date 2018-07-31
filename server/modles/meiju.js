module.exports = { 
  zhuangtai:{
    shanchu: "07",
    weijiaofei: "06",
    weishenhe: "00",
    zhengchang:"01",
    buhege: "02",
    guoqi:"03",
    chexiao:"04",
    wancheng:"05",
    getName:function(val){
      let str="";
      switch (val){
        case "06": { str = "未缴费"; } break;
        case "00": { str = "未审核";}break;
        case "01": { str = "正常"; } break;
        case "02": { str = "不合格"; } break;
        case "03": { str = "过期"; } break;
        case "04": { str = "撤销"; } break;
        case "05": { str = "完成"; } break;
        case "07": { str = "删除"; } break;
      }
      return str;
    }

  }

 }