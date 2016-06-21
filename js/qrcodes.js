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

define(['jquery','template','tpl','lm'],function($,template,tpl,lm){

	$(document).ready(function() {


		lm.Lm_init(function(){
			var self = this;
			/*
				获取二维码列表列表
			*/
			getData();
			// lm.ajax({
			// 	url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.qrcodelist,
			// 	type : 'GET',
			// 	datatype : 'json',
			// }).done(function(data){
			// 	console.log(data);

			// 	if (data.code === 0) {
					
			// 		self.qrcodes = data.data;

			// 		for (var i = 0; i < self.qrcodes.length; i++) {
			// 			if (self.qrcodes[i].status_code === 1) {
			// 				self.qrcodes[i].status_info = self.qrcodes[i].business_name_cn + '-' + self.qrcodes[i].name_cn + '(' + self.qrcodes[i].name_en + ')';
			// 			}else{
			// 				self.qrcodes[i].status_info = self.qrcodes[i].status;
			// 			}
			// 		}

			// 		console.log(self.qrcodes);

			// 	}else{
			// 		alert('错误代码：' + data.code + '错误信息：' + data.msg);
			// 	}
			// });


			/*
				搜索事件
			*/
			self.search = function(e,select){
				var params = "";
				if (typeof select === 'undefined') {
					params = ""
				}else{
					params = $(select).val();
				}
				/*
					搜索符合条件的商户
					@params params ：id
				*/
				if (!params) {
					return false;
				}

				getData(params);

			};

			function getData(params) {

				params = params||'';
				lm.ajax({
					url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.qrcodelist,
					type : 'GET',
					datatype : 'json',
					data : {
						id : params
					}
				}).done(function(data){

					if (data.code === 0) {
						self.qrcodes = data.data;

						for (var i = 0; i < self.qrcodes.length; i++) {
							if (self.qrcodes[i].status_code === 1) {
								self.qrcodes[i].status_info = self.qrcodes[i].business_name_cn + '-' + self.qrcodes[i].name_cn + '(' + self.qrcodes[i].name_en + ')';
							}else{
								self.qrcodes[i].status_info = self.qrcodes[i].status;
							}
						}
					}else{
						alert('错误代码：' + data.code + '错误信息：' + data.msg);
					}
				});
			}

			/*
				回车搜索事件
			*/
			self.searchEnter = function(e,select){
				if (self.lmEvent.keyCode === 13) {
					getData($(e).val());
					
				}
			};
			/*
				取消
			*/
			self.close = function(e) {
				$(e).hide();
				$($(e).attr('lm-target')).val("");
				getData();
			};


			//搜索框架聚焦事件绑定

			self.searchFoucs = function(e){

				if(!$(e).hasClass("on")){
					$(e).addClass("on")
					$(e).animate({width:"85%"},500,function(){
						$($(e).attr('lm-target')).show();
					});
				}
			};

			//搜索框架输入事件绑定

			self.searchInput = function(e){
				if($(e).val()){
					$(".closeImg").show();
				}else{
					$(".closeImg").hide();
					getData();
				}
			};
			//取消点击效果

			self.canel = function (e, select,select1) {
				$(select1).hide();
				$(select).removeClass("on");
				$(select).val("");
				$(e).hide();
				$(select).animate({width:"100%"},500);
			};

			/*
				申请物料
			*/
			self.apply = function(e){
				$($(e).attr('lm-target')).show();
			};
			/*
				物料加减
			*/
			self.initNum = 20;
			self.addNum = function(e){
				if (self.initNum<0) {
					return false;
				}
				self.initNum++;
				$($(e).attr('lm-target')).html(self.initNum);
			};
			self.subNum = function(e){
				if (self.initNum<=0) {
					return false;
				}
				self.initNum--;
				$($(e).attr('lm-target')).html(self.initNum);
			};

			/*
				申请物料
			*/
			self.send = function(e){
				lm.ajax({
					url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.sendmateriel,
					type : 'GET',
					datatype : 'json',
					data : {
						id : 1,
						num : self.initNum,
					}
				}).done(function(data){

					if (data.code === 0) {
						window.location.href = 'materielSucc.html';
					}else{
						alert('错误代码：' + data.code + '错误信息：' + data.msg);
					}
				});
			};

			/*
				
			*/
			self.jumpQrcode = function(e, id){
				window.location.href = 'qrcode.html?id=' + id;
			};


		});
		
	});
});



