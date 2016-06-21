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

		lm.lmClearStorage('editInfo');
		lm.lmClearStorage('editId');
		lm.Lm_init(function(){
			var self = this;

			var urlData = lm.getPathName()||{id : 1};
			/*
				地推员列表
			*/
			self.bdShow = false;

			/*
				获取商户详情
			*/

			lm.ajax({
				url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.business,
				type : 'GET',
				datatype : 'json',
				data : urlData
			}).done(function(data){
				console.log(data);
				if (data.code === 0) {
					
					self.detail = data.data;
					/*
						编辑商户链接
					*/
					var mark_str=self.detail.remark||"暂未填写";
					$("[data-remark]").text(mark_str);
					self.editUrl = './editShop.html?id=' + urlData.id;

					if (self.detail.status_code === 1) {
						self.detail.timeStatus = '下线时间';
						//$('[lm-bind="detail.status"]').addClass("_downline");
					}else{
						self.detail.timeStatus = '加入时间';
						//$('[lm-bind="detail.status"]').addClass("_online");
					}
					//console.log(self.detail.status_code)



					if(self.detail.is_caogao){
						$(".add_per").removeAttr("lm-click");
							$('[lm-bhref="editUrl"]').hide();
							$('[data-type]').removeAttr("lm-click")
							$('[data-type]').css({'background':'url("images/fx_03.png") no-repeat 4% center',"background-size":"auto 45%"}).text("完善该商户");
							$("[data-type]").click(function(){
								window.location.href="editShop.html?id="+urlData.id;
								//$("#infoModal").removeClass("none");
							});
							$(".add_per").click(function(){
								$("#infoModal").removeClass("none");
							})
					}else if(self.detail.status_code==0){
						$('[data-type]').removeAttr("lm-click")
						$("[data-type]").click(function(){
								$("#addModal").removeClass("none");
							});
					}
					if(self.detail.status_code==2){//上线
						$('[lm-bind="detail.status"]').addClass("_online");
						$("[data-type]").text("下线该商户").addClass("_down").attr("lm-click","downline(e)");
					}else if(self.detail.status_code==1){//下线
						$('[lm-bind="detail.status"]').addClass("_downline");

					}




					if (self.detail.business_img.length<=0) {
						self.detail.imgShow = false;
					}else{
						self.detail.imgShow = true;
					}

					if (self.detail.promoter.length<=0) {
						self.detail.promoterShow = false;
					}else{
						self.detail.promoterShow = true;
					}

					for (var i = 0; i < 3; i++) {
						if (typeof self.detail.business_area[i] === 'undefined') {
							if (!self.detail.business_area[i]) {
								self.detail.business_area[i] ={};
							}
							self.detail.business_area[i].name_cn = null;
							self.detail.business_area[i].name_en = null;
						}
					}

					var proLen = self.detail.promoter.length;
					self.detail.proman = {};

					for (var i = 0; i < proLen; i++) {
						if (self.detail.promoter[i].is_default === 1) {
							self.detail.proman = self.detail.promoter[i];
							self.detail.proman.callMobile = 'tel:' + self.detail.proman.mobile;

						}
					}
					console.log(self.detail.proman)
					var pername=null;
					if(self.detail.proman.name_cn&&self.detail.proman.name_en){
						pername=self.detail.proman.name_cn+"/"+self.detail.proman.name_en;
					}else if(self.detail.proman.name_cn){
						pername=self.detail.proman.name_cn;
					}else{
						pername=self.detail.proman.name_en;
					}
					$("[data-contact-name]").text(pername);
					/*
						地推员
					*/
					self.bdList = self.detail.promoter;
					console.log(self.detail);
					//alert($('[lm-repeat="detail.business_img"]').children().size())

					console.log(self.detail.proman)
					if(!self.detail.proman.email){
						$(".contact_email").hide();
					}


				}else{
					alert('错误代码：' + data.code + '错误信息：' + data.msg);
				}
			});
			$("[data-change-per-btn]").click(function(){
				if (self.detail.promoter.length>1) {
					window.location.href="changeBd.html?id="+self.detail.proman.id+"&business_id="+self.detail.id;
				}else{
					alert('商户中仅有一名地推员，无法直接更换，可添加地推员后再更换');
				}
				
			})
			self.per_href=function(e,id){
				sessionStorage.removeItem("b_id");
				window.location.href="perMsg.html?id="+id;
			}
			self.showbImg=function(e,src){
				$(".fiximg").show();
				$("[data-big-img]").attr("src",src);
				$("[data-big-img]").click(function(){
					$(".fiximg").hide();
				})
			};
			
			self.selectList = function(e){

				$($(e).attr('lm-target')).css({
					"height":$(window).height(),
					"top":$("header._header").outerHeight()
				});
				if(!$(e).hasClass("on")){
					$(e).addClass("on");
					$($(e).attr('lm-target')).css("display","block");
					//$(document).bind("touchmove",stopMove);
				}else{

					$(e).removeClass("on");
					$($(e).attr('lm-target')).css("display","none");
					//$(document).unbind("touchmove",stopMove);
				}
				$("._fixed").click(function(){
					$(this).hide();
				});
			};
			$(".jump-set-map").click(function(event) {
				/* Act on the event */

				// var lat = '121.76';
				// var lng = '31.05';
				// var name_cn = '商户名称1';
				// var name_en = 'shanghu1';
				var lat = self.detail.lat;
				var lng = self.detail.lng;
				var name_cn = self.detail.name_cn;
				var name_en = self.detail.name_en;
				window.location.href = encodeURI("./setMap.html?lat="+lat+"&lng="+lng+"&name_cn="+name_cn+"&name_en="+name_en);

			});

			self.downline=function(e){
				  var r=confirm("确定要下线该商户？\n商户下线后，关联地推员将全部下线")
				  if (r==true)
				    {
				    	lm.ajax({
							url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.offline,
							type : 'POST',
							datatype : 'json',
							data : urlData
						}).done(function(data){
							console.log(data);

							if (data.code === 0) {
								//
								window.location.reload();

							}else if(data.code === 109){

								$('._more').removeClass('on');
								$('._fixed').css("display","none");
								$('#infoModal').removeClass('none');
								//$(document).unbind("touchmove",stopMove);

							}else if(data.code === 114){
								if (self.detail.status_code === 1) {
									window.location.href = './bdList.html?id=' + self.detail.id;
								}
								$(e).removeClass("on");
								$('._fixed').css("display","none");
								$('#addModal').removeClass('none');
								//$(document).unbind("touchmove",stopMove);

							}else{
								alert('错误代码：' + data.code + '错误信息：' + data.msg);
							}
						});
				    }
				  else
				    {
				    //document.write("You pressed Cancel!")
				    	//alert("sb2")
				    }
				  
				//alert("下线吗");
				/*lm.ajax({
					url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.online,
					type : 'POST',
					datatype : 'json',
					data : urlData
				}).done(function(data){
					console.log(data);

					if (data.code === 0) {
						//
						window.location.href = "shop.html";

					}else if(data.code === 109){

						$('._more').removeClass('on');
						$('._fixed').css("display","none");
						$('#infoModal').removeClass('none');
						$(document).unbind("touchmove",stopMove);

					}else if(data.code === 114){
						if (self.detail.status_code === 1) {
							window.location.href = './bdList.html?id=' + self.detail.id;
						}
						$(e).removeClass("on");
						$('._fixed').css("display","none");
						$('#addModal').removeClass('none');
						$(document).unbind("touchmove",stopMove);

					}else{
						alert('错误代码：' + data.code + '错误信息：' + data.msg);
					}
				});*/
			}



			self.line = function(e){
				window.location.href = "bdList.html?id="+urlData.id;
				/*lm.ajax({
					url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.online,
					type : 'POST',
					datatype : 'json',
					data : urlData
				}).done(function(data){
					console.log(data);

					if (data.code === 0) {
						//
						window.location.href = "shop.html";

					}else if(data.code === 109){

						$('._more').removeClass('on');
						$('._fixed').css("display","none");
						$('#infoModal').removeClass('none');
						$(document).unbind("touchmove",stopMove);

					}else if(data.code === 114){
						if (self.detail.status_code === 1) {
							window.location.href = './bdList.html?id=' + self.detail.id;
						}
						$(e).removeClass("on");
						$('._fixed').css("display","none");
						$('#addModal').removeClass('none');
						$(document).unbind("touchmove",stopMove);

					}else{
						alert('错误代码：' + data.code + '错误信息：' + data.msg);
					}
				});*/
			};
			/*
				选择地推员
			*/
			self.selectBd = function(e){
				
			};
			/*
				完善信息
			*/
			self.jumpEdit = function(e){
				window.location.href = './editShop.html?id=' + urlData.id;
			};
			/*
				添加地推员
			*/
			self.jumpAdd = function(e){
				//self.bdShow = true;
				window.location.href = "noqrcode.html";
				var pername=null;
				if(self.detail.name_cn&&self.detail.name_en){
					pername=self.detail.name_cn+"/"+self.detail.name_en;
				}else if(self.detail.name_cn){
					pername=self.detail.name_cn;
				}else{
					pername=self.detail.name_en;
				}
				sessionStorage.setItem("b_id",urlData.id+":"+pername)

			};

			self.comfire = function(e){
				
			};




		});
		
	});


	

});



