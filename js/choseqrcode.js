/**
 * 
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

define(['jquery','template','tpl','lm'],function($,template,tpl,lm){

	var nameList=[];
	var stateList=[];
	/*var deffer = $.ajax({
	    type: 'GET',
	    url: lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.businesslist,
	    success: function(data){
	    	if(data.code==0){
				var arr=data.data;
	    		render(arr);
	    	}else{
	    		alert("错误信息:"+data.msg)
	    	}
	    	
	    }
	});*/
	/*
		渲染数据
	*/
	$.ajax({
				    type: 'GET',
				    data:{"status":2},
				    url: "http://piao.pandauu.com/bapi/qrcodelist" ,
				    success: function(date){
				    	if(date.code==0){
					    	var arr=date.data;
					    	for(var i=0;i<arr.length;i++){
					    		addDom(arr[i].status_code,arr[i].name_cn,arr[i].name_en,arr[i].qrcode_id,arr[i].status);
					    	}
					    	$(".list_wrap .qcode").each(function(){
					    		nameList.push($(this).find("._text").text());
					    	});
					    	$('.list_wrap .qcode').click(function(){
					    		var r=confirm($(this).find("._text").text()+"\n确定关联该二维码"+"\n关联成功后不可更改")
								if (r==true){
						    		var str=sessionStorage.getItem("permsg");
						    		str+="&qrcode_id="+$(this).find("._text").text();
						    		var qrcode=$(this).find("._text").text();
						    		$.ajax({
									    type: 'POST',
									    url: lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.addbd,
									    data:str,
									    success: function(data){
									    	if(data.code==0){
									    		lm.lmClearStorage(lm.sessionClass.addBdSe);
									    		lm.lmClearStorage(lm.sessionClass.addBdShop);
									    		window.location.href = 'addsucc.html?qcode='+qrcode;
									    	}else{
									    		alert("错误代码："+data.code+"\n错误信息："+data.msg);
									    		console.log(data)
									    	}
									    }
									});
								}
					    	})
				   		}else if(date.code==107){
				   			$("[data-apply]").css({
					    			visibility:"visible"
					    	});
				   		}else{
				   			alert("错误代码："+date.msg)
				   		}
				    	function addDom(state,name1,name2,id,con){
				    			if(state==1){
				    				return ;
				    			}
				    			var stateStr="";
	
				    			stateStr="<span class='_state'>"+con+"</span>";
				    			var str='<a href="javascript:void(0)" class="qcode">'+
								'<span class="_border"></span>'+
								'<span class="_text">'+id+'</span>'+
								stateStr+
								'</a>';
				    			$("[data-wrap]").append(str);
				    	}
				    }
				})
	/*function render(arr){
		for(var i=0;i<arr.length;i++){
    		addDom(arr[i].status_code,arr[i].name,arr[i].status,arr[i].id);
    	}
    	
		$(".list_wrap .mer .mer_name").each(function(i){
			nameList[i]=$(this).text();
		});
		$(".list_wrap .mer .g_right").each(function(i){
			stateList[i]=$(this).text();
		});

    	function addDom(type,name,state,id){
    		var str;
    		var typeClass;
    		if(type==0)typeClass="state3";
    		if(type==1)typeClass="state2";
    		if(type==2)typeClass="state1";
    		str='<a data-id='+id+' data-type='+type+' class="mer">'+
			'<span class="mer_name">'+name+'</span>'+
			'<span class="'+typeClass+' g_right">'+state+'</span>'+
			'</a>';
			$(".mer_listWrap").append(str);
    	}
	}*/

	//fixed样式
	//添加商户事件绑定
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
		if($(this).val()){
			$(".closeImg").show();
		}else{
			$(".closeImg").hide();
		}
		checkList()
	});
	//获取数据

	//选项卡事件绑定
	//搜索图标事件绑定

	$(".search_wrap label").bind("click",checkList);
	//X点击效果

	$(".closeImg").bind("click",function(){
		$("#_search").val("");
		$(".closeImg").hide();
	})
	//取消点击效果

	$(".closeText").bind("click",function(){
		$("#_search").removeClass("on");
		resetList();
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

	function resetList(){
		$(".closeImg").hide();
		$("#_search").val("");
		$(".list_wrap .qcode").css("display","block");
	}

	function checkList(){
		var str=$("#_search").val();
		for(var i=0;i<nameList.length;i++){
			if(nameList[i].indexOf(str)!=-1){
				$(".list_wrap .qcode").eq(i).css("display","block")
			}else{
				$(".list_wrap .qcode").eq(i).css("display","none")
			}
		}
	}

	// 点击申请按钮
				$("._con ._apply").bind("click",function(){
						$("._fixed").show();
				});

				// 点击确定
				$("._fixed ._send").bind("click",function(){
					$.ajax({
					    type: 'POST',
					    data:{num:Number($("[data-wl-num]").text())},
					    url: "http://piao.pandauu.com/bapi/send-materiel" ,
					    success: function(date){
					    	if(date.code==0){
					    		window.location.reload();
					    	}
					    }
					});
						
				});



				//数目加减

				$(".js-close").click(function(){
					$("._fixed").hide();
				})

				$("._fixed .btn_1").bind("click",function(){
					var num=parseInt($("._fixed ._num").text());
					if(num>=10){
						num-=5;
						$("._fixed ._num").text(num);
					}
				})
				$("._fixed .btn_2").bind("click",function(){
					var num=parseInt($("._fixed ._num").text());
					if(num<=15){
						num+=5;
						$("._fixed ._num").text(num);
					}
				})

	/*
		点击商户事件
	*/

	

	/*
		筛选效果
	*/
	/*$('.lm-js-list').unbind('click').bind('click', function(event) {

		if ($(this).find('.area-list').hasClass('none')) {
			$('.lm-js-list').each(function(index, el) {
				$(this).find('.area-list').addClass('none');
			});
			$(this).find('.area-list').removeClass('none');
		}else{
			$(this).find('.area-list').addClass('none');
		}


	});*/

});