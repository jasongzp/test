/**
 * 页面加载入口
 */
 require.config({
 	baseUrl : 'js/',
 	paths : {
 		lm : './vendor/lm',
 		jquery : './jquery-2.1.0',
 		template : './vendor/template',
 		tpl : './vendor/tpl'
 	},
 });

define(['jquery','template','tpl','lm',],function($,template,tpl,lm){

	$(document).ready(function() {

		lm.Lm_init(function(){
			var self=this;
			var typestr=[];
			var permsg={};
			$("[data-clear-session]").click(function(){
				sessionStorage.removeItem("b_id");
				window.location.href="noqrcode.html";
			})
			//addPer({});
			lm.ajax({
					type: 'GET',
					data:permsg,
					url: lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.bdlist ,
			}).done(function(data){
					if(data.code==0){
						self.bdList2=data.data;
					}else if(data.code!=107){
						alert("错误信息："+data.msg)
					}else{
						$(".add_mer").show();
					}
			})
			function searchPer(obj){
				lm.ajax({
					type: 'GET',
					data:obj||{},
					url: lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.bdlist ,
				}).done(function(data){
					if(data.code==0){
						self.bdList2=data.data;
					}else if(data.code!=107){
						alert("错误信息："+data.msg)
					}else{
						self.bdList2=null;
						$("._none").show();
						$(".add_mer").hide();
					}
				})
			}
			self.per_href=function(e,id){
				window.location.href='perMsg.html?id=' + id;
			}

			
			$("._fixed").css({
					"height":$(window).height(),
					"top":$("header._header").height()/3*2
			});


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
					//checkList();
					if($(this).val()){
						$(".closeImg").show();
					}else{
						$(".closeImg").hide();
					}
				});

				

				//选项卡事件绑定

				$(".tag_nav li").bind("click",function(){
						$("._none").hide();
						$(".add_mer").hide();
						var index=$(this).index();
						$("#_search").val("");
						if(index==0){
							$(this).addClass("_index").siblings().removeClass("_index");
								//checkList();
								typestr=[];
								searchPer();
						}else{
							$(this).addClass("_index").siblings().removeClass("_index");
							var index=$(this).index();
							var str=$(this).text();
							typestr[0]=index%2;
							searchPer({"status":typestr[0]});
						}
				})

				$(".closeImg").bind("touchstart",function(){
					$(".closeImg").hide();
					$("#_search").val("");
				})
				//取消点击效果

				$(".closeText").bind("touchstart",function(){
					$(".closeImg").hide();
					$("#_search").removeClass("on");
					$("#_search").val("");
					$(this).hide();
					$("#_search").animate({width:"100%"},500);

				})

				//键盘事件绑定
				$("#_search").keydown(function(e){
					if(e.keyCode=="13"){
						e.preventDefault();
						getPer();
					}
				});

				function getPer(){
					permsg={};
					if($("#_search").val())permsg["name"]=$("#_search").val();
					if(typestr.length==1)permsg["status"]=typestr[0];
					searchPer(permsg);
				}
		});
	});
});



