
//获取登录用户信息
var loginUserId = getLoginUserId();

//微信公众号支付
$(document).ready(function(){
      //设置微信支付请求参数
      var requestType='weixinPayOauth2';
      var body=new Object;
      body.orderType='2';    //订单类型 1CZ-充值 2GM-购买普通方案 3购买DIY方案 4BC-包次 5BY-包月
      var obj=initRequestParam(requestType,body);           
      var url=weixinUrl+'pay/weixinPayOauth2';       
      //获取微信oauth2认证URI
      crossDomainAjaxRequest(url,obj.token,obj.encParam,obj.signParam,successFunction);         
});
  //设置支付按钮认证URI
function successFunction(authUrl){
   $("#payUrl").val(authUrl);   	 
}

//1.获取专家推荐列表：
var tuijApp = angular.module("tuijApp",[]);
tuijApp.controller("planContr",function($scope,$http){
	//接口加工	     
	var object = new Object;
	var header = createHeader(loginUserId,'getSaleColorPlanList');
	var body = new Object;
	body.loginUserId = loginUserId;
	body.planType = '';
	body.issue = '';
	body.lids = '';
	//字符串加密处理：				
	object.header = header;//此方法衔接部分见jiami.js		
	object.body = body;
	var encoded = JSON.stringify(object);
	//加密字符串
	var str = encryptByDES(encoded, encryptKey);
	var sign = hashCode(str);

	$http({
		method : 'POST',
		url : portalUrl+'plan/getSaleColorPlanList',
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
		var res0 = trim(response.retValue, 'g');
		var ret = decryptByDES(res0, encryptKey);
		var ret = jQuery.parseJSON(ret);
		$scope.data = ret.body.data;
		rem = ret.body.data;
		$('.creat_sheet').hide();
		$.each(rem, function(i, item) {
			if (item.isBuyPlan == "0") {
				item.isBuyPlanName = "已购买"
			} else if (item.isBuyPlan == "1") {
				item.isBuyPlanName = "购买"
			} else {
				item.isBuyPlanName = "查看"
			}
		});
		
		/********页面无数据时的友好提醒样式********/
		if(ret.body.data==""||ret.body.data==null){
			$('.one_li').addClass('add_tj');
		}
	});
});

//获取亚盘数据
tuijApp.controller("asiaContr",function($scope,$http){
	//接口加工	     
	var object = new Object;
	var header = createHeader(loginUserId,'getSaleColorPlanList');
	var body = new Object;
	body.loginUserId = loginUserId;
	body.planType = '3';
	body.issue = '';
	body.lids = '';
	//字符串加密处理：				
	object.header = header;//此方法衔接部分见jiami.js		
	object.body = body;
	var encoded = JSON.stringify(object);
	//加密字符串
	var str = encryptByDES(encoded, encryptKey);
	var sign = hashCode(str);

	$http({
		method : 'POST',
		url : portalUrl+'plan/getSaleColorPlanList',
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
		var res0 = trim(response.retValue, 'g');
		var ret = decryptByDES(res0, encryptKey);
		var ret = jQuery.parseJSON(ret);
		$scope.data = ret.body.data;
		rem = ret.body.data;
		$.each(rem, function(i, item) {
			if (item.isBuyPlan == "0") {
				item.isBuyPlanName = "已购买"
			} else if (item.isBuyPlan == "1") {
				item.isBuyPlanName = "购买"
			} else {
				item.isBuyPlanName = "查看"
			}
		});
		
		/********页面无数据时的友好提醒样式********/
		if(ret.body.data==""||ret.body.data==null){
			$('#four_li').addClass('add_tj');
		}
	});
});
//获取大小球数据
tuijApp.controller("scaleContr",function($scope,$http){
	//接口加工	     
	var object = new Object;
	var header = createHeader(loginUserId,'getSaleColorPlanList');
	var body = new Object;
	body.loginUserId = loginUserId;
	body.planType = '4';
	body.issue = '';
	body.lids = '';
	//字符串加密处理：				
	object.header = header;//此方法衔接部分见jiami.js		
	object.body = body;
	var encoded = JSON.stringify(object);
	//加密字符串
	var str = encryptByDES(encoded, encryptKey);
	var sign = hashCode(str);

	$http({
		method : 'POST',
		url : portalUrl+'plan/getSaleColorPlanList',
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
		var res0 = trim(response.retValue, 'g');
		var ret = decryptByDES(res0, encryptKey);
		var ret = jQuery.parseJSON(ret);
		$scope.data = ret.body.data;
		rem = ret.body.data;
		$.each(rem, function(i, item) {
			if (item.isBuyPlan == "0") {
				item.isBuyPlanName = "已购买"
			} else if (item.isBuyPlan == "1") {
				item.isBuyPlanName = "购买"
			} else {
				item.isBuyPlanName = "查看"
			}
		});
		
		/********页面无数据时的友好提醒样式********/
		if(ret.body.data==""||ret.body.data==null){
			$('#five_li').addClass('add_tj');
		}
	});
});

