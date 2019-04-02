$(function(){
	//游戏规则点击
	$('.rules').click(function()
		{
			$('.rule').stop().fadeIn(100);
		});
	//关闭按钮
	$('.close').click(function() {
		/* Act on the event */
		$('.rule').stop().fadeOut(100);
		return false;
	});
	//监听开始游戏按钮点击
	$('.start').click(function() {
		/* Act on the event */
		$(this).stop().fadeOut(100);

		progressHandler();
		//灰太狼动画方法
		wolf();
	});
	$('.reStart').click(function() {
		/* Act on the event */

		$('.mask').stop().fadeOut(100);
		$('.score').text("0");
		$('.wolfClass').remove();
		progressHandler();
		//灰太狼动画方法
		wolf();
	});

	var wolfTimer = null;

	//进度条处理
	function progressHandler()
	{
		$('.progress').css({
			width:180
		});
		var timer = setInterval(function()
		{
			//进度条当前宽度
			var progressWidth = $('.progress').width();

			progressWidth-=3; 
			 
			$('.progress').css({
				width: progressWidth
			});
			//监听进度条是否走完
			if(progressWidth<=0)
			{ 
				clearInterval(timer);
				gameOver();
				$('.mask').stop().fadeIn(100);
				
			}
		},100);
	}

	function wolf()
	{
		//九个位置
		var arrPos = [
		{left:'100px',top:'115px'},
		{left:'20px',top:'160px'},
		{left:'190px',top:'142px'},
		{left:'105px',top:'193px'},
		{left:'19px',top:'221px'},
		{left:'202px',top:'212px'},
		{left:'120px',top:'275px'},
		{left:'30px',top:'295px'},
		{left:'209px',top:'297px'}
		];	
		var wolf_1 = 'images/h';
		var wolf_2 = 'images/x';

		//创建图片
		var $wolfImg = $("<img src = '' class='wolfClass'>");

		//获取图片位置
		var posInt = parseInt(Math.random()*10);
		if (posInt>=9) {
			posInt=8;
		}
		//随机获取图片

		var wolfNum = Math.round(Math.random())==0?wolf_1:wolf_2;
		//设置图案显示位置
		$wolfImg.css({
			position : 'absolute',
			top : arrPos[posInt].top,
			left : arrPos[posInt].left
		});
			window.wolfBeg = 0;
			window.wolfEnd=5;
		wolfTimer  = setInterval(function(){
			if(wolfBeg>wolfEnd)
			{
				$wolfImg.remove();
				clearInterval(wolfTimer);
				wolf();
			}
			$wolfImg.attr("src",wolfNum+wolfBeg+'.png');
			wolfBeg++;
		},200);
		

		//将图片添加到页面上
		$('.container').append($wolfImg);

		gameRules($wolfImg);
	};
	function gameRules($wolfImg)
	{
		$wolfImg.one('click',function() {
			var $src = $wolfImg.attr('src');
			var flag = $src.indexOf('h')>=0;
			if(flag)
			{
				$('.score').text(parseInt($('.score').text()) + 10);
			}
			else 
			{
				$('.score').text(parseInt($('.score').text()) - 10)
			}
		});
	}


	function gameOver()
	{
		$('.wolfClass').remove();
		clearInterval(wolfTimer);
	}
});