/**
 * 
 * @authors Gary_zhou (you@example.org)
 * @date    2016-04-25
 * @version $Id$
 * 龙门客栈 存放模板
 * 
 * 
 * 
 */

(function(root,factory){

	if (typeof define === 'function' && define.amd) {
		define(['jquery', 'template'],factory);
	} else if( typeof exports === 'object'){

		module.exports = factory(require('jquery'));
	} else{
		/*全局window加载jquery*/
		if (typeof root.jQuery === 'undefined'||typeof root.template === 'undefined') {
			throw new Error('未加载jQuery或者template！！！');
		}else{
			root.tpl = factory(root.jQuery,root.template);
		}
	}

})(typeof window !== 'undefined' ? window : this ,function($,template,undefined){

	function Tpl(options) {

		this.options = $.extend({}, this.constructor.defaultOptions);
		$.extend(this.options, options);

		this.init();
	}

	Tpl.defaultOptions = {

	};
	Tpl.prototype.init = function(options) {
		var self = this;	
	};
	/*
		demo模板
	*/
	Tpl.prototype.selectTpl = function(index) {
		
		var self = this;
		var tpl = '';
		switch(index){
			case 'cityList' : 
				tpl = self.cityListTpl();
				break;
			case 'shopList' : 
				tpl = self.shopListTpl();
				break;
			case 'areaList' : 
				tpl = self.areaListTpl();
				break;
			case 'cateList' : 
				tpl = self.cateListTpl();
				break;
			case 'detailPicList' : 
				tpl = self.detailPicListTpl();
				break;
			case 'detailProList' : 
				tpl = self.detailProListTpl();
				break;
			case 'detailProsList' : 
				tpl = self.detailProsListTpl();
				break;
			case 'editPicList' : 
				tpl = self.editPicListTpl();
				break;
			case 'bdList' : 
				tpl = self.bdListTpl();
				break;
			case 'walletList' : 
				tpl = self.walletListTpl();
				break;
			case 'materielList' : 
				tpl = self.materielListTpl();
				break;
			case 'qrcodeList' : 
				tpl = self.qrcodeListTpl();
				break;

		}

		return tpl;
	};
	/*
		选择城市-城市列表-模板
	*/
	Tpl.prototype.cityListTpl = function() {
		var tpl =   '{{each list as v k}}\
						<a class="_list" javascript:void(0); class="_jp" lm-click="setCity({{v.id}})">{{v.name}}</a>\
					{{/each}}';	

		return tpl;
	};
	/*
		地推-商户列表-模板
	*/
	Tpl.prototype.shopListTpl = function() {
		var tpl =   '{{each list as v k}}\
						<a href="./shopDetail.html?id={{v.id}}" class="_list" data-id="{{v.id}}">\
							<h3 class="_title"><span class="_name">{{v.name}}</span><span class="{{v.style}} _state">{{v.status}}</span></h3>\
							<h3 class="_time"><span class="_year">{{v.dateArray[0]}}</span>年<span class="_mon">{{v.dateArray[1]}}</span>月<span class="_date">{{v.dateArray[2]}}</span>日加入</h3>\
							<h3 class="_add">地址:<span class="add_msg">{{v.address}}</span></h3>\
						</a>\
					{{/each}}';	

		return tpl;
	};
	/*
		添加商户-地区列表-模板
	*/
	Tpl.prototype.areaListTpl = function() {
		var tpl =   '{{each list as v k}}\
						<li class="_list" lm-click="selectArea(e,{{v.id}})" lm-target="#lm-js-set" lm-data="{{v.name}}"><a href="javascript:void(0);" class="_jp" >{{v.name}}</a></li>\
					{{/each}}';	

		return tpl;
	};
	/*
		添加商户-经营列表-模板
	*/
	Tpl.prototype.cateListTpl = function() {
		
		var tpl =   '{{each list as v k}}\
						<li class="_list" lm-click="selectCate(e,{{v.id}})" lm-target="#lm-js-cate" lm-data="{{v.name}}" >{{v.name}}</li>\
					{{/each}}';	

		return tpl;
	};
	/*
		商户详情-商户图片-模板
	*/
	Tpl.prototype.detailPicListTpl = function() {
		
		var tpl =   '{{each list as v k}}\
						<img src="{{v.img}}" />\
					{{/each}}';	

		return tpl;
	};
	/*
		编辑商户-商户图片-模板
	*/
	Tpl.prototype.editPicListTpl = function() {
		
		var tpl =   '{{each list as v k}}\
						<section class="upd_img" data-id="{{v.id}}"><img src="{{v.img}}" /></section>\
					{{/each}}';	

		return tpl;
	};
	/*
		商户详情-地推联络员-模板
	*/
	Tpl.prototype.detailProListTpl = function() {
		
		var tpl =   '{{each list as v k}}\
						<img src="{{v.img}}" />\
					{{/each}}';	

		return tpl;
	};
	/*
		商户详情-地推员-模板
	*/
	Tpl.prototype.detailProsListTpl = function() {
		
		var tpl =   '<ul class="mer_per">{{each list as v k}}\
						<li class="_title">\
							店内地推员\
							<span class="g_right">\
								<a class="_all" javascript:void(0);>查看全部</a>\
							</span>\
						</li>\
						<li class="per {{if v.is_default==0}}index{{/if}}">\
							<span class="per_name">\
								{{v.name}}\
							</span>\
							<span class="per_date">\
								加入时间:{{v.create_at}}\
							</span>\
							<span class="g_right">\
								<a class="more" javascript:void(0);>\
									<img src="images/adds_03.png" />\
								</a>\
							</span>\
						</li>\
					</ul>\
					{{/each}}';	

		return tpl;
	};
	/*
		商户-地推员列表-模板
	*/
	Tpl.prototype.bdListTpl = function() {
		
		var tpl =   '{{each list as v k}}\
						<li class="per {{if v.is_default==1}}index{{/if}} _active" lm-touchstart="selectBd(e)">\
							<h3 class="_title">\
								<span class="per_name">{{v.name}}</span>\
								<span class="g_right state1">{{v.status}}</span>\
							</h3>\
							<section class="per_msg">\
								<p class="date">\
									{{v.create_at}}加入\
								</p>\
								<p class="tel">\
									<span class="phone">{{v.mobile}}</span>\
									<a class="g_right" href="tel:{{v.mobile}}"><img src="images/ic_03.png"></a>\
								</p>\
							</section>\
						</li>\
					{{/each}}';	

		return tpl;
	};
	/*
		商户-提现列表-模板
	*/
	Tpl.prototype.walletListTpl = function() {
		
		var tpl =   '{{each list as v k}}\
						<li class="per _active" data-id="{{v.id}}">\
							<h3 class="_title">\
								<span class="per_name">{{v.name_cn}}</span>\
								<span class="g_right state1 _state">{{v.fee_f}}</span>\
								<p class="_ex">\
									<span class="mer_name">\
										{{v.business_name}}\
									</span>\
									<span class="_CNY">\
										折合 CNY <span class="CNY_num">{{v.fee_l}}</span>\
									</span>\
								</p>\
							</h3>\
							<section class="per_msg">\
								<p class="date">\
									<span class="_state _state1">\
										{{v.status}}\
									</span>\
									<span class="com_date">完成时间:{{v.update_at}}</span>\
								</p>\
								<p class="tel">\
									<span class="phone">{{v.mobile}}</span>\
									<a class="g_right" href="tel:{{v.mobile}}"><img src="images/ic_03.png"></a>\
								</p>\
							</section>\
						</li>\
					{{/each}}';	

		return tpl;
	};
	/*
		商户-物料列表-模板
	*/
	Tpl.prototype.materielListTpl = function() {
		
		var tpl =   '{{each list as v k}}\
						<li class="per _active">\
							<h3 class="_title">\
								<span class="per_name">{{v.name_cn}}({{v.name_en}})</span>\
								<span class="g_right state2 _state">物料号:{{v.qrcode_id}}</span>\
								<p class="_ex">\
									<span class="mer_name">\
										{{v.business_name}}\
									</span>\
									<span class="_state">\
									{{v.status}}\
									</span>\
								</p>\
							</h3>\
							<section class="per_msg">\
								<p class="date">\
									申请时间:{{v.create_at}}\
								</p>\
								<p class="tel">\
									<span class="phone">{{v.mobile}}</span>\
									<a class="g_right" href="tel:{{v.mobile}}"><img src="images/ic_03.png"></a>\
								</p>\
							</section>\
						</li>\
					{{/each}}';	

		return tpl;
	};
	/*
		全部二维码-列表-模板
	*/
	Tpl.prototype.qrcodeListTpl = function() {
		
		var tpl =   '{{each list as v k}}\
						<a class="_list" href="javascript:void(0);" lm-touchstart="jumpQrcode(e,{{v.id}})">\
							<span class="_text">\
								{{v.qrcode_id}}\
							</span>\
							<span class="g_right {{if v.status_code !== 1}}_state{{/if}}">\
								{{v.status_info}}\
							</span>\
						</a>\
					{{/each}}';	

		return tpl;
	};

	return new Tpl();
});