//判断推荐版块用户是否登录和购买
$('.go_check').on('click', '.score_div', function() {
	var planId = $(this).find('.plan_id').text();
	var isBuyPlan = $(this).find('.isBuyPlan').text();
	if (loginUserId=="") {
		alert('请先登录');
		//去登陆页面，登陆后回调的页面地址
		goLoginPage("tuij.html");
	} else{
		//未购买去购买页面
		if ( isBuyPlan== "1") {
			
			var expertName=$(this).find('.expert_nick_name').text();
		    //设置微信支付信息 
  			var prodId=$(this).find('.plan_id').text();
  			var expertId=$(this).find('.expert_user_id').text();
  			var amount=$(this).find('.order_amount').text();
  			
  			var planTypeName=$(this).find('.planTypeName').text();
  			var title="购买【"+expertName+"】专家的方案，价格:"+amount+" 元";
  			
  			//包次校验
			 var requestType='getSurplusNum';
			 var body=new Object;
			 body.loginUserId=loginUserId;
		     body.planId=prodId; 
			 var obj=initRequestParam(requestType,body);           
			 var url=portalUrl+"/plan/getSurplusNum"; 
			 var requestSource='3';
		
			 crossDomainPortalRequestParams(url,obj.encParam,obj.signParam,expertId,expertName,prodId,planTypeName,amount,checkPackNum);

			 /***
			 $.ajax({
					type : 'get',
					dataType : "jsonp",
					url : url,
					jsonpCallback : "jsonpCallback",
					async : false,
					data : {
						token : obj.token,
						jsonParams : obj.encParam,
						sign : obj.signParam,
						requestSource : requestSource
					},
					success : function(response) {
						var res0=trim(response.retValue,'g');
					    var ret=decryptByDES(res0, '1379246805559731246875312468');
					    var ret = jQuery.parseJSON(ret);
					    ret=ret.body;
					    if(ret.resultCode=='1000'){
					    	 var num= ret.data.surplusNum;
					    	alert('num'+num);
					    	 if(num=='0'){
					    		 //正常购买流程
								 var title="购买【"+expertName+"】专家的方案，价格:"+amount+" 元";
					    		 //1CZ-充值 2GM-购买普通方案 3购买DIY方案 4BC-包次 5BY-包月
					  			 var orderType='2';
					  			 var jumpUrl=html5Url+"my-bill.html";
					  			 setPayObject(title, prodId, loginUserId, expertId, amount,orderType,
					  					jumpUrl);
					  			 //微信回调支付界面
					  		     var url=$("#payUrl").val();
					  		     window.location.href=url; 
					    	 }else{
					    		 alert('planTypeName'+planTypeName); 
					    		 alert("【"+planTypeName+"】"+"包次剩余次数"+num);
					    		 //包次购买
					    		 var requestType='buyCommonPlanByNum';
								 var body=new Object;
								 body.loginUserId=loginUserId;
							     body.planId=prodId; 
								 var obj=initRequestParam(requestType,body);           
								 var url=portalUrl+"/order/buyCommonPlanByNum"; 
								 var requestSource='3';
								 //包次购买校验
								 $.ajax({
										type : 'get',
										dataType : "jsonp",
										url : url,
										jsonpCallback : "jsonpCallback",
										async : false,
										data : {
											token : obj.token,
											jsonParams : obj.encParam,
											sign : obj.signParam,
											requestSource : requestSource
										},
										success : function(response) {
											var res0=trim(response.retValue,'g');
										    var ret=decryptByDES(res0, '1379246805559731246875312468');
										    var ret = jQuery.parseJSON(ret);
										    ret=ret.body;
										    if(ret.resultCode=='1000'){
										    	alert('购买成功');
										    	var jumpUrl=html5Url+"my-bill.html";
										    	window.location.href=jumpUrl; 
										    	
										    }else{
										  	  alert(ret.resultDesc);
										    }
										},
										error : function(XMLHttpRequest, textStatus, errorThrown) {
										}
								  });
					    	 }
					      }else{
					    	  alert(ret.resultDesc);
					    	  return ;
					      }
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
					}
			    });
  			***/
  			
  			//1CZ-充值 2GM-购买普通方案 3购买DIY方案 4BC-包次 5BY-包月
			 /**
  			var orderType='2';
  			var jumpUrl=html5Url+"bgfan.html?planId="+planId;
  			setPayObject(title, productId, loginUserId, expertId, orderAmount,orderType,
  					jumpUrl);
  			//微信回调支付界面
  		     var url=$("#payUrl").val();
			 window.location.href=url; 	
			 **/
			 
		//已购买去详情页面
		} else if(isBuyPlan=="0"||isBuyPlan=="2"){
			if (loginUserId=="") {
				alert('请先登录');
				
				//去登陆页面，登陆后回调的页面地址
				goLoginPage("bgfan.html?planId="+planId);
			}
			window.location.href="bgfan.html?planId="+planId;
			
		}
	} 
});
//2.获取筛选条件：
//2.获取赛事筛选时间和具体球赛名称：
    	/*tuijApp.controller("filterContr",function($scope,$http){
					  //接口加工	     
					  var object=new Object; 	
					  var header=new Object;
						header.requestType="getMatchFilter",   
						header.loginUserId="01a4131961a0ad5ad9ac3c9", 
						header.macNo="C8-1F-66-18-CA-07" , 
						header.appVersionCode="1",        
						header.appLang="1",             
						header.appChannel="1",           
						header.appDeviceType="1"
		    		var body=new Object;
					  //字符串加密处理：				
					  object.header=header;//此方法衔接部分见jiami.js		
					  object.body=body;			
					  var encoded =JSON.stringify(object);
					  //加密字符串
					  var str=encryptByDES(encoded,'1379246805559731246875312468');		
				    var sign=hashCode(str);
		            
			      $http({
					method : 'POST',
					url : portalUrl+'match/getMatchFilter',
					params :{token:"",jsonParams:str,sign:sign,requestSource:4},
					headers : { 'Content-Type': 'application/json' }
					}).success(function(response){
								
							//回调函数
					var res0=trim(response.retValue,'g');
					var ret=decryptByDES(res0, '1379246805559731246875312468');
					var ret = jQuery.parseJSON(ret);
					$scope.teams=ret.body.data.leagueMatchList;
					time_list=ret.body.data.colorIssueList;							 
		         });
		
		   }); */

