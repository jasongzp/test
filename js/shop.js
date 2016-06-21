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
			var dataCon = {};
			lm.lmClearStorage('addInfo');
			lm.lmClearStorage('url');

			var shopStatus = {
				0 : {
					style : '_state3',
					msg : '待完善',
				},
				1 : {
					style : '_state2',
					msg : '已下线',
				},
				2 : {
					style : '_state1',
					msg : '已上线',
				},
				3 : {
					style : '_state3',
					msg : '草稿',
				},
			};

			/*
				是否有商户
			*/
			self.noShop = true;

			/*
				获取商户列表
			*/

			lm.ajax({
				url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.businesslist,
				type : 'GET',
				datatype : 'json',
			}).done(function(data){
				console.log(data);

				if (data.code === 0) {
					self.shopList = data.data;
					if (data.data.length>0) {
						setDate(self.shopList, shopStatus);
						self.noShop = false;
					}else{
						//window.location.href = 'noShop.html';
						self.noShop = true;
					}
					
				}else if(data.code!=107){
					alert('错误代码：' + data.code + '错误信息：' + data.msg);
				}
			});

			self.nextPage = function(page){
				/*
					获取下一页商户
				*/

				lm.ajax({
					url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.citylist,
					type : 'GET',
					datatype : 'json',
					data : {
						city_id : id
					}
				}).done(function(data){

					if (data.code === 0) {
						
						window.location.href = 'shop.html';

					}else{
						alert('错误代码：' + data.code + '错误信息：' + data.msg);
					}
				});
			};
			/*
				切换事件
			*/
			self.tap = function(e, status){
				/*
					获取不同状态的商户
					@params status_code ：'已上线'
				*/
				dataCon["status_code"]=status;
				$("#_search").val("");
				if (typeof status === 'undefined') {
					status = null;
				}
				$(e).addClass("_index").siblings().removeClass("_index");
				lm.ajax({
					url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.businesslist,
					type : 'GET',
					datatype : 'json',
					data :dataCon
				}).done(function(data){

					if (data.code === 0) {
						self.shopList = data.data;
						setDate(self.shopList, shopStatus);

					}else if(data.code === 107){
						self.shopList = {};
					}else{
						alert('错误代码：' + data.code + '错误信息：' + data.msg);
					}
				});


			};
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
					@params params ：name
				*/
				if (!params) {
					return false;
				}

				getData(params);

			};

			function getData(params) {
				dataCon["name"]=params;
				lm.ajax({
					url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.businesslist,
					type : 'GET',
					datatype : 'json',
					data :dataCon
				}).done(function(data){
					if (data.code === 0) {
						self.shopList = data.data;
						setDate(self.shopList, shopStatus);
					}else if(data.code === 107){
						self.shopList = {};
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
			//添加商户事件绑定
			self.add = function (e) {
				window.location.href = 'addShop.html'
			};

			function setDate(data,shopStatus){
				var temp = data||{};
				var len = data.length;
				for (var i = 0; i < len; i++) {
					data[i].style = shopStatus[data[i].status_code].style;
					data[i].dateArray = data[i].create_at.split('-');
				}

				return temp;
			}

		});
		
	});
});



