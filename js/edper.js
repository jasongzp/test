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
 		areacode:'./upload/areacode'
 	},
 }); 

define(['jquery','template','tpl','lm','areacode'],function($,template,tpl,lm,areacode){

	$(document).ready(function() {
		lm.Lm_init(function(){
			var self = this;			
			/*
				获取URL中的GET数据
			*/
			var params = lm.getPathName()||null;
			var initDerfer = null;
			lm.pattern();
			var is_default = 0;
			/*
				select option innerHTML修改
			*/
			var slt_str="";
			for(var i=0;i<areacodes.length;i++){
				var arrcon=areacodes[i].split("-");
				slt_str+="<option title="+arrcon[1]+" value ='"+arrcon[2]+"'>"+arrcon[1]+"+"+arrcon[2]+"</option>"
			}
			$('[data-area-slt]').html(slt_str);
			$('[data-area-slt]').find("option[value='86']").attr("selected","selected");
			$('[data-area-slt]').find("option[value='86']").html("+86");
			var click_type=1;
			$('[data-area-slt]').click(function(){
				if(click_type){
					var $option=$('[data-area-slt]').find("option[value="+$(this).val()+"]");
					$option.html($option.attr("title")+"+"+$option.val());
					click_type=0;
				}
			})
			$('[data-area-slt]').change(function(){
				$('[data-area-slt]').find("option[value='86']").removeAttr("selected","selected");
				$('[data-area-slt]').find("option[value="+$(this).val()+"]").attr("selected","selected")
				$('[data-area-slt]').find("option[value="+$(this).val()+"]").html("+"+$(this).val());
				setTimeout(function(){
					click_type=1;
					},0);
			});
			if (params) {
				try{
					initDerfer = getBd(params.id);
					$("[name='username']").attr("disabled","true")
					initDerfer.then(function(){
						sessionRender();
	
					});
				}catch(e){
					console.log(e);
				}
			}else{
				sessionRender();
				setPsw();
			}
						

			$(".per_password .g_right").click(function(){
				if(/重置/.test($(this).text())){
					$("[data-input-pw]").attr("name","password");
				}
				setPsw();
			});
			if(sessionStorage.getItem("per_name_id")){
				var str=sessionStorage.getItem("per_name_id").split(":");
				$(".lm-js-shop").text(str[1]);
				$('[name="business_id"]').val(str[0]);
				sessionStorage.removeItem("per_name_id");
			}
			$("[lm-target]").click(function(){
				var self = this ;
				if (params&&params.id) {

					$('#bdId').val(params.id); 

					var valData = {};

					$('input').each(function(){
						valData[$(this).attr('name')] = $(this).val();
					});

					valData.ctime = (new Date()).getTime();
					lm.lmSetStorage('ADD_STEP_INFO',valData);
					
					/*
						校验信息是否符合
					*/
					var validateType = $(self).attr('lm-target');
					var hasValidate = lm.validate(validateType);


					var str=$(".form_list").serialize();
					
					if (hasValidate.code) {
						str+="&qrcode_id="+params.id;
						$.ajax({
						    type: 'POST',
						    url: lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.update_bd,
						    data:str,
						    success: function(data){
						    	if(data.code==0){
						    		
						    		lm.lmClearStorage(lm.sessionClass.addBdSe);
						    		lm.lmClearStorage(lm.sessionClass.addBdShop);
						    		window.location.href="perMsg.html?id="+params.id;
						    	}else{
						    		alert("错误代码："+data.code+"\n错误信息："+data.msg);
						    		console.log(data)
						    	}
						    }
						});
					}else{
						alert(hasValidate.msg);
						//msgTips(hasValidate.msg)
					}

				}else{
					$.ajax({
						    type: 'POST',
						    data:{username:$("[name='username']").val()},
						    url: lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.haveUsername,
						    success: function(data){
						    	console.log(data)
						    	if(data.code){
						    		$("[name='username']").val("");
									document.getElementById("userName").focus();
									msgTips("用户名已占用，请修改")
						    	}else{
								var valData = {};

								$('input').each(function(){
									valData[$(this).attr('name')] = $(this).val();
								});

								valData.ctime = (new Date()).getTime();
								//lm.lmSetStorage('ADD_STEP_INFO',valData);
								
								/*
									校验信息是否符合
								*/
								var validateType = $(self).attr('lm-target');
								var hasValidate = lm.validate(validateType);


								var str=$(".form_list").serialize();
								console.log(hasValidate);
								if (hasValidate.code) {
									/*$.ajax({
									    type: 'POST',
									    url: lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.addbd,
									    data:str,
									    success: function(data){
									    	if(data.code==0){
									    		lm.lmClearStorage(lm.sessionClass.addBdSe);
									    		lm.lmClearStorage(lm.sessionClass.addBdShop);
									    		window.location.href = 'qcode.html';
									    	}else{
									    		alert("错误代码："+data.code+"\n错误信息："+data.msg);
									    		console.log(data)
									    	}
									    }
									});*/
									//console.log(str);
									var se=sessionStorage.getItem("addqrcode");
									if(se){
										var str=$(".form_list").serialize()+"&qrcode_id="+se;
										$.ajax({
											type: 'POST',
											url: lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.addbd,
											data:str,
											success: function(data){
												if(data.code==0){
													lm.lmClearStorage(lm.sessionClass.addBdSe);
													lm.lmClearStorage(lm.sessionClass.addBdShop);
													sessionStorage.removeItem("addqrcode");
													window.location.href = 'persearch.html';
												}else{
													alert("错误代码："+data.code+"\n错误信息："+data.msg);
													console.log(data)
												}
											}
										});
									}else{
											sessionStorage.setItem("permsg",str);
											sessionStorage.removeItem("b_id");
											window.location.href = 'qcode.html';
									}
								}else{
									//alert(hasValidate.msg);
									console.log(hasValidate);
									msgTips(hasValidate.msg)
								}
													    	}
						    	
						    }
					});
				}	
					
			});
			$("[data-clear]").click(function(){
				sessionStorage.removeItem("addqrcode");
				window.history.go(-1);
			})
			$("[data-clear-session]").click(function(){
				lm.lmClearStorage('ADD_STEP_INFO');
				window.history.go(-1);
			})
			$(".per_mer li._more").click(function(){

				if (is_default) {
					alert('该地推员为商户联络人，不可直接更换所属商户！');

					return false;
				}

					// var docs = document.getElementById('chooseMer').contentWindow.document;
					// $("#chooseMer").animate({left:"0%"},300)
					// $(docs).find("._back").click(function(){
					// 	$("#chooseMer").animate({left:"100%"},300)
					// });
					// $(docs).find(".mer_listWrap a").click(function(){
					// 	var name=null;
					// 	var merId=null;
					// 	merId=$(this).attr("data-id");
					// 	name=$(this).find(".mer_name").text();
					// 	$("#chooseMer").animate({left:"100%"},300);
					// 	$(".per_mer ._text").text(name);
					// 	$("[name='business_id']").val(merId);
					// });
					if(!sessionStorage.getItem("b_id")){
							var valData = {};
							$('input').each(function(){
								valData[$(this).attr('name')] = $(this).val();
							});

							valData.ctime = (new Date()).getTime();
							lm.lmSetStorage('ADD_STEP_INFO',valData);

							window.location.href = 'relate2shop.html';
					}

			});
			/*
				input和用户名同步
			*/
			$("[name='name_en']").bind("change",function(){

				if ($("[name='username']").val() =="") {
						$("[name='username']").val($(this).val());
				};
			})

			if(sessionStorage.getItem("b_id")){
				var str=sessionStorage.getItem("b_id").split(":");
				$(".lm-js-shop").text(str[1]);
				$("[name='business_id']").val(str[0]);
			}
			/*
				点击生成密码判断用户名是否重复 
			*/
			$("[lm-ck-username]").bind("click",function(){
				//console.log($("[name='username']").val());
					$.ajax({
						    type: 'POST',
						    data:{username:$("[name='username']").val()},
						    url: lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.haveUsername,
						    success: function(data){
						    	console.log(data)
						    	if(data.code){
						    		$("[name='username']").val("");
									document.getElementById("userName").focus();
									msgTips("用户名已占用，请修改")
						    	}
						    	
						    }
					});
			})


			if(window.location.href.indexOf("id")!=-1){
				$("[name='password']").removeAttr("name");
				$(".perPassword").text("******");
			}
			/*
				提示字段显示 
			*/
			function msgTips(msg){
					$("[lm-data-tips]").children().text(msg);
					$("[lm-data-tips]").show();
					setTimeout(function(){
						$("[lm-data-tips]").hide();
					},arguments[1]||1000)

			}
			/*
				编辑地推员--获取地推员信息
			*/
			function getBd(id){
				var defer = $.ajax({
				    type: 'GET',
				    data:{
				    	id : id
				    },
				    url: lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.bd,
				    success: function(data){
				    	if (data.code === 0) {
				    		var arr=data.data;
				    		is_default = arr['is_default'];
				    		$('input').each(function(){
								$(this).val(arr[$(this).attr('name')]);
							});
				    		//setPsw();
							$('.lm-js-shop').html(arr.business);

						}else{
							alert('错误代码：' + data.code + '错误信息：' + data.msg);
						}
				    }
				});

				return defer;
			}

			/*
				生成密码
			*/
			function setPsw(){
				var str='';
				for(var i=0;i<6;i++){
					str+=parseInt(Math.random()*10);
				}
				$(".per_password .perPassword").text(str);
				$("[name='password']").val(str);
			}

			/*
				session获取--渲染
			*/
			function sessionRender(){
				var session = null;

				session = lm.lmGetStorage(lm.sessionClass.addBdSe);

				if (session) {
					for(var k in session){
						if (k !== 'password') {
							$('[name=' + k + ']').val(session[k]);
						}
					}
					if (session.business) {
						$('.lm-js-shop').html(session.business['name']);
					}
					
				}


			}

		});
		
	});
});



