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
	var selectObj={};


	var deffer = $.ajax({
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
	});
	$.ajax({
	    type: 'GET',
	    url: lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.userinfo,
	    success: function(data){
	    	if(data.code==0){
				//var arr=data.data;
	    		//render(arr);
	    		$("[data-area]").text("全部"+data.data.area[1].name_cn);
	    	}else{
	    		alert("错误信息:"+data.msg)
	    	}
	    	
	    }
	});

	function render(arr){
		var b_per=null;
		for(var i=0;i<arr.length;i++){
			if(arr[i].name_cn&&arr[i].name_en){
				b_per=arr[i].name_cn+"/"+arr[i].name_en;
			}else if(arr[i].name_cn){
				b_per=arr[i].name_cn;
			}else{
				b_per=arr[i].name_en;
			}
    		addDom(arr[i].status_code,b_per,arr[i].status,arr[i].id,arr[i].is_caogao);
    	}
    	
		$(".list_wrap .mer .mer_name").each(function(i){
			nameList[i]=$(this).text();
		});
		$(".list_wrap .mer .g_right").each(function(i){
			stateList[i]=$(this).text();
		});

    	function addDom(type,name,state,id,caogao){
    		var str;
    		var typeClass;
    		var iscaogao=0;
    		if(caogao)iscaogao=1;
    		if(type==0)typeClass="state3";
    		if(type==1)typeClass="state2";
    		if(type==2)typeClass="state1";
    		str='<a href="javascript:void(0)"  iscaogao="'+iscaogao+'" data-id='+id+' data-type='+type+' class="mer">'+
			'<span class="mer_name">'+name+'</span>'+
			'<span class="'+typeClass+' g_right">'+state+'</span>'+
			'</a>';
			$(".mer_listWrap").append(str);
    	}
	}

	//fixed样式
	$("._con .choose_mer").click(function(){
		$("._fixed").show();
		$("._fixed .mer_list").animate({bottom:"0"},500)
	});
	$("._fixed").click(function(e){
		$("._fixed .mer_list").animate({bottom:"-1000"},500,function(){
			$("._fixed").hide();
		})
	});
	$("._fixed .mer_list").click(function(e){
		e.stopPropagation();
	});
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
		$(".list_wrap .mer").css("display","block");
	}

	function checkList(){
		var str=$("#_search").val();
		for(var i=0;i<nameList.length;i++){
			if(nameList[i].indexOf(str)!=-1){
				$(".list_wrap .mer").eq(i).css("display","block")
			}else{
				$(".list_wrap .mer").eq(i).css("display","none")
			}
		}
	}

	deffer.then(function(){
		clickShop();
	});

	/*
		点击商户事件
	*/

	function clickShop(){
		var sessionData = null;
		$('.mer_listWrap .mer').unbind('click').bind('click',function(e){
			if ($(this).attr("iscaogao")==1) {
				$('#addShop').removeClass('none');
				$('#addShop').attr({'data-id' : $(this).data('id')});
			}else{
				sessionData = lm.lmGetStorage(lm.sessionClass.addBdSe);
				if (sessionData) {
					sessionData.business_id = $(this).data('id');
					sessionData['business'] = {
						business_id : $(this).data('id'),
						name : $(this).find('.mer_name').html(),
					};
				}
				lm.lmSetStorage(lm.sessionClass.addBdSe,sessionData);
				 if (sessionData.id) {
				 	window.location.href = 'edper.html?id=' + sessionData.id;
				 }else{
				 	if(document.referrer.indexOf("edper")){
				 		window.location.href = document.referrer;
				 	}else{
				 		window.location.href = 'noqrcode.html';
				 	}
				 	//window.location.href = 'noqrcode.html';

				 }
				
			}
		});
	}

	/*
		筛选效果
	*/
	$('.lm-js-list').unbind('click').bind('click', function(event) {
		if ($(this).find('.area-list').hasClass('none')) {
			$('.lm-js-list').each(function(index, el) {
				$(this).find('.area-list').addClass('none');
			});
			$(this).find('.area-list').removeClass('none');
		}else{
			$(this).find('.area-list').addClass('none');
		}


	});
		

	lm.Lm_init(function(){
		var self = this;
		/*
			获取商户地区
		*/
		lm.ajax({
			url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.arealist,
			type : 'GET',
			datatype : 'json',
		}).done(function(data){
			if(data.code==0){
	    		self.selectList = data.data;
	    	}else{
	    		alert("错误代码："+data.code+"\n错误信息："+data.msg);
	    		console.log(data);
	    	}
		});
		/*
			获取商户状态
		*/
		lm.ajax({
			url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.businessstatus,
			type : 'GET',
			datatype : 'json',
		}).done(function(data){
			if(data.code==0){
	    		self.selectStatusList = data.data;
	    	}else{
	    		alert("错误代码："+data.code+"\n错误信息："+data.msg);
	    		console.log(data);
	    	}
		});

		self.jumpEdit = function(e){
			window.location.href = 'editShop.html?id=' + $($(e).attr('lm-target')).data('id') + '&add=1';
		};
		/*
			根据地区筛选
		*/
		self.selectArea = function(e,id){
			selectObj["area_id"]=id;
			if (!id) {
				delete selectObj.area_id;
			};
			$("[data-area]").text($(e).text());
			$.ajax({
				url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.businesslist,
				type : 'GET',
				datatype : 'json',
				data : selectObj,
			}).done(function(data){
				if(data.code==0){
					$('.mer_listWrap').html('');
		    		var arr=data.data;
	    			render(arr);
		    	}else{
		    		//$("[data-area]").text($(e).text())
		    		$('.mer_listWrap').html(data.msg);
		    		console.log(data);
		    	}
		    	clickShop();
	    		$('.lm-js-list').each(function(index, el) {
					$(this).find('.area-list').addClass('none');	
				});
			}).error(function() {
				alert('连接失败');
				/* Act on the event */
			});
		};
		/*
			根据状态筛选
		*/


		self.selectStatus = function(e,id){
			selectObj["status_code"]=id;
			if (!id&&id!=0) {
				delete selectObj.status_code;
			};
			$("[data-type]").text($(e).text());
			console.log(selectObj);
			$.ajax({
				url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.businesslist,
				type : 'GET',
				datatype : 'json',
				data : selectObj,
			}).done(function(data){
				if(data.code==0){
					$('.mer_listWrap').html('');
		    		var arr=data.data;
	    			render(arr);
		    	}else{
		    		//alert("错误代码："+data.code+"\n错误信息："+data.msg);
		    		$('.mer_listWrap').html(data.msg);
		    		console.log(data);
		    	}

		    	clickShop();
	    		$('.lm-js-list').each(function(index, el) {
					$(this).find('.area-list').addClass('none');	
				});
			}).error(function() {
				alert('连接失败');
				/* Act on the event */
			});;
		};

	});


});