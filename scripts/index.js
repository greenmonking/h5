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
	 *点击编辑按钮
	 */
	$(document).on("click", "#edit",function(event) {
		$('#edit').hide();
		$('#share').hide();
		$('.editableText').addClass('editText');
	});
	
	/**
	 *点击编辑文本
	 */
	$(document).on("click", ".editText",function(event) {
		var option = new Object();
		var randomId = parseInt(Math.random()*(1-10000)+10000);
		option.defaultVal = event.target.innerHTML;
		option.charLen = event.target.innerHTML.length;
		option.id = randomId;
		event.target.id = randomId;
		
		fnCreatePrompt(option)
			
		
	});
	
	
	/**
	 *取消编辑文本
	 */
	$(document).on("click", "#cancel",function(event) {
		$('.createPrompt').html('')
		
	});
	
	/**
	 *确认编辑文本
	 */
	$(document).on("click", "#ensure",function(event) {
		var dataId = event.target.getAttribute('data-id') ;
		$('#' + dataId).text($('textarea').val())
		$('#' + dataId).removeAttr('id');
		$('.createPrompt').html('')
	});
	
	/**
	 * 自定义文本修改框
	 */
	fnCreatePrompt = function(options){
		var theDomData = $.extend(true, {
			id : '',
			defaultVal :  '' ,
			charLen:''
		}, options);
	 	var createPrompt = document.querySelectorAll(".createPrompt");
		var domHtml =  `<div id="editBox">
							<textarea name="" rows="" cols="" placeholder="">`+ theDomData.defaultVal +`</textarea>
							<p><span class="valueLen">`+ theDomData.charLen +`</span>/200</p>
							<div class="btn">
								<button id="cancel" type="button" class="mui-btn mui-btn-outlined">取消</button>
								<button id="ensure" data-id ="`+ theDomData.id +`" type="button" class="mui-btn mui-btn-outlined">确认</button>
							</div>
						</div>
						<div id="editBoxZoom"></div>`
							
		$('.createPrompt').append(domHtml)
		
	}
	
	
});
