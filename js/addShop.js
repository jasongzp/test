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
 		'jquery.ui.widget' : './upload/vendor/jquery.ui.widget',
 		iframe : './upload/jquery.iframe-transport',
 		fileupload : './upload/jquery.fileupload',
 	},
 });

define(['jquery','template','tpl','lm','iframe','fileupload'],function($,template,tpl,lm,iframe,fileupload){

	$(document).ready(function() {


		lm.Lm_init(function(){
			var self = this;

			var sessionIndex = ['map', 'area', 'cate'];
			var urlData = lm.getPathName()||{};
			var sessionUrl = lm.getPathName((lm.lmGetStorage('url')||{}).url)||urlData;

			/*
				type --- 1 为添加商户-----2 为修改商户
			*/
			sessionUrl.type = 1;

			/*
				清除缓存数据
					编辑的商户ID改变时，清除上一个商户的缓存数据
			*/
			(function(){
				var len = sessionIndex.length;
				for (var i = 0; i < len; i++) {
					if (sessionUrl[sessionIndex[i]]!=1) {
						lm.lmClearStorage(sessionIndex[i]);
					}
				}
			})();
			var cache = lm.lmGetStorage('addInfo');
			if (!cache) {
				self.shopList = {};
				self.areaStr = '';
				self.areaArray = [];
				self.imgArray = {};
				getSession();
			}else{

				self.shopList = cache.shopList;
				self.areaStr = cache.areaStr;
				self.areaArray = cache.areaArray;
				self.imgArray = cache.imgArray;
				getSession();
				rendInputImg(self.imgArray);
			}
			
			/*
				获取session数据
			*/
			//getSession();
			//clearThisSession();

			function getSession(){

				var sesstionMsg=lm.lmGetStorage("map");
				var sesstionArea=lm.lmGetStorage("area");
				var sesstionCate=lm.lmGetStorage("cate");

				if(sesstionMsg){
					//$(".mark_map").html('<img class="_ic1" src="images/m_03.png">  '+sesstionMsg.name_cn);
					$(".mark_map").html('<img class="_ic1" src="images/m_03.png">');
					
					self.shopList.lat = sesstionMsg.lat;
					self.shopList.lng = sesstionMsg.lng;
				}

				if (sesstionArea) {
					
					self.areaArray.pop();
					self.areaArray.push(sesstionArea.text);
					self.areaStr = self.areaArray.join('·')||'请选择';
					self.shopList.business_area_id = sesstionArea.id;
				}

				if (sesstionCate) {
					self.shopList.cate_name_cn = sesstionCate.text;
					self.shopList.cate_id = sesstionCate.id;
				}
			}
			
			/*
				缓存数据
			*/
			function addSetData(){
				var addInfo = {
					shopList : self.shopList,
					areaStr : self.areaStr,
					areaArray : self.areaArray,
					imgArray : self.imgArray||{},
				};
				lm.lmSetStorage('addInfo', addInfo);
			}
			/*
				根据缓存渲染图片
			*/
			function rendInputImg(imgObj){
				console.log(self.shopList.business_img);
				for(var i in imgObj){
					$('.lm-js-container').append(imgObj[i]);
				}
				var str = '';
				for(var i in self.shopList.business_img){
					str =   '<section class="add_img" lm-target="' + self.shopList.business_img[i].target + '">\
									<img src="' + self.shopList.business_img[i].thumbnail + '">\
								</section>';
					$('.lm-js-container').append(str);
				}
			}

			self.save = function (e) {
				$('#load').removeClass('none');
				
				var validateType = $(e).attr('lm-target');
				var isPass = lm.validate(validateType);

				if (!isPass.code) {
					alert(isPass.msg);
					$('#load').addClass('none');
					return false;
				}





				lm.ajax({
					url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.addbusiness,
					type : 'POST',
					datatype : 'json',
					data : $('#addForm').serialize(),
				}).done(function(data){
					console.log(data);

					if (data.code === 0) {
						/*
							清理缓存
						*/
						lm.lmClearStorage('url');
						lm.lmGetStorage("map");
						lm.lmGetStorage("area");
						lm.lmGetStorage("cate");
						alert(data.msg);
						if (typeof urlData.add !== 'undefined'&&urlData.add === '1') {
							window.location.href = './relate2shop.html';
						}else{
							window.location.href = './shop.html';
						}

					}else{
						alert('错误代码：' + data.code + '错误信息：' + data.msg);
					}
					$('#load').addClass('none');
				});

			};
			/*
				选择地区列表
			*/
			self.areaListRender = function(e){
				sessionUrl.area = 1;
				lm.ucReload();
				window.location.href = 'addArea.html?' + lm.lmParam(sessionUrl);
				
			};
			/*
				选择经营类目列表
			*/
			self.cateListRender = function(e){
				sessionUrl.cate = 1;
				lm.ucReload();
				window.location.href = 'addCate.html?' + lm.lmParam(sessionUrl);
			};
			/*
				地图
			*/
			//self.mapShow = false;
			self.mapRender = function(e){
				sessionUrl.map = 1;
				sessionUrl.lat = self.shopList.lat||-1;
				sessionUrl.lng = self.shopList.lng||-1;
				lm.ucReload();
				window.location.href = 'setMap.html?' + lm.lmParam(sessionUrl);
			};
			/*
				input失去焦点保存数据
			*/
			self.blur = function(e){
				self.shopList[$(e).attr('name')] = $(e).val()||$(e).html();
				addSetData();
			};
			/*
				删除图片
			*/
			$(".lm-js-del").click(function(){
				$($(this).attr('lm-target')).addClass("_close");

				$(".mer_img ._close").click(function(){
					var imgSelf = $(this);
					$.ajax({
						url : lm.apiClass.root + lm.apiClass.apiUrl + lm.apiClass.apiInd.delphoto,
						type : 'GET',
						datatype : 'json',
						data : {id : $(this).data('id')},
					}).done(function(data){
						console.log(data);

						if (data.code === 0) {

							if (self.imgArray[imgSelf.attr('lm-target')]) {
								delete self.imgArray[imgSelf.attr('lm-target')];
								for(var i=0 ; i<self.shopList.business_img.length ; i++){
									if (self.shopList.business_img[i].target===imgSelf.attr('lm-target')) {
										self.shopList.business_img.splice(i, 1);
									}
								}
								rendInputImg(self.imgArray);
								editSetData();
							}

							imgSelf.remove();
							$(imgSelf.attr('lm-target')).remove();
						}else{
							alert('错误代码：' + data.code + '错误信息：' + data.msg);
						}
					});
				});
			});
			/*
				上传照片
			*/
			$("#upd_files2").fileupload({  
		        url: lm.apiClass.root + lm.apiClass.publicUrl + lm.apiClass.apiInd.upload,  
		        sequentialUploads: true  
		    }).bind('fileuploadsend',function(e, data){
				$('#load').removeClass('none');
			}).bind('fileuploaddone', function (e, data) {
		        console.log(data.result);
		        if (data.result.code === 0) {
		        	var d = +new Date();
					var str =   '<section class="add_img" lm-target="#img_' + d + '">\
									<img src="' + data.result.thumbnail + '">\
								</section>';

					$(this).parent().append('<input name="imgs[]" type="hidden" id="img_' + d + '" value="' + data.result.path + '" />')
					if (!self.shopList.business_img) {
						self.shopList.business_img = [];
					}
					self.shopList.business_img.push({thumbnail : data.result.thumbnail,img : data.result.img, target : '#img_' + d});
					self.imgArray['#img_' + d] = '<input name="imgs[]" id="img_' + d + '" type="hidden" value="' + data.result.path + '" />';
					addSetData();
					
					$($(this).attr('lm-target')).append(str);


				}else{
					
					alert('错误代码：' + data.result.code + '错误信息：' + data.result.msg);
				}
				$('#load').addClass('none');
		    });

		});
		
	});
});



