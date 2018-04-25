/*
* @Author: Administrator
* @Date:   2017-01-13 11:35:24
* @Last Modified by:   Administrator
* @Last Modified time: 2017-01-16 08:22:09
*/
'use strict';
//　需求：滚动页面的时候，动态去改变toubar的透明度
/*
 思路：
（1）给window绑定scroll事件，拿到被卷曲的头部
（2）透明度的比例关系 ：被卷曲的头部/设定的卷曲最大值 = 当前的透明度/透明度的最大值
*/

var maxScrollValue = 600;
var jdHeader = document.querySelector('.jd-header');
window.addEventListener('scroll', function(){

	// 拿到被卷曲的头部
	var _scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	// 当被卷曲的头部小于最大值的情况下，动态改变透明度
	if(_scrollTop < maxScrollValue){
		jdHeader.style.backgroundColor = 'rgba(203,18,36,'+ _scrollTop/maxScrollValue +')';
	} else {
		jdHeader.style.backgroundColor = 'rgba(203,18,36,1)';
	}
})


// 需求 ：动态获取京东秒杀的产品个数 和一个产品的宽度 将得到的值赋值给ul容器
var jdKillScroll = document.querySelector('.jd-kill-scroll');
var jdKillScrollLi = jdKillScroll.querySelectorAll('li');
var jdKillScrollLiWidth = jdKillScrollLi[0].offsetWidth;
jdKillScroll.style.width = jdKillScrollLi.length*jdKillScrollLiWidth + 'px';


// 需求 ：京东快报的无缝滚动

/*
	思路：
	（1）复制第一个Li并且追加到UL的最后面，作为临时工
	（2）设置一个信号量，每一个都让信号量自增一，让ul往上走最大容器.cetner的高度
	（3）当过渡结束的时候，去判断信号量，一旦信号量超过原来的最后一张（不包括那张临时工），我们就让整个ul瞬移回第一张的位置

 */
var newsScrollWrap = document.querySelector('.news-scroll-wrap');
var newsScrollWrapUl = newsScrollWrap.querySelector('.jd-news-scroll');
var newsScrollWrapLi = newsScrollWrapUl.querySelectorAll('li');
var newsScrollWrapHeight = newsScrollWrap.offsetHeight;
var newsTimer = null;
var index = 0;
// 复制第一个Li并且追加到UL的最后面，作为临时工
newsScrollWrapUl.appendChild(newsScrollWrapLi[0].cloneNode(true));

newsTimer = setInterval(function(){
	// 让信号量自增一
	index++;
	// 添加过渡 过渡的时间一定要小于定时器的时间
	newsScrollWrapUl.style.transition = 'top .5s';
	// 每一次让ul走index*newsScrollWrap的高度
	//newsScrollWrapUl.style.transform = 'translateY('+ (-index*newsScrollWrapHeight) +'px)';
	newsScrollWrapUl.style.top = (-index*newsScrollWrapHeight) + 'px';

}, 2000);

// 当过渡结束的时候去判断信号量
newsScrollWrapUl.addEventListener('transitionend',function(){
	//console.log(newsScrollWrapLi.length);
	// 判断信号量
	if(index > newsScrollWrapLi.length - 1){
		index = 0;
		// 干掉过渡 因为我们需要元素直接瞬移会第一张
		newsScrollWrapUl.style.transition = 'none';
		// 直接瞬移会第0的位置
		// newsScrollWrapUl.style.transform = 'translateY(0px)';
		newsScrollWrapUl.style.top = '0px';
	}
})


// 倒计时的逻辑
// 首先声明：一般都是后台返回给的一个时间戳，因为前台的时间不安全

/*思路：
（1）首先获得一个时间差，用未来的时间 - 当前的时间
（2）得到时间差之后，开启定时器，每秒钟让时间差自减一
（3）将时间差转换成时，分，秒
（4）将对应的时分秒放到对应的位置上去
*/

// 当下时间
var nowDate = new Date();
// 未来时间 
var newDate = new Date('Jan 16 2019 11:45:00');
// 拿到两者的时间差 得到的就是一个毫秒数并且转换成秒
var t = Math.floor((newDate - nowDate)/1000);

