
function checkXssChar(arg) { 
 arg = arg.replace("<", "").replace(">", "").replace("'", "").replace('"', "");
 return arg;
}

var pageurl = location.href;	


if(pageurl.indexOf("http://")>=0){
	var arghttp= pageurl.replace("http://","https://");
	location.href =  checkXssChar(arghttp);	
}	
	
	
function netfunnelSetting(){
	$("a[data-netfunnel]").on("click", function(){
			
		var flag = $(this).data("netfunnel");		
		if(flag != undefined){
			return NetFunnel_Action({action_id:flag, proto:"https", port: 443},$(this).attr("href"));			
		}
	});
}

	
function onPage(val){
	sf.page.value = val;
	goGetSubmit();
	
} 

function goGetSubmit(){	
	$("#sf").attr("method", "get");
	$("#sf").submit();	
}

function ajaxCallPage(){
	
	$.ajax({
		url : $("#sf").attr("action")
		, type : 'POST'
		, dataType : "HTML"
		, data : $("#sf").serialize()
		, success : function(data){
			$("#content_inner").remove();
			$("#content").append(data);
			
			ajaxBindEvent();
			ga('send', 'pageview');
			
		}
			
	});
}

$(function(){

	ajaxBindEvent();
	
});

function ajaxBindEvent(){
	
	
	$(".input-search-wrap button.btn-search-submit").on("click", function(e){
		if(!$(this).attr("onclick") ){
			e.preventDefault();
			$("[name='page.page']").val("1");
			goGetSubmit();
		}		
	});
	
	$(".input-search-wrap text").on("keydown", function(e){
		 var keyCode = (e.keyCode ? e.keyCode : e.which);
		 $("[name='page.page']").val("1");
         if(keyCode === 13) {
        	 goGetSubmit();        	   
         }		
	});
}

var pressObj = new Object();
var socialObj = new Object();
var pressArray = new Array();

function clickHash(){
	
	if(location.hash != undefined && location.hash != ""){
        var _hash = location.hash.replace('go_', '');
		if($("a[href='"+_hash+"']").size() > 0 ){
			$("a[href='"+_hash+"']").click();
			$("select option[value='"+_hash.replace("#", "")+"']").prop("selected", "selected");
		}
	}
}

function onDisplayPress(){
	
	var today_getYear =  (new Date()).getFullYear();
	var today_month = (new Date()).getMonth()+1;
	var today = (new Date()).getDate();
	var todayHour = (new Date()).getHours();
	
	
	today_getYear =today_getYear +"";
	
	if (today_month > 0 && today_month < 10){
		today_month = "0" + today_month;
	} else {
		today_month = today_month + "";
	}
	
	if (today > 0 && today < 10){
		today = "0" + today;
	} else {
		today = today + "";
	}
	if (todayHour >= 0 && todayHour < 10){
		todayHour = "0" + todayHour;
	}	else {
		todayHour = todayHour + "";
	}
	var td = today_getYear + today_month +today + todayHour;
	
	for( var i = 0; i< pressArray.length; i++){
			  if(pressArray[i].show == 'DATE'){
				  if( pressArray[i].st_dt <= td && td < pressArray[i].ed_dt ){
					  $("li#"+pressArray[i]["li-id"]).siblings("[id^="+pressArray[i].top+"]").remove();				  
				  }else{
					  $("li#"+pressArray[i]["li-id"]).remove();				
				  }
			  }else if(pressArray[i].show == 'ON'){
				  $("li#"+pressArray[i]["li-id"]).siblings("[id^="+pressArray[i].top+"]").remove();
				
			  }
	}
		 
	if($("#pressContents").find("a").size() != 2){
		$("#sectionNews").hide();
	}	 
	
}
