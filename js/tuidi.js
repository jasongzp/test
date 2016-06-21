$(function(){

	var search_arr=[];
	var nameList=[];
	var stateList=[];
	$.ajax({
		type: 'GET',
		url: "http://test.pandauu.com/bapi/businesslist" ,
		success: function(date){
			var arr=date.data;
			for(var i=0;i<arr.length;i++){
				var newdate=arr[i].create_at.split("-");
				newdate=newdate[0]+" 年"+newdate[1]+" 月"+newdate[2]+" 日加入";
				addDom(arr[i].status_code,newdate,arr[i].name,arr[i].status,arr[i].address)
			}
				$(".list_wrap ._list ._title ._name").each(function(i){
					nameList[i]=$(this).text();
				});
				$(".list_wrap ._list ._title ._state").each(function(i){
					stateList[i]=$(this).text();
				});
			function addDom(type,time,name,state,addr){
				var _state;
				var str;
				if(type==2)_state="_state1";
				if(type==1)_state="_state2";
				if(type==0)_state="_state3";
				str='<a javascript:void(0); class="_list">'+
						'<h3 class="_title"><span class="_name">'+name+'</span><span class="'+_state+' _state">'+state+'</span></h3>'+
						'<h3 class="_time">'+time+'</h3>'+
						'<h3 class="_add">地址:<span class="add_msg">'+addr+'</span></h3>'+
					'</a>'

				$(".list_wrap").append(str);
			}
		} 
	});


				//fixed样式

				$("._fixed").css({
					"height":$(window).height(),
					"top":$("header._header").height()/3*2
				});
				//tag事件绑
				//添加商户事件绑定

				$("header._header ._more").bind("touchstart",function(){
					if(!$(this).hasClass("on")){
						$(this).addClass("on");
						$("._fixed").css("display","block");
						$(document).bind("touchmove",stopMove);
					}else{
						$(this).removeClass("on");
						$("._fixed").css("display","none");
						$(document).unbind("touchmove",stopMove);
					}
				});
				//搜索框架聚焦事件绑定

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
				//获取数据





				//选项卡事件绑定

				$(".tag_nav li").bind("touchstart",function(){
						var index=$(this).index();
						if(index==0){
							$(this).addClass("_index").siblings().removeClass("_index");
									checkList();
						}else{
							$(this).addClass("_index").siblings().removeClass("_index");
							var index=$(this).index();
							var str=$(this).text();
							creatList(str);
						}
					
				})
				//搜索图标事件绑定

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

				//事件函数部分 
				function stopMove(e){
					e.preventDefault();
				}


				function checkList(){
					search_arr=[];
					$(".tag_nav li").eq(0).addClass("_index").siblings().removeClass("_index");
					var str=$("#_search").val();
						for(var i=0;i<nameList.length;i++){
							if(nameList[i].indexOf(str)!=-1){
								$(".list_wrap ._list").eq(i).css("display","block")
								search_arr.push(i);
							}else{
								$(".list_wrap ._list").eq(i).css("display","none")
							}
						}
				}

				function creatList(str){
						if(search_arr.length!=0){
							for(var i=0;i<search_arr.length;i++){
								$(".list_wrap ._list").eq(search_arr[i]).css("display","block")
							}
							for(var i=0;i<search_arr.length;i++){
								var text=$(".list_wrap ._list").eq(search_arr[i]).find("._state").text();
								if(text!=str){
									$(".list_wrap ._list").eq(search_arr[i]).css("display","none");
								}
							}
						}else{
							$(".list_wrap ._list ._title span._state").each(function(i){
								if($(this).text()!=str){
									$(".list_wrap ._list").eq(i).css("display","none")
								}else{
									$(".list_wrap ._list").eq(i).css("display","block")
								}
							});
						}

				}
				function tagReset(){
					$(".tag_nav li").eq(0).addClass("_index").siblings().removeClass("_index");
					$(".list_wrap ._list").css("display","block")
				}
})