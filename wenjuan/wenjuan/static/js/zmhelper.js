//辅助方法
// canvas 填写文字自动换行
function xiezi(ctx, str, x, y, lineH) {
  //var str = "假如生活欺骗了你，请不要悲伤！thank you!"
  var lineWidth = x
  var initHeight = y
  var oldx = x
  var canvasWidth = ctx.canvas.width; //计算canvas的宽度
  //console.log(ctx)
  var lastSubStrIndex = 0; //每次开始截取的字符串的索引
  for (let i = 0; i < str.length; i++) {
    lineWidth += ctx.measureText(str[i]).width;
    if (lineWidth > canvasWidth) {
      i--
      initHeight += lineH; //20为字体的高度
      lineWidth = x;
      oldx = x
      lastSubStrIndex = i;
    } else { //绘制剩余部分
      ctx.fillText(str[i], oldx, initHeight);
      oldx = lineWidth
    }
  }
}
// canvas 填写文字居中，不再提供换行功能
function xiezi_juzhong(ctx, str, y) {
  var canvasWidth = ctx.canvas.width; //计算canvas的宽度
  var fontwidth= ctx.measureText(str).width;//字的宽度
  var x = (canvasWidth-fontwidth)/2; //每次开始截取的字符串的索引
  ctx.fillText(str, x, y);
}
