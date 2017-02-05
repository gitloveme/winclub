//登陆用户id
var loginUserId = getLoginUserId();

//登陆用户类型
var expertLevel = getExpertLevel();

if(loginUserId==""){
	//alert('请先登录');
	var jumpURL ="index.html";
	goLoginPage(jumpURL);
//去购买	 
}

//获取专家个人提供的包月包次方案列表数据：
var baoyApp=angular.module("baoyApp",[]);
baoyApp.controller("objcontr",function($scope,$http){
	var object = new Object;
	var header = createHeader(loginUserId,'getPackagePrice');
	var body = new Object;
	body.expertUserId = expertUserId;
	//字符串加密处理：				
	object.header = header;//此方法衔接部分见jiami.js		
	object.body = body;
	var encoded = JSON.stringify(object);
	//加密字符串
	var str = encryptByDES(encoded, encryptKey);
	var sign = hashCode(str);

$http({
	method : 'POST',
	url : portalUrl+'basic/getPackagePrice',
	params : {
		token : "",
		jsonParams : str,
		sign : sign,
		requestSource : 4
	},
	headers : {
		'Content-Type' : 'application/json'
	}
	}).success(function(response) {
			//回调函数
		var res0=trim(response.retValue,'g');
		var ret=decryptByDES(res0, encryptKey);
		var ret = jQuery.parseJSON(ret);
		$scope.data=ret.body.data;
		$scope.setStyle1= function(args) {
			if (args == 0)
				return 'hide_b';
			else if (args == 1)
				return 'hide_a';
		};
	});
})

$('.month_box').on('click','.month_box>dd',function(){
	if(loginUserId==""){
		//alert('请先登录');
		var jumpURL ="index.html";
		goLoginPage(jumpURL);
	//去购买	 
	}else{
		//设置微信支付信息 
		var prodName=$(this).find('.prodName').text();
		var prodId=$(this).find('.prodId').text();
		var price=$(this).find('.price').text();
		var applyType=$(this).find('.applyType').text();
		//1CZ-充值 2GM-购买普通方案 3购买DIY方案 4BC-包次 5BY-包月
		var orderType='';
		if(applyType=='1'){
			orderType='4';
		}else if(applyType=='2'){
			orderType='4';
		}else if(applyType=='3'){
			orderType='5';
		}else{
			//
		}
		var title="购买【"+prodName+"】的方案，价格:"+price+" 元";
		var jumpUrl=html5Url+"my-bill.html";
		setPayObject(title, prodId, loginUserId, expertUserId, price,orderType,
				jumpUrl);
		//微信回调支付界面
	     var url=$("#payUrl").val();
	     window.location.href=url; 
	}
	
});	


/*//普通方案列表模块点击事件	
$('.hot_obj').on('click','.hot_obj>dd',function(){			
	if(loginUserId==""){
		alert('请先登录');
		var jumpURL ="index.html";
		goLoginPage(jumpURL);
	//去购买	 
	}else{
		//isBuyPlan"--是否已购买 0已购买 1未购买 2自己
		var isBuyPlan = $(this).find('.isBuyPlan').text();
		if(isBuyPlan==1){
			var userNickName=$(this).find('.expertNickName').text();
			//设置微信支付信息 
			var productId=$(this).find('.plan_id').text();
			var expertId=$(this).find('.expertId').text();
			var orderAmount=$(this).find('.star_box em').text();
			var title="购买【"+userNickName+"】专家的方案，价格:"+orderAmount+" 元";
			//1CZ-充值 2GM-购买普通方案 3购买DIY方案 4BC-包次 5BY-包月
			var orderType='2';
			var jumpUrl=html5Url+"bgfan.html?planId="+productId;
			setPayObject(title, productId, loginUserId, expertId, orderAmount,orderType,
					jumpUrl);
			//微信回调支付界面
		     var url=$("#payUrl").val();
		 window.location.href=url; 
		//查看
		}else if(isBuyPlan==0||isBuyPlan==2){
			 var productId=$(this).find('.plan_id').text(); 
			 window.location.href="bgfan.html?planId="+productId;
		}
	}							
});*/

