$(function(){
	
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
	
	/**
	 * 选中当前音乐
	 */
	$(document).on("tap", "#containerBox ul li",function(event) {
		$(this).addClass('active-music').siblings().removeClass('active-music')
	})
	
	
	
	/**
	 * 添加背景音乐
	 */
	$(document).on("tap", ".addBackgroundMusic",function(event) {
		var isSelect = $('.active-music').length;
		var imgUrl = '';

		if(isSelect === 0){
			// 消息表示
			mui.toast('请选择您需要添加的音乐', {
				duration: 'long',
				type: 'div'
			});
			
		}else{
			
			imgUrl = $('.active-music').find('audio')[0].src;
			window.location.href='./edit.html?imgUrl=' + imgUrl; 
		}

	})
	

	/**
	 * 点击播放或者暂停
	 */
	$(document).on("tap", ".playOrPause",function(event) {
		var player = $(this).find('audio');
		var stateImg = $(this).find('img');
		
		//点击当前按钮，关闭正在播放的音乐，停止文字轮播
		$(this).parent().siblings().find('audio')[0].pause();
		$(this).parent().siblings().find('img')[0].src = "./images/pause.png";
		$(this).parent().siblings().find('.songList').removeClass('theanimation');
		
		if(player[0].paused){  
			//暂停中
			player[0].play();
            stateImg[0].src="./images/play.png";  
            
			//播放音乐轮播歌名    iphone不自动轮播
			$(this).siblings().addClass('theanimation');
			
			
        }else{  
        	//播放中
        	player[0].pause();  
            stateImg[0].src="./images/pause.png"; 
            
            //停止播放文字不轮播
        	$(this).siblings().removeClass('theanimation');
         
        } 
        
        
	});
	
	
	
			
})
