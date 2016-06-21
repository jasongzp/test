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
 		logspan:'./logspan',
 	},
 });
// var validateClass = {
// 	userLogin : {
// 		username : {
// 			rules : 'required',
// 			label : '用户名不能为空'
// 		},
// 		password : {
// 			rules : 'required',
// 			label : '密码不能为空'
// 		},
// 	},
// 	userEdit : {
// 		password : {
// 			rules : 'required',
// 			label : '密码不能为空'
// 		},
// 		repassword : {
// 			rules : 'required',
// 			label : '确认密码不能为空'
// 		},
// 	}
// };

define(['jquery','template','tpl','lm',"logspan"],function($,template,tpl,lm,logspan){

	$(document).ready(function() {

		lm.Lm_init(function(){

			//登录
			$("#btn_Login").unbind("click").bind("click", function() {
				
				//window.location.href = "myPanda.html";
				var self = this;
				var validateType = $(this).attr('lm-target');		// 验证类型
				var loginDom = $('[lm-validate=' + validateType + ']'); //input DOM
				var loginData = {};										//登录数据
				var noteDom = $('[lm-validate-note=' + validateType + ']');	//错误提示dom
				var validate = lm.validate(validateType);					//验证
				
				/*
					验证表单
				*/
				if (!validate.code) {
					$('[name=' + validate.name + ']').addClass('ipt_errer');
					if(noteDom.hasClass('none')){
						noteDom.removeClass('none');
						noteDom.find('.lm-js-validatenote').html(validate.msg);
					}

					return false;
				}

				/*
					获取表单数据
				*/
				loginDom.each(function(index, el) {
					loginData[$(this).attr('name')] = $(this).val();
				});

				$.ajax({
					url: lm.apiClass.root + lm.apiClass.publicUrl + lm.apiClass.apiInd.adminlogin,
					type: 'POST',
					dataType: 'json',
					data: loginData,
					beforeSend : function(){
						/*
							登录中样式
						*/
						if ($(self).hasClass('btn_logining')) {
							return false;
						}else{
							$(self).addClass('btn_logining');
							$(self).find('.lm-js-btn_content').addClass('btn_content');
							$(self).find('.lm-js-btn_content').html('正在登录');
						}
					}
				})
				.done(function(data) {
					console.log(data);
					if (data.code === 0) {
						if(data.data){
							window.location.href = "index.html";
						}else{
							window.location.href = "area.html";
						}
						//window.location.href = "area.html";
						//alert('success');
					}else{
						//alert('错误代码：' + data.code + '  信息：' + data.msg);
						$('[name=' + validate.name + ']').addClass('ipt_errer');
						if(noteDom.hasClass('none')){
							noteDom.removeClass('none');
							noteDom.find('.lm-js-validatenote').html('代码：' + data.code + '  信息：' + data.msg);
						}
					}
				})
				.fail(function() {
					console.log("error");
				})
				.always(function() {
					/*
						登录中样式
					*/
					$(self).removeClass('btn_logining');
					$(self).find('.lm-js-btn_content').removeClass('btn_content');
					$(self).find('.lm-js-btn_content').html('登录');
				});
				

			});

			/*
				输入框获得焦点 提示消失
			*/
			$('.lm-js-focus').unbind('focus').bind('focus', function(event) {

				var validateType = $('#btn_Login').attr('lm-target');
				var noteDom = $('[lm-validate-note=' + validateType + ']');	//错误提示dom
				
				if ($(this).hasClass('ipt_errer')) {
					$(this).removeClass('ipt_errer');
				}
				if (!noteDom.hasClass('none')) {
					noteDom.addClass('none');
				}
				/* Act on the event */
			});

			/*
				登录按钮激活可点击事件
			*/
			this.loginInput = function(){
				var isnone = false;
				$('[lm-input]').each(function(index, el){
					if (!$(this).val()) {
						isnone = true;
						return isnone;
					}
				});

				if (!isnone) {
					$('#btn_Login').addClass('active');
				}else{
					$('#btn_Login').removeClass('active');
				}
			};
			/*
				多语言选择事件
			*/
			this.selectLangs = function (){

				var selectDom = $($(this).attr('lm-target'));
				if (selectDom.hasClass('none')) {
					selectDom.removeClass('none');
				}else{
					selectDom.addClass('none');
				}
			};

			this.selectLang = function (){

				var selectDom = $(this).parents('.lm-js-langs');
				if (selectDom.hasClass('none')) {
					selectDom.removeClass('none');
				}else{
					selectDom.addClass('none');
				}
			};
		});
		
	});
});



