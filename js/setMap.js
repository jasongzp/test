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

			var urlData = lm.getPathName()||{};

			mapRender();
			/*
				地图
			*/
			function mapRender(){
				self.posInfo = {};
				self.posInfo.lats = 0;
				self.posInfo.lngs = 0;
				/*
					地图中心
				*/
				var myLatlng = new google.maps.LatLng(self.posInfo.lats,self.posInfo.lngs);
				/*
					地图中参数
				*/
				var mapOptions = {
					zoom: 15,
					center: myLatlng
				}
				/*
					创建地图对象
				*/
				var map = new google.maps.Map(document.getElementById("map"), mapOptions);

				/*
					提示框对象
				*/
				var infowindow = new google.maps.InfoWindow();

				/*
					地图标记样式
				*/
				var image = {
					url: "images/pin.gif"
				};

				var marker = new google.maps.Marker({
							position: myLatlng,
							animation: google.maps.Animation.DROP,
							map: map,
							icon : image,
							draggable:true,
							title:"Drag me!"
						});

				makerEvent();
				$("#load").addClass("none");
				setAutocomplete(map);


				// 获取url地址中的参数
				function GetRequest() {

					var url = decodeURI(decodeURI(location.search)); //获取url中"?"符后的字串 
					var theRequest = new Object(); 
					if (url.indexOf("?") != -1) { 
						var str = url.substr(1); 
						strs = str.split("&"); 
						for(var i = 0; i < strs.length; i ++) { 
							theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
						} 
					} 
					return theRequest; 
				} 

				var Request = new Object(); 
				Request = GetRequest(); 
				var lat = Request['lat']||[]; 
				var lng = Request['lng']||[];
				var name_cn = Request['name_cn']; 
				var name_en = Request['name_en']; 


				if (lat.length >0&&lat!=-1 || lng.length >0&&lng!=-1 ) {
					self.posInfo.lats=lat;
					self.posInfo.lngs=lng;

					marker.position = getPositionObj(self.posInfo.lats,self.posInfo.lngs);
					infowindow.open(map, marker);
					infowindow.setContent(viewContent(name_cn, name_en));

					marker.draggable=false;

				}else{
					getPosition();
				}

				// 根据定位获取经纬度
				function getPosition(){
					navigator.geolocation.getCurrentPosition(function(obj){
						self.posInfo.lats=obj.coords.latitude;
						self.posInfo.lngs=obj.coords.longitude;
						var pos = getPositionObj(self.posInfo.lats,self.posInfo.lngs);
						marker.setMap(null);
						marker = new google.maps.Marker({
							position: pos,
							animation: google.maps.Animation.DROP,
							map: map,
							icon : image,
							draggable:true,
							title:"Drag me!"
						});
						makerEvent();
						setLmCenter(map, pos);

					},function(Ecode){
						var pos = getPositionObj(self.posInfo.lats,self.posInfo.lngs);
						marker.setMap(null);
						marker = new google.maps.Marker({
							position: pos,
							animation: google.maps.Animation.DROP,
							map: map,
							icon : image,
							draggable:true,
							title:"Drag me!"
						});
						makerEvent();
						setLmCenter(map, pos);

						alert("获取位置失败请重试");
					});
				}
				$("._curPositon").bind("touchstart",function(){

					navigator.geolocation.getCurrentPosition(function(obj){
						marker.setMap(null);
						self.posInfo.lats=obj.coords.latitude;
						self.posInfo.lngs=obj.coords.longitude;

						var pos = getPositionObj(self.posInfo.lats,self.posInfo.lngs);
						setLmCenter(map, pos);
						
						marker = new google.maps.Marker({
							position: pos,
							animation: google.maps.Animation.DROP,
							map: map,
							icon : image,
							draggable:true,
							title:"Drag me!"
						});
						

					},function(Ecode){
						alert("获取位置失败请重试");
					});
					$(".mer_msg").hide();
				});

				/*
					获取地图坐标对象
				*/

				function getPositionObj(lat, lng){

					return new google.maps.LatLng(lat,lng);
				}
				/*
					设置地图中心
				*/

				function setLmCenter(map, position){

					map.setCenter(position);

				}
				/*
					设置maker
				*/

				function setLmMaker(map, position){			
					/*
						地图标记参数
					*/
					marker = new google.maps.Marker({
						position: position,
						animation: google.maps.Animation.DROP,
						map: map,
						icon : image,
						draggable:true,
						title:"Drag me!"
					});

					makerEvent();

					return _marker;

				}

				/*
					添加maker事件
				*/
				function makerEvent(){

					marker.addListener('click', function() {

						console.log(arguments);
						if (lat.length >0&&lat!=-1 || lng.length >0&&lng!=-1 ) {
							infowindow.setContent(viewContent(name_cn, name_en));
							infowindow.open(map, marker);
						}else{
							infowindow.setContent(setContent(self.posInfo.name_cn, self.posInfo.address));
							infowindow.open(map, marker);
						}
	

						$("ul.mer_list").css("width",$(window).width()*0.7);
						/*
							保存标记商户
						*/
						$('.lm-js-map-save').on('click', function(event) {
							event.preventDefault();
							//if (!$('.lm-js-map-nameCn').val()&&!$('.lm-js-map-nameEn').val()) {
							//	alert('商户名不能为空');
							//}else{
								self.mapShow = false;
								var urlStr = lm.lmGetStorage('url')||'';
								var data = {
									//name_cn : $('.lm-js-map-nameCn').val(),
									//name_en : $('.lm-js-map-nameEn').val(),
									lat : self.posInfo.lats,
									lng : self.posInfo.lngs
								};
								lm.lmSetStorage('map',data);

								if (lm.isNull(urlData)) {
									window.location.href = 'addShop.html';
								}else{
									if (urlData['type']) {
										switch(urlData['type']){
											case '1':
												urlStr = 'addShop.html?' + lm.lmParam(urlData);
												break;
											case '2':
												urlStr = 'editShop.html?' + lm.lmParam(urlData);
												break;
										}
										lm.lmSetStorage('url',{url : urlStr});

										window.history.go(-1);
									}
								}
								
							//}
							/* Act on the event */
						});
						/*
							取消标记商户
						*/
						$('.lm-js-map-cance').on('click', function(event) {
							event.preventDefault();
							infowindow.close(map, marker);
						});

					});

					marker.addListener('dragend', function(MouseEvent) {
							//$(".mer_msg").hide();
							//dragendArr=[];
							//dragendArr.push(MouseEvent.latLng.lat(),MouseEvent.latLng.lng())
							//console.log(dragendArr);
							self.posInfo.lats = MouseEvent.latLng.lat();
							self.posInfo.lngs = MouseEvent.latLng.lng();
						});
					marker.addListener('dragstart', function(MouseEvent) {
						//$(".mer_msg").hide();
						console.log(MouseEvent.latLng);
					});
				}
					

				/*
					地图初始化
				*/
				function setAutocomplete(map) {	 
					/*
						搜索框
					*/
					var input = document.getElementById('pac-input');
					/*
						创建地图搜索自动补全对象
					*/
					var autocomplete = new google.maps.places.Autocomplete(input);
					/*
						搜索控件
					*/
					map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

					// console.log(map.getBounds());
					// service = new google.maps.places.PlacesService(map);
					// service.radarSearch({bounds: map.getBounds(),keyword:'wujiaochang'}, function(){
					// 	console.log(arguments);
					// });

					/*
						搜索获取信息
					*/
					google.maps.event.addListener(autocomplete, 'place_changed', function() {

						infowindow.close();
						/*
							位置对象
						*/
						var place = autocomplete.getPlace();

						if (!place.geometry) {
					  		return;
						}
						/*
							移动地图，将搜索位置设置为地图中心
						*/
						if (place.geometry.viewport) {
						  map.fitBounds(place.geometry.viewport);
						} else {
						  map.setCenter(place.geometry.location);
						  map.setZoom(15);
						}

						/*
							标记位置
						*/
						marker.setPlace({
						  placeId: place.place_id,
						  location: place.geometry.location
						});

						self.posInfo = {
							lats : place.geometry.location.lat(),
							lngs : place.geometry.location.lng(),
							name_cn : place.name,
							address : place.formatted_address,
						}
						console.log(self.posInfo);
						marker.setVisible(true);
						makerEvent();
						/*
							信息框内容
						*/
						infowindow.setContent(setContent(self.posInfo.name_cn, self.posInfo.address));
						//infowindow.open(map, marker);
						$("ul.mer_list").css("width",$(window).width()*0.7);
					});
				}
				/*
					地图设置提示信息
				*/

				function setContent(name, address){ //  address 为英文名称
					name = name||'';
					address = address||'';
					/*
						弹框标记商户
					*/
					var contentString = '<div class="mer_list" style="height: 50px;"><div class="_tit" style="padding:0;">'+
					'<span class="_mark" style="font-size:16px;display:block;text-align:center;height:20px;">'+
					'标记商户'+
					'</span>'+
					'<section class="g_right" style="font-size:16px;margin-top:25px">'+
						'<span class="_cance lm-js-map-cance">'+
						'取消'+
						'</span>'+
						'<span class="_save lm-js-map-save">'+
						'保存'+
						'</span>'+
					'</section>'+
					'</div>'+
					//'<input class="mer_nameCN lm-js-map-nameCn" placeholder="商户中文名称" contenteditable="true" value="'+name+'" />'+
					//'<input class="mer_nameEN lm-js-map-nameEn" placeholder="商户英文名称" contenteditable="true" value="'+address+'" />'+
					'</div>';

					return contentString;
				}
				function viewContent(name, address){ //  address 为英文名称
					name = name||'';
					address = address||'';
					/*
						弹框标记商户
					*/
					var contentString = '<div class="mer_list"><div class="_tit">'+
					'<span class="_mark">'+
					'标记商户'+
					'</span>'+
					'</div>'+
					'<input class="mer_nameCN lm-js-map-nameCn" disabled placeholder="商户中文名称" contenteditable="true" value="'+name+'" />'+
					'<input class="mer_nameEN lm-js-map-nameEn" disabled placeholder="商户英文名称" contenteditable="true" value="'+address+'" />'+
					'</div>';

					return contentString;
				}
			};

		});
		
	});
});



