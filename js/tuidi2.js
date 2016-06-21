$(function(){
	var search_arr=[];
	var nameList=[];
	var stateList=[];
	$("[data-clear-session]").click(function(){
		//alert(1);
		sessionStorage.removeItem("b_id");
		window.location.href="noqrcode.html";
	})
	var defer = $.ajax({
		type: 'GET',
		url: "http://test.pandauu.com/bapi/bdlist" ,
		success: function(data){
			if(data.code==0){
				var arr=data.data;
				console.log(arr);
				if(arr.length){
					$("[data-none-per]").hide();
				}
				for(var i=0;i<arr.length;i++){
					var newdate=arr[i].create_at.split("-");
					newdate=newdate[0]+" 年"+newdate[1]+" 月"+newdate[2]+" 日加入";
					addDom(arr[i].status_code,newdate,arr[i].name,arr[i].mobile,arr[i].status,arr[i].business_name_cn,arr[i].is_default,arr[i].id)
				}
				$(".per_list .per ._title .per_name").each(function(i){
					nameList[i]=$(this).text();
				});
				$(".per_list .per ._title .g_right").each(function(i){
					stateList[i]=$(this).text();
				});
				function addDom(type,time,name,phone,state,mer,cont,id){
					var contClass="";
					var _state;
					var str;
					if(type==0)_state="state1";
					if(type==1)_state="state2";
					if(cont==0)contClass=" ";
					if(cont==1)contClass=" index";
						str='<li click="per_href(e,'+id+')" class="per'+contClass+'" data-id="' + id + '">'+
						'<h3 class="_title">'+
							'<a href="javascript:void(0)" class="per_name">'+name+'</a>'+
							'<span class="g_right '+_state+' _state">'+state+'</span>'+
						'</h3>'+
						'<section class="per_msg">'+
							'<p class="date">'+
								'<span class="_text">'+time+'</span>'+
								'<span class="g_right">'+mer+'</span>'+
							'</p>'+
							'<p class="tel">'+
								'<span class="phone">'+phone+'</span>'+
								'<a class="g_right" href="tel:'+phone+'"><img src="images/ic_03.png"></a>'+
							'</p>'+
						'</section>'+
					'</li>'

					$(".per_list").append(str);
				}
			}else if(data.code!=107){
				alert("错误信息："+data.msg)
			}
		} 
	});

	/*defer.then(function(){

			查看地推员详情

		$('.per_list .per').unbind('click').bind('click',function(e){
			var id = $(this).data('id');
			window.location.href = 'perMsg.html?id=' + id;
		});
	});*/
		function per_href(e,id){
			window.location.href = 'perMsg.html?id=' + id;
		}
		


				var typestr=[];
				//fixed样式

				$("._fixed").css({
					"height":$(window).height(),
					"top":$("header._header").height()/3*2
				});
				//tag事件绑定
				//添加商户事件绑定

				// $("header._header ._more").bind("touchstart",function(){
				// 	if(!$(this).hasClass("on")){
				// 		$(this).addClass("on");
				// 		$("._fixed").css("display","block");
				// 		$(document).bind("touchmove",stopMove);
				// 	}else{
				// 		$(this).removeClass("on");
				// 		$("._fixed").css("display","none");
				// 		$(document).unbind("touchmove",stopMove);
				// 	}
				// });
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
					//checkList();
					if($(this).val()){
						$(".closeImg").show();
					}else{
						$(".closeImg").hide();
					}
				});
				//获取数据


				

				//选项卡事件绑定

				$(".tag_nav li").bind("click",function(){
						var index=$(this).index();
						$("#_search").val("");
						if(index==0){
							$(this).addClass("_index").siblings().removeClass("_index");
								//checkList();
								typestr=[];
								addPer({})
						}else{
							$(this).addClass("_index").siblings().removeClass("_index");
							var index=$(this).index();
							var str=$(this).text();
							typestr[0]=index%2;
							addPer({"status":typestr[0]});

							//creatList(str);
						}
				})
				//搜索图标事件绑定

				//$(".search_wrap label").bind("touchstart",checkList);
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
						//checkList();
						getPer();
					}
				});

				//事件函数部分 
				function stopMove(e){
					e.preventDefault();
				}


				function getPer(){
					var permsg={};
					if($("#_search").val())permsg["name"]=$("#_search").val();
					if(typestr.length==1)permsg["status"]=typestr[0];
					console.log(permsg)
					/*$.ajax({
						type: 'GET',
						url: "http://test.pandauu.com/bapi/bdlist" ,
						data:permsg,
						success: function(date){
							var arr=date.data;
							console.log(arr)
						}
					})*/
					addPer(permsg);
				}


				function addPer(permsg){
					$(".per_list").html("")
					$.ajax({
						type: 'GET',
						data:permsg,
						url: "http://test.pandauu.com/bapi/bdlist" ,
						success: function(date){
							var arr=date.data;
							console.log(arr);
							if(arr.length){
								$("[data-none-per]").hide();
							}
							for(var i=0;i<arr.length;i++){
								var newdate=arr[i].create_at.split("-");
								newdate=newdate[0]+" 年"+newdate[1]+" 月"+newdate[2]+" 日加入";
								addDom(arr[i].status_code,newdate,arr[i].name,arr[i].mobile,arr[i].status,arr[i].business_name_cn,arr[i].is_default,arr[i].id)
							}
							$(".per_list .per ._title .per_name").each(function(i){
								nameList[i]=$(this).text();
							});
							$(".per_list .per ._title .g_right").each(function(i){
								stateList[i]=$(this).text();
							});
							function addDom(type,time,name,phone,state,mer,cont,id){
								var contClass="";
								var _state;
								var str;
								if(type==0)_state="state1";
								if(type==1)_state="state2";
								if(cont==0)contClass=" ";
								if(cont==1)contClass=" index";
									str='<li class="per'+contClass+'" data-id="' + id + '">'+
									'<h3 class="_title">'+
										'<a href="perMsg.html#'+id+'" class="per_name">'+name+'</a>'+
										'<span class="g_right '+_state+' _state">'+state+'</span>'+
									'</h3>'+
									'<section class="per_msg">'+
										'<p class="date">'+
											'<span class="_text">'+time+'</span>'+
											'<span class="g_right">'+mer+'</span>'+
										'</p>'+
										'<p class="tel">'+
											'<span class="phone">'+phone+'</span>'+
											'<a class="g_right" href="tel:'+phone+'"><img src="images/ic_03.png"></a>'+
										'</p>'+
									'</section>'+
								'</li>'

								$(".per_list").append(str);
							}
						} 
					});
				}
				/*function checkList(){
					search_arr=[];
					$(".tag_nav li").eq(0).addClass("_index").siblings().removeClass("_index");
					var str=$("#_search").val();
					
						for(var i=0;i<nameList.length;i++){
							if(nameList[i].indexOf(str)!=-1){
								$(".per_list .per").eq(i).css("display","block");
								search_arr.push(i);
							}else{
								$(".per_list .per").eq(i).css("display","none")
							}
						}
				}

				function creatList(str){
						if(search_arr.length!=0){
							for(var i=0;i<search_arr.length;i++){
								$(".per_list .per").eq(search_arr[i]).css("display","block")
							}
							for(var i=0;i<search_arr.length;i++){
								var text=$(".per_list .per").eq(search_arr[i]).find("._state").text();
								if(text!=str){
									$(".per_list .per").eq(search_arr[i]).css("display","none");
								}
							}
						}else{
							$(".per_list .per ._title span.g_right").each(function(i){
								if($(this).text()!=str){
									$(".per_list .per").eq(i).css("display","none")
								}else{
									$(".per_list .per").eq(i).css("display","block")
								}
							});
						}
					}

				function tagReset(){
					$(".tag_nav li").eq(0).addClass("_index").siblings().removeClass("_index");
					$(".per_list .per").css("display","block");
				}*/
})