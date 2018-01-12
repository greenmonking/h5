$(function(){
	
	mui.init();
	
	/**
	 * 动画切换
	 */
	var mySwiper = new Swiper('.swiper-container', {
		direction: 'vertical',
//		effect : 'cube',
//	    loop: true,
		onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
//			wiperAnimateCache(swiper); //隐藏动画元素 
	        swiperAnimate(swiper); //初始化完成开始动画
	    }, 
	    onSlideChangeEnd: function(swiper){ 
	        swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
	    } 
	})
	
	/**
	 * 判断文本是否修改过
	 */
	if(localStorage.getItem("text1") != null){
		$('.text1').text(localStorage.getItem("text1"))
		$('.text2').text(localStorage.getItem("text2"))
	}
	
	/**
	 * 判断是否修改背景音乐
	 */
	if(localStorage.getItem("media") != null){
		var media = document.getElementById("media");
		media.src = localStorage.getItem("media");
	}
	
	
	
	/**
	 * 获取URL中参数值
	 * @param {Object} name
	 */
	function getQueryString(name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		var r = window.location.search.substr(1).match(reg);
		if(r != null) {
			return decodeURI(r[2]);
		}
		return null;
	}
	
			
	/**
	 *点击编辑按钮
	 */
	$(document).on("click", "#edit",function(event) {
		window.location.href='./edit.html'; 
	});
	

	//--创建页面监听，等待微信端页面加载完毕 触发音频播放
	document.addEventListener('DOMContentLoaded', function () {
	    function audioAutoPlay() {
	        var media = document.getElementById('media');
	            media.play();
	        document.addEventListener("WeixinJSBridgeReady", function () {
	            media.play();
	        }, false);
	    }
	    audioAutoPlay();
	});
	//--创建触摸监听，当浏览器打开页面时，触摸屏幕触发事件，进行音频播放
	document.addEventListener('touchstart', function () {
	    function audioAutoPlay() {
	        var media = document.getElementById('media');
	            media.play();
	    }
	    audioAutoPlay();
	});
	
	/**
	 * 控制音乐的播放暂停
	 */
	var x = document.getElementById("media"); 

	$(function(){
	    $("#audio_btn").click(function(){
	        $(this).toggleClass("rotate"); //控制音乐图标 自转或暂停
	        
	        //控制背景音乐 播放或暂停            
	        if($(this).hasClass("rotate")){
	            x.play();
	        }else{
	            x.pause();
	        }
	    })
	});
	

            
            
});
