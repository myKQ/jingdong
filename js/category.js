/*
* @Author: Administrator
* @Date:   2017-01-16 09:22:02
* @Last Modified by:   Administrator
* @Last Modified time: 2017-01-16 14:45:55
*/

'use strict';


//需求： 让侧边栏跟随滑动

// 要实现这个需求 第一步首先需要让ul这个元素能够被拖拽

// （1）拖拽  
// 		1，在开始的时候记录手指坐标，在移动的时候获取移动的距离 
// 		2，设置一个中间变量（记录上一次的滑动的位置），用这个中间变量在去累加移动的距离 
// 		3，在滑动结束的时候将最终移动的位置赋值给那个中间变量，以便下一次滑动
// （2）拖拽到了一定的位置就不允许在拖拽了
// 		1，在touchmove的事件里面检测这个值
// 		2，滑动的区间 ：maxY ----- -(ul的高度 - aside的高度 + maxY)
// 		3，一旦超过就让最终的位置等于区间的最大值或者最小值
// （3）反弹效果
// 		1，在touchend的时候去检测是否反弹
// 		2，反弹的区间 ： 0  ----- -(ul的高度 - aside的高度)
// 		3，一旦超出区间，就反弹（回到区间的最大值或者最小值）添加上过渡

scrollY('#touch1');
scrollY('#touch2');
function scrollY(id){
	// 外围大容器
	var cateAside = document.querySelector(id);
	// 滚动容器
	var touchScroll = cateAside.querySelector('.touch-scroll');
	// 两个容器之间相差的距离
	var dHeight = touchScroll.offsetHeight - cateAside.offsetHeight;
	// 下拉或上拉的最大极值
	var maxY = 50;
	touchScroll.addEventListener('touchstart', startHandler);
	touchScroll.addEventListener('touchmove', moveHandler);
	touchScroll.addEventListener('touchend', endHandler);

	var startY = 0; // 存放滑动开始的手指落点
	var centerY = 0; // 记录上一次滑动的最终位置
	var tempY = 0; // 临时的存储变量
	function startHandler (e){
		if(!checkd()){
			return false;
		}
		// 获取手指落点
		startY = e.touches[0].pageY;
		// 在最开始的时候清除过渡
		touchScroll.style.transition = 'none';
	};
	function moveHandler (e){
		if(!checkd()){
			return false;
		}
		// 得到滑动的距离
		var dy = e.touches[0].pageY - startY;

		tempY = centerY + dy;
		// 当在滑动的区间之内的话可以任意滑动滑动
		if(tempY < maxY && tempY > -(dHeight + maxY)){
			touchScroll.style.transform = 'translateY('+ tempY +'px)';
		}else if(tempY >= maxY){
			// 限制tempY的大小
			tempY = maxY;
		}else if(tempY <= -(dHeight + maxY)){
			// 限制tempY的大小
			tempY = -(dHeight + maxY);
		}
	};
	function endHandler (e){
		if(!checkd()){
			return false;
		}
		// 将上一次最终的滑动的位置赋值给centerY 以便下一次滑动的时候基于这个位置在去累加dy
		// centerY = (centerY + dy);
		centerY = tempY;
		// 如果一旦超出
		if(centerY > 0){
			// 还原centerY
			centerY = 0;
			touchScroll.style.transition = 'transform .5s';
			touchScroll.style.transform = 'translateY('+ centerY +'px)';

		}else if(centerY < -dHeight){
			centerY = -dHeight;
			touchScroll.style.transition = 'transform .5s';
			touchScroll.style.transform = 'translateY('+ centerY +'px)';
		}
	};
	// 检测是否需要执行touch事件
	function checkd (){
		return	dHeight > 0 ? true : false;
	}
}