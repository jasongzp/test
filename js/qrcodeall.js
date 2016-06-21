/**
 * 页面加载入口
 */
 require.config({
 	baseUrl : 'js/',
 	paths : {
 		lm : './vendor/lm',
 		jquery : './jquery-2.1.0',
 		template : './vendor/template',
 		tpl : './vendor/tpl',
 	},
 });

define(['jquery','template','tpl','lm',],function($,template,tpl,lm){

	$(document).ready(function() {
		lm.Lm_init(function(){
			var self = this;
			var urlData = lm.getPathName()||{};
			/*
				获取二维码
			*/
			lm.ajax({
				    type: 'GET',
				    url: lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.qrcodelist,
			}).done(function(data){
				if(data.code==0){
					self.qrcodeallList = data.data;
				}else if(data.code!=107){
					alert(data.code+":"+data.msg)
				}
			
			})


			//input start

				$("#_search").bind("focus",function(){
					if(!$(this).hasClass("on")){
						$(this).addClass("on")
						$(this).animate({width:"85%"},500,function(){
							$(".closeText").show();
						})
					}
				});

				//搜索框架输入事件绑定
				$("#_search").bind("input",function(){
					checkList();
					if($(this).val()){
						$(".closeImg").show();
					}else{
						$(".closeImg").hide();
					}
				});
				$(".search_wrap label").bind("touchstart",checkList);

				//X点击效果
				$(".closeImg").bind("touchstart",function(){
					$(".closeImg").hide();
					$("#_search").val("");
					checkList();
				})

				//取消点击效果
				$(".closeText").bind("touchstart",function(){
					$(".closeImg").hide();
					$("#_search").removeClass("on");
					$("#_search").val("");
					checkList();
					$(this).hide();
					$("#_search").animate({width:"100%"},500);

				})

				//键盘事件绑定
				$("#_search").keydown(function(e){
					if(e.keyCode=="13"){
						e.preventDefault();
						checkList();
					}
				});

				//list数据渲染
				function checkList(){
					$("._list").css("display","block");
					var str=$("#_search").val();
					$("._list").each(function(){
						if($(this).find("._text").text().indexOf(str)!=-1){
							$(this).show();
						}else{
							$(this).hide();
						}
					})
				}

			// input end


				//fixed点击空白区域关闭
				$(".js-close").click(function(){
					$("._fixed").hide();
				})

				// 点击申请按钮
				$("._con ._apply").bind("click",function(){
					$("._fixed").show();
				});
				
				// 点击确定
				$("._fixed ._send").bind("click",function(){
					$('#load').removeClass('none');
					$.ajax({
					    type: 'POST',
					    data:{num:Number($("[data-wl-num]").text())},
					    url:lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.sendmateriel,
					    success: function(data){
					    	if(data.code==0){
					    		window.location.href="wlnum.html#"+$("[data-wl-num]").text();
					    	}else if(data.code!=107){
					    		alert(data.code+":"+data.msg);
					    	}
							$('#load').addClass('none');
					    }
					});
						
				});

				//数目加减
				$("._fixed .btn_1").bind("touchstart",function(){
					var num=parseInt($("._fixed ._num").text());
					if(num>=10){
						num-=5;
						$("._fixed ._num").text(num);
					}
				})
				$("._fixed .btn_2").bind("touchstart",function(){
					var num=parseInt($("._fixed ._num").text());
					if(num<=15){
						num+=5;
						$("._fixed ._num").text(num);
					}
				})
		});
		
	});
});



