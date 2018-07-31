/*
guopengcheng
2015-11-30
后台管理
*/
(function($){
	$.fn.jrdek=function(options){
		$.fn.jrdek.defaults={
			type:"tip", //方法名称,默认tip
			//左侧菜单参数
			foldCell:"", //折叠左侧菜单className
			//后台自适应浏览器窗口参数
			Mtop:"", //顶部的className
			Mleft:"", //左侧的className
			Mright:"", //右侧的className
			Mfooter:"" //底部的className
		};
		return this.each(function(){
			var opts = $.extend({},$.fn.jrdek.defaults,options);
			$(function(){
				//默认给定容器宽高
				function free(){
					var Width=$(window).width(); 
					var Height=$(window).height();
					var tWidth=$(opts.Mleft).innerWidth(); //左侧宽度
					var tHidth=$(opts.Mtop).innerHeight(); //top高度
					var bHidth=$(opts.Mfooter).innerHeight(); //底部高度
					$(opts.Mleft).css("height",(Height-tHidth-bHidth)+'px'); 
					$(opts.Mright).css("height",(Height-tHidth-bHidth-40)+'px');
					if($(opts.Mleft).is(":hidden")){
						$(opts.Mright).css("width",(Width-40)+'px');
					}else{
						$(opts.Mright).css("width",(Width-tWidth-40)+'px');
					}
                }
                $(opts.Mleft).show(); //默认左侧菜单显示
				free();
				Roll();
				//自适应浏览器窗口（适用于后台布局）
				//当浏览器宽高发生改变时给定容器宽高
				$(window).resize(function(){
					var fold =$(opts.Mleft).css("display"); //左侧菜单的display属性
					if(fold=="none"){
						free();
						$(opts.Mright).css("width",$(window).width()-40);
					}else{
						free();
					}
					Roll();
					return false;
				});
				//折叠左侧菜单
				$(opts.foldCell).on("click",function(){
					var fold =$(opts.Mleft).is(".min_w");
					if(fold==true){
						var movetxt = $(".min_w .menu_icon").parent();
						movetxt.off("mouseover");
						$(opts.Mleft).removeClass("min_w");
						free();
					}else{
						$(opts.Mleft).addClass("min_w");
						$(opts.Mright).css("width",$(window).width());
						minMenu();
						free();
					}
					return false;
				});
				//----折叠时提示
				function minMenu(){
					var movetxt = $(".min_w .menu_icon").parent("li");
					movetxt.mouseover(function(){
						var txt = $(this).find("a").text(),
							html = "<div class='out_txt'><i class='fa fa-caret-left'></i><span>"+txt+"</span></div>",
							appnum = $(this).find(".out_txt").length;
						if(appnum<=0){
							$(this).append(html).css("position","relative");
						}
					});
					movetxt.mouseout(function(){
						$(this).find(".out_txt").remove();
					});
				}
				//nav
				
				$(".nav li").on("click",function(){
					$("iframe[name='cont_box']").css("opacity","0");
					$(".loading").show();
					var that = $(this),
						dataId = $(this).find("p").attr("data-id"),
						dataFast = $(this).find("p").attr("data-fast");
					/*普通方式，只是改变菜单的显示隐藏*/
					var flag = 0;
					if(dataFast!=undefined){
						$(".menu li").each(function(){
							if($(this).find("a").attr("data-fast")==dataFast&&flag<=0){
								$(this).show();
								$(this).addClass("curr").siblings().removeClass("curr");
								$(".main_right").find("iframe").prop("src",$(this).find("a").attr("data-href"));
								flag += 1;
							}else if($(this).find("a").attr("data-fast")==dataFast&&flag>0){
								$(this).show();
							}else{
								$(this).hide();
							}
						});
					}else{
						$(".menu li").each(function(){
							if($(this).find("a").attr("data-id")==dataId&&flag<=0){
								$(this).show();
								$(this).addClass("curr").siblings().removeClass("curr");
								$(".main_right").find("iframe").prop("src",$(this).find("a").attr("data-href"));
								flag += 1;
							}else if($(this).find("a").attr("data-id")==dataId&&flag>0){
								$(this).show();
							}else{
								$(this).hide();
							}
						});
					}
					$(this).addClass("curr").siblings().removeClass("curr");
					$(opts.Mleft).show();
					free();
					
					/*ajax方式追加*/
	//				$.ajax({
	//					type:"post",
	//					url:"js/menu.json",
	//					data:{id:dataId},
	//					success:function(data){
	//						$(".menu").html("");
	//						for(var i=0;i<data.length;i++){
	//							$(".menu").append("<li><i class='menu_icon fa fa-"+data[i].icon+"'></i><a href='javascript:void(0);' data-href="+data[i].href+">"+data[i].name+"</a></li>");
	//						}
	//						$(this).addClass("curr").siblings().removeClass("curr");
	//						$(opts.Mleft).show();
	//						$(".menu li").eq(0).addClass("curr");
	//						$(".main_right").find("iframe").prop("src",$(".menu li").eq(0).find("a").attr("data-href"));
	//						free();
	//					}
	//				});
					minMenu();
					return false;
				});
				//menu
				$("body").on("click",".menu li",function(){
					$("iframe[name='cont_box']").css("opacity","0");
					$(".loading").show();
					$(this).addClass("curr").siblings().removeClass("curr");
					var dataHref = $(this).find("a").attr("data-href");
					$(opts.Mright).children().prop("src",dataHref);
				});
				//返回首页时
				$(".header .logo").click(function(){
					$(opts.Mleft).hide(); //左侧菜单隐藏
					$(".nav li").removeClass("curr");
					free();
					return false;
				});
				//nav roll
				//导航滚动
				function Roll(){
					$(".nav ul").css("width",parseInt($(".nav li").outerWidth())*parseInt($(".nav").find("li").length));
					var navW = $(".nav ul").width(),
						navL = $(".logo").outerWidth(),
						navR = $(".login_msg").outerWidth(),
						bodyW = $(window).width();
					if(bodyW<parseInt(navW)+parseInt(navL)+parseInt(navR)){
						var rollW = $(".nav_roll").outerWidth(),
							num = parseInt((parseInt(bodyW)-parseInt(navL)-parseInt(navR)-parseInt(rollW))/parseInt($(".nav li").outerWidth())),
							newW = parseInt($(".nav li").outerWidth())*num;
						$(".nav_roll").show();
						$(".nav").css("width",newW);
					}else{
						$(".nav_roll").hide();
						$(".nav").css("width",parseInt(bodyW)-parseInt(navL)-parseInt(navR)-10);
					};
				};
				var offset = parseInt($(".nav ul").width())-parseInt($(".nav").width());
				$(window).resize(function(){
					offset = parseInt($(".nav ul").width())-parseInt($(".nav").width());
					if($(".nav ul").width()<=$(".nav").width()){
						$(".nav ul").animate({
			                left:"0px"
			            },300);
					}
				});
				function navLeft(){
					if($(".nav ul").position().left < 0){
						$(".nav_roll .f_left").off("click");
						$(".nav ul").animate({
			                left:$(".nav ul").position().left+parseInt($(".nav li").outerWidth())+"px"
			            },300,function(){
			            	$(".nav_roll .f_left").on("click",navLeft);
			            });
					}
				}
				function navright(){
					if($(".nav ul").position().left > -offset){
						$(".nav_roll .f_right").off("click");
						$(".nav ul").animate({
			                left:$(".nav ul").position().left+parseInt(-$(".nav li").outerWidth())+"px"
			            },300,function(){
			            	$(".nav_roll .f_right").on("click",navright);
			            });
					}
				}
				$(".nav_roll .f_left").click(function(){
					navLeft();
				});
				$(".nav_roll .f_right").click(function(){
					navright();
				});
				//预约快捷方式
				$(".notification-laber").on("click",function(){
					var dataFast = $(this).find("span").attr("data-fast"),
						flag = 0;
					$(".menu li").each(function(){
						if($(this).find("a").attr("data-fast")==dataFast){
							$(this).show();
							$(this).addClass("curr").siblings().removeClass("curr");
							$(".main_right").find("iframe").prop("src",$(this).find("a").attr("data-href"));
							flag += 1;
						}else if($(this).find("a").attr("data-fast")==dataFast&&flag>0){
							$(this).show();
						}else{
							$(this).hide();
						}
					});
					$(".nav li").each(function(){
						if($(this).find("p").attr("data-id")=="appointment"){
							$(this).addClass("curr").siblings().removeClass("curr");
						}
					});
					$(opts.Mleft).show();
					free();
				});
			});
		});
	};
})(jQuery);



