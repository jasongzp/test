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
			var params = lm.getPathName();
			var bdStatu = 0;
			var count = 0;
			var is_defaule = 0;
			lm.ajax({
			    type: 'GET',
			    data:params,
			    url: lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.bd,		    	
			}).done(function(data){
				var arr=data.data;
			    	if (data.code === 0) {
			    		count = arr.count;
			    		is_defaule = arr.is_default;
			    		params.business_id = arr.business_id;
			    		self.bd=data.data;

			    		//给据地推员状态改变fixed内容
			    		var str;
			    		if(arr.status_code==1){
			    			str="_online";
			    			$(".add_list a").eq(1).text('下线该地推员');
			    			bdStatu = 0;
			    		};
			    		if(arr.status_code==0){
			    			str="_downline";
			    			$(".add_list a").eq(1).text('上线该地推员');
			    			$(".add_list a").eq(1).addClass("_downline");
			    			bdStatu = 1;
			    		};
			    		$(".mer_msg ._state").addClass(str);

			    		//累计返佣小数化
			    		var num;
			    		var numstr=arr.total_fee_l.toString();
			    		if(/\./.test(numstr)){
			    			var arr1=numstr.split(".");
			    			if(+arr1[1].length>=2){
			    				num=arr1[0]+"."+arr1[1].substring(0,2);
			    			}else{
			    				num=arr1[0]+"."+arr1[1].substring(0,1)+"0";
			    			}	
			    		}else{
			    			num=numstr+".00";
			    		}
			    		num=num.split(".");
			    		self.bd["JSparseInt"]=num[0];
			    		self.bd["JSpoint"]="."+num[1];

			    		$(".contact_tel ._tel").attr("href","tel:"+arr.mobile);

			    		//商户中英文显示
			    		var pstr=null;
			    		if(arr.business_cn&&arr.business_en){
			    			pstr=arr.business_cn+"/"+arr.business_en;
			    		}else if(arr.business_cn){
			    			pstr=arr.business_cn;
			    		}else{
			    			pstr=arr.business_en;
			    		}
			    		self.bd["pername"]=pstr;

			    		//如果有其他信息则显示
			    		if(arr.email){
			    			var strLi='<li class="">'+
							'<span class="_text">邮箱账号</span>'+
							'<span class="g_right">'+arr.email+'</span>'+
							'</li>'
							$(".mer_contacts").append(strLi);
			    		}
			    		if(arr.wechat){
			    			var strLi='<li class="">'+
							'<span class="_text">微信账号</span>'+
							'<span class="g_right">'+arr.wechat+'</span>'+
							'</li>'
							$(".mer_contacts").append(strLi);
			    		}
			    		if(arr.line){
			    			var strLi='<li class="">'+
							'<span class="_text">LINE账号</span>'+
							'<span class="g_right">'+arr.line+'</span>'+
							'</li>'
							$(".mer_contacts").append(strLi);
			    		}
			    		if(arr.qq){
			    			var strLi='<li class="">'+
							'<span class="_text">QQ</span>'+
							'<span class="g_right">'+arr.qq+'</span>'+
							'</li>'
							$(".mer_contacts").append(strLi);
			    		}
			    	}else if(data.code!=107){
			    		alert(data)
			    	}
			});
			self.jumpShop=function(e){
				window.location="shopDetail.html?id="+self.bd.business_id;
			}
			self.jumpEidt=function(e){
				window.location.href = 'edper.html?id=' + params.id+"&qrcode="+self.bd.qrcode_id;
			}

			$("._fixed").click(function(){
				$('header._header ._more').removeClass("on");
				$("._fixed").css("display","none");
					
			})
			$("header._header ._more").bind("click",function(){
				if(!$(this).hasClass("on")){
					$(this).addClass("on");
					$("._fixed").css("display","block");
				}else{
					$(this).removeClass("on");
					$("._fixed").css("display","none");
				}
			});

			/*$('#editBd').unbind('click').bind('click',function(e){
				window.location.href = 'edper.html?id=' + params.id;
			});*/
			/*
				下线地推员
			*/
			$('#outLineBd').unbind('click').bind('click',function(e){
				if(!$(this).hasClass("_downline")){//点击下线改地推员
					var str="确定下线该地推员？"+"\n下线后，该地推员将无法继续获得返佣！";
					var changeDefaule ="该地推员为商户联络人，"+"\n请先更换联络人，再下线";
					var r=false;
						if (is_defaule) {
							if (count<=1) {
				  				if (confirm(str)){
									$.ajax({
										url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.update_bd,
										type : 'POST',
										data : {
											id : params.id,
											status : bdStatu,
										},
										datatype : 'json',
									}).done(function(data){
										if (data.code === 0) {
											window.location.href="persearch.html";
										}else{
											alert("错误代码："+data.code+"\n错误信息："+data.msg);
										}
									}).error(function(error){
										alert('连接失败！');
									});
								}
							}else{
								if (confirm(changeDefaule)) {
									window.location.href = 'changeBd.html?' + lm.lmParam(params);
								}
							}
						}else{
			  				if (confirm(str)){
								$.ajax({
									url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.update_bd,
									type : 'POST',
									data : {
										id : params.id,
										status : bdStatu,
									},
									datatype : 'json',
								}).done(function(data){
									if (data.code === 0) {
										window.location.href="persearch.html";
									}else{
										alert("错误代码："+data.code+"\n错误信息："+data.msg);
									}
								}).error(function(error){
									alert('连接失败！');
								});
							}
						}
				}else{//点击上线改地推员
					$.ajax({
						url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.update_bd,
						type : 'POST',
						data : {
							id : params.id,
							status : bdStatu,
						},
						datatype : 'json',
					}).done(function(data){
						if (data.code === 0) {
							window.location.href="persearch.html";
						}else{
							alert("错误代码："+data.code+"\n错误信息："+data.msg);
						}
					}).error(function(error){
						alert('连接失败！');
					});
				}
			});
		})		
	});
});