// JavaScript Document
// JavaScript Document
/*//联赛下拉单选择
$('.live_tab li').click(function(){			
	var num=$(this).index();	
	$('.ball-obj li').eq(num).show().siblings().hide();
});
$('#team_lect').click(function(){
	$('.slide_sheet').hide(); 
	$('#team_list').slideToggle();
});				
//直接点击获取比赛队筛选项目
//单选点击获取/取消被选项
$("#t-dd").on('click',"#t-dd div",function(){
	$('.team_list dt span').removeClass();
	$(this).addClass('current_btn');
	$(this).children('input').attr('checked',true);				
});
$("#t-dd").on('click',".current_btn",function(){
	$('.team_list dt span').removeClass();		
	$(this).removeClass('current_btn');
	$(this).children('input').attr('checked',false);				
});
//点击确定按钮收起
$('.conq_btn').click(function(){
	$('#team_list').slideUp();//本来就这一个			
	$('#t-dd div').children('input').attr('checked',false);
	$('#t-dd div').delay(3000).removeClass('current_btn');
	$('.team_list dt span').removeClass('current_div2');
});
//方案结果判断选择
$('.team_rasult').click(function(){
	$(this).css({'background':'red','color':'#fff'})
});
		
		
//联赛点击展开后全选/反选功能
$("#all").click(function () {//全选  
	$(this).addClass('current_div2').siblings().removeClass();
	$("#t-dd :checkbox").attr("checked", true);
	$("#t-dd div").addClass('current_btn');
}); 
$("#othercheck").click(function () {//反选
	$(this).addClass('current_div2').siblings().removeClass();
	$("#t-dd div").each(function () {
		$(this).attr("checked", !$(this).attr("checked"));
		$(this).toggleClass('current_btn')
	});
});
/*$("#othercheck").click(function () {//反选  
	$(this).addClass('current_div2').siblings().removeClass();
	$("#t-dd :checkbox").each(function () {  
    	$(this).attr("checked", !$(this).attr("checked"));
    	$("#t-dd div").removeClass('current_btn');
	});
	$("input[checked=checked]").parent('div').addClass('current_btn');
});*/    	     			    	
//全部,时间菜单点击下拉菜单收展：
/*$('.ball_thr li:lt(2)').bind('click',function(){
	var cont=[];
		cont[0]=['全部','竞彩单关','竞彩串关','亚盘','大小球'];
		cont[1]=time_list;
	var num=$(this).index();
	var x='';
	for(var i=0;i<cont[num].length;i++){
		var x=x+'<li class="cr_li">'+cont[num][i]+'</li>';
	};
	$('.slide_sheet').empty().append(x);
	$('#team_list').hide();
	$('.slide_sheet').slideToggle();    	   	    	
});
//头部菜单栏第一栏点击切换赛事：   
$('.slide_sheet').on('click','.cr_li',function(){
	var txt=$(this).text();
	$(this).css({'color':'red','background':'#ddd'});
	$('.slide_sheet').slideUp(); 
	if(txt.length<=4){$('.tab-li').text(txt);}    	
	if(txt=="竞彩串关"){
		$('.score_tab li').hide();
		$('.ball_thr li:eq(0)').text('竞彩串关');
		$('.score_tab li').eq(2).show();
	}else if(txt=="亚盘"){
		$('.score_tab li').hide();
		$('.ball_thr li:eq(0)').text('亚盘');
		$('.score_tab li').eq(3).show();
	}else if(txt=="大小球"){
		$('.score_tab li').hide();
		$('.ball_thr li:eq(0)').text('大小球');
		$('.score_tab li').eq(4).show();
	}else if(txt=="竞彩单关"){
		$('.score_tab li').hide();
		$('.score_tab li').eq(1).show();
		$('.ball_thr li:eq(0)').text('竞彩单关');
	}else if(txt=="全部"){
		$('.score_tab li').hide();
		$('.score_tab li').eq(0).show();
		$('.ball_thr li:eq(0)').text('全部');
	}
});*/
//////////////////////////////以下是临时只按玩法筛选赛事的方法，上面隐掉的是以后会迭代优化的方案，特此说明
//头部菜单栏第一栏点击切换赛事：
$('#obj_li').bind('click',function(){
	$(this).siblings().css({'color':'#333','background':'inherit'});
	$('#team_list').hide();
	$('.slide_sheet').slideToggle();    	   	    	
});
   
$('.slide_sheet>li').click(function(){
	var num=$(this).index();
	var txt=$(this).text();
	$(this).css({'color':'red','background':'#ddd'}).siblings().css({'color':'#333','background':'#fff'});
	$('#obj_li').text(txt)
	$('.tj_ul>li').eq(num).show().siblings().hide();
	$('.slide_sheet').slideUp(); 
});
//头部菜单栏第二栏点击切换赛事：
$('#time_lect').click(function(){
	$(this).css({'color':'red','background':'#ddd'}).siblings('#team_lect').css({'color':'#333','background':'inherit'});
	$('.slide_sheet').hide();
	$('.tj_ul>li').hide();
	$('.tj_ul>li:eq(3)').show();
});			
//头部菜单栏第三栏点击切换赛事：
$('#team_lect').click(function(){
	$(this).css({'color':'red','background':'#ddd'}).siblings('#time_lect').css({'color':'#333','background':'inherit'});
	$('.slide_sheet').hide();
	$('.tj_ul>li').hide();
	$('.tj_ul>li:eq(4)').show();
});	