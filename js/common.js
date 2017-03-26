function openLink(href){
	if(localStorage.getItem("userLogin") != "login"){
		alert("请先登录");
		location.href="/login.html";
	}
	location.href=href;
}
function getQueryString(name,str) {
    str=str|| decodeURIComponent(window.location.search);
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = str.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
function jumpExpert(that){
    if(!that) return false;
    localStorage.removeItem("expertId");
    localStorage.removeItem("expertImg");
    localStorage.removeItem("expertName");
    localStorage.removeItem("expertIntro");
    localStorage.setItem("expertId",that.attr("expertid"));
    localStorage.setItem("expertImg",that.attr("expertimg"));
    localStorage.setItem("expertName",that.attr("expertname"));
    localStorage.setItem("expertIntro",that.attr("expertintro"));
    location.href="expert.html?expertid="+that.attr("expertid");
}
function buyLotterys(recommendId,payType){
    payType=payType ||2;//默认微信支付
    console.log("购买推荐");
    $.ajax({
        type:"get",
        url:"http://h5.wingoalclub.com/zucai/inf/buy",
        data:{recommendid:recommendId,payType:payType,timer:new Date().getTime()},
        dataType:"json",
        error:function (){alert("购买失败")},
        success:function (data){
            if(data && data.status==200 && data.error == null){
                alert("购买成功！");
            }else{
                var errormsg=data.error || "出现未知错误";
                alert(errormsg);
            }
        }
    });
}
/*微信支付*/
function weChatPay(backTitle,recommendid,price){
    if(localStorage.getItem("userLogin") != "login"){
            location.href="/login.html";
            return false;
        }
        var backUrl=encodeURIComponent('http://h5.wingoalclub.com/pay/pay.html');
        //var backUrl=encodeURIComponent('http://h5.wingoalclub.com/pay/pay.html');
        var backcontent=backTitle+"string"+recommendid+"string"+price;
        location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa223d1531ef58b9e&redirect_uri="+backUrl+"&response_type=code&scope=snsapi_base&state="+backcontent+"#wechat_redirect";
}
$.ajax({
    type:"get",
    url:"http://h5.wingoalclub.com/zucai/inf/isUserLogin",
    data:{timer:new Date().getTime()},
    dataType:"json",
    success:function (data){
        if(data && data.status ==200 && data.error == null){
            console.log("用户登录");
            localStorage.setItem("userLogin","login");
        }else{
            localStorage.removeItem("userLogin");
        }
    }
});
$(function (){
    var loadDom=document.getElementById("loading");
    loadDom.setAttribute("class","outloading");
    setTimeout(function (){
        document.body.removeChild(loadDom);
    },500);
	//判断用户是否登录
    
	
});