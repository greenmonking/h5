$(function(){
	
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
	 * 二级导航的显隐控制
	 */
	$(document).on('click','.editable',function(ev){
		$('#subNav').toggle()
	})
	$(document).on('click','#footer>li:not(.editable)',function(ev){
		console.log(ev.target)
		$('#subNav').hide()
	})
	
	
	/**
	 * 保存场景编辑
	 */
	$(document).on('click','#saveScene',function(ev){
		
		var btnArray = ['取消', '确定'];
        mui.confirm('保存编辑？', '信息提示', btnArray, function(e) {
            if (e.index == 1) {
            	//确定保存
            	
            	// 消息表示
				mui.toast('保存成功', {
					duration: 'long',
					type: 'div'
				});
            } else {
            	//取消保存
//              alert(2)
            }
        })
        
        
        
	})
	
	
	
	/**
	 * 删除当前页
	 */
	$(document).on('click','.deletePage',function(ev){
		var btnArray = ['取消', '确定'];
        mui.confirm('确认删除当前页？', '信息提示', btnArray, function(e) {
            if (e.index == 1) {
            	//确定删除
            	var pageIndex = $('.swiper-slide').index($('.swiper-slide-active'));
				mySwiper.removeSlide(pageIndex);
            } else {
            	//取消操作
//              alert(2)
            }
        })
	})
	
	
	/**
	 * 增加页
	 */
	$(document).on('click','.addPage',function(ev){
		var pageIndex = $('.swiper-slide').index($('.swiper-slide-active'));

		
		$('.swiper-slide-active').after(` <div class="swiper-slide">
				    	<img src="images/img2.jpg" class="img1"/>
				    </div>`)
		//重新计算slider数量
		mySwiper.updateSlidesSize();
		
		//swiper切换到指定slider
		mySwiper.slideTo(pageIndex + 1, 50, false);
		
		//swiper2.0里面提供的方法
		//var newSlide = mySwiper.insertSlideAfter(pageIndex,'<p>这是一个新的slide</p>','swiper-slide ','div');
	})
	
	/**
	 *点击跳转音乐列表
	 */
	$(document).on("click", ".addBackgroundMusic",function(event) {
		window.location.href='./music.html';
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
		
		/**
		 * 实时检测文本框内的字数，并展示出来
		 */
		$('#editBox textarea').on('input propertychange',function(){
			$('.valueLen').text($(this)[0].value.length)
		});
		
	});
	
	/**
	 * 点击更换图片
	 */
	$(document).on("click", ".editImg",function(event) {
		
		console.log(event.target)
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
