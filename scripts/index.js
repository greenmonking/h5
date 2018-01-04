$(function(){
	/**
	 * 动画切换
	 */
	var mySwiper = new Swiper('.swiper-container', {
		direction: 'vertical',
//		effect : 'cube',
	    loop: true,
		onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
//			wiperAnimateCache(swiper); //隐藏动画元素 
	        swiperAnimate(swiper); //初始化完成开始动画
	    }, 
	    onSlideChangeEnd: function(swiper){ 
	        swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
	    } 
	})
			
	/**
	 *编辑 
	 */
	$(document).on("click", ".edit",function(event) {
		$('.edit').hide();
		$('.share').hide();
		$('.swiper-container').css({'width':'80%','height':'80%','margin':'10% auto'})
	})
	
	
});