var jdTimeInfo = document.querySelector('.jd-time-info');
var jdTimeInfoSpan = jdTimeInfo.querySelectorAll('span');

var secKillTimer = null;

secKillTimer = setInterval(function(){
	// 时间差自减一
	t--;
	if(t < 0){
		//alert('时间过期');
		/*for(var i = 0; i < jdTimeInfoSpan.length; i++){
			jdTimeInfoSpan[i].innerHTML = 0;
			if(i == 2 || i == 5){
				jdTimeInfoSpan[i].innerHTML = ':';
			}
		}*/
		// 关闭定时器
		clearInterval(secKillTimer);
		return false;
	}

	// 转换成 天 时  分 秒
	/*
		天 ：t/86400
		时 ：t%86400/3600
		分 ：t%3600/60
		秒 ：t%60
	 */
	var h = Math.floor(t%86400/3600);
	var m = Math.floor(t%3600/60);
	var s = Math.floor(t%60);

	// console.log(h,m,s);
	
	// 将时分秒放到对应的位置上
	// jdTimeInfoSpan[0].innerHTML = Math.floor(h/10);
	// jdTimeInfoSpan[1].innerHTML = Math.floor(h%10);
	// jdTimeInfoSpan[3].innerHTML = Math.floor(m/10);
	// jdTimeInfoSpan[4].innerHTML = Math.floor(m%10);
	// jdTimeInfoSpan[6].innerHTML = Math.floor(s/10);
	// jdTimeInfoSpan[7].innerHTML = Math.floor(s%10);


	// 新方法
	// 思路 ：将时间直接直接连成一个字符串
	// 将时间连成一个字符串
	var str = toTwo(h) + ':' + toTwo(m) + ':' + toTwo(s);

	// console.log(str);
	// 每一次循环的时候去获取这个当前的str的下标对应的值并赋值给对应下标的span
	for(var i = 0; i < jdTimeInfoSpan.length; i++){
		jdTimeInfoSpan[i].innerHTML = str.charAt(i);
	}

}, 1000);
// 如果一旦传进来的数值是一个小于9的数 （一个数）我们就在前面补0
function toTwo (n){
  return n = n > 9 ? '' + n : '0' + n;
}


// 轮播图
var jdCarouse = document.querySelector('.jd-carouse');
var carouseWrap = jdCarouse.querySelector('.carouse-wrap');
var carouseWrapLi = carouseWrap.querySelectorAll('li');
var pointWrap = jdCarouse.querySelector('.point-wrap');
var carouseTimer = null;
// 获取屏幕的宽度
var windowWidth = document.documentElement.offsetWidth;
// 初始化
var left,center,right;
// 获取li的高度赋值给ul
carouseWrap.style.height = carouseWrapLi[0].offsetHeight + 'px'; 

// 动态根据li的个数循环小圆点
for(var i = 0; i < carouseWrapLi.length; i++){
	// 每循环一次 就创建一个Li出来
	var li = document.createElement('li');
	// 如果是第一个，默认添加上当前类
	if(i == 0){
		li.classList.add('active');
	}
	pointWrap.appendChild(li);
}

