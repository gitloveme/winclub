function getQueryString(name,str) {
    str=str|| decodeURIComponent(window.location.search);
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = str.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
var weChatCode=getQueryString("code");

if(localStorage.getItem("weChatLoginInfo")==null && weChatCode==null){
    var backUrl=encodeURIComponent('http://h5.wingoalclub.com/index1.html');
    var channelId=getQueryString("channelId") || "channelId";
    location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa223d1531ef58b9e&redirect_uri="+backUrl+"&response_type=code&scope=snsapi_base&state="+channelId+"#wechat_redirect";
}else{
    if(localStorage.getItem("weChatLoginInfo") == null){//此时绑定微信用户code
        alert(location.href);
    }
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

$(function (){
    var loadDom=document.getElementById("loading");
    loadDom.setAttribute("class","outloading");
    setTimeout(function (){
        document.body.removeChild(loadDom);
    },500);

});