// 将最初始的位置赋值
left = carouseWrapLi.length - 1;
center = 0;
right = 1;
// 将最开始的三张先就位
carouseWrapLi[left].style.transform = 'translateX('+ -windowWidth +'px)';
carouseWrapLi[center].style.transform = 'translateX(0px)';
carouseWrapLi[right].style.transform = 'translateX('+ windowWidth +'px)';
// 看到下一张的逻辑
function showNext(){
	// 轮转下标
	left = center;
	center = right;
	right++;

	// 极值判断
	if(right > carouseWrapLi.length - 1){
		right = 0;
	}
	// 给元素添加过渡
	carouseWrapLi[center].style.transition = 'transform .5s';
	carouseWrapLi[left].style.transition = 'transform .5s';
	// 右边的图片永远是替补图片，所以不需要走过渡，因为走过渡会穿帮
	carouseWrapLi[right].style.transition = 'none';

	// 设置小圆点
	setPoint();

	// 归位
	carouseWrapLi[center].style.transform = 'translateX(0px)';
	carouseWrapLi[left].style.transform = 'translateX('+ -windowWidth +'px)';
	carouseWrapLi[right].style.transform = 'translateX('+ windowWidth +'px)';
}
// 看到上一张的逻辑
function showPrev(){
	// 轮转下标
	right = center;
	center = left;
	left--;

	// 极值判断
	if(left < 0){
		left = carouseWrapLi.length - 1;
	}
	// 给元素添加过渡
	carouseWrapLi[center].style.transition = 'transform .5s';
	carouseWrapLi[left].style.transition = 'none';
	// 右边的图片永远是替补图片，所以不需要走过渡，因为走过渡会穿帮
	carouseWrapLi[right].style.transition = 'transform .5s';

	// 设置小圆点
	setPoint();

	// 归位
	carouseWrapLi[center].style.transform = 'translateX(0px)';
	carouseWrapLi[left].style.transform = 'translateX('+ -windowWidth +'px)';
	carouseWrapLi[right].style.transform = 'translateX('+ windowWidth +'px)';
}
// 在这里去获取小圆点，不要在上面，因为在上面获取那个时候还没有被创建出来
var pointWrapLi = pointWrap.querySelectorAll('li');

function setPoint(){
	// 让所有的小圆点都干掉active类
	for(var i = 0; i < pointWrapLi.length; i++){
		pointWrapLi[i].classList.remove('active');
	}
	pointWrapLi[center].classList.add('active');
}
carouseTimer = setInterval(showNext, 1000);


// 手指touch的时候去切换图片
jdCarouse.addEventListener('touchstart',touchstartHandler);
jdCarouse.addEventListener('touchmove',touchmoveHandler);
jdCarouse.addEventListener('touchend',touchendHandler);

var startX = 0;  // 记录开始的时候的手指落点
var moveX = 0;	// 记录移动最终的手指落点
var starTime = null;

function touchstartHandler(event){
	// 记录滑动开始的时间
	starTime = new Date();
	// 在最开始的时候清除定时器
	clearInterval(carouseTimer);
	// 获取手指的落点
	startX = event.touches[0].pageX;
	// 清除过渡
	carouseWrapLi[center].style.transition = 'none';
	carouseWrapLi[left].style.transition = 'none';
	carouseWrapLi[right].style.transition = 'none';
}
function touchmoveHandler(event){
	// 获取移动的最终的手指落点
	moveX = event.touches[0].pageX;
	// 手指滑动的距离
	var dx = moveX - startX;

	// 滑动
	carouseWrapLi[center].style.transform = 'translateX('+ dx +'px)';
	carouseWrapLi[left].style.transform = 'translateX('+ (-windowWidth + dx) +'px)';
	carouseWrapLi[right].style.transform = 'translateX('+ (windowWidth + dx) +'px)';

}
function touchendHandler(event){
	// 获取滑动的时间
	var dTime = new Date() - starTime;

	// 判定是否滑动成功
	var endX = event.changedTouches[0].pageX - startX;
	// 往左滑动成功
	// 滑动的距离超过屏幕的三分之一或者滑动的时间小于300同时滑动的距离大于30px则判断滑动成功
	if(endX < (-windowWidth/3) || (dTime < 300 && endX < -30)){
		showNext();
	}else if(endX > (windowWidth/3) || (dTime < 300 && endX > 30)){
		showPrev();
	}else{
		// 给所有的元素添加上过渡
		carouseWrapLi[center].style.transition = 'transform .5s';
		carouseWrapLi[left].style.transition = 'transform .5s';
		carouseWrapLi[right].style.transition = 'transform .5s';
		// 归位
		carouseWrapLi[center].style.transform = 'translateX(0px)';
		carouseWrapLi[left].style.transform = 'translateX('+ -windowWidth +'px)';
		carouseWrapLi[right].style.transform = 'translateX('+ windowWidth +'px)';
	}
	// 重新开启定时器
	carouseTimer = setInterval(showNext, 1000);
}