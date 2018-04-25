/*
* @Author: Administrator
* @Date:   2017-01-16 08:57:19
* @Last Modified by:   Administrator
* @Last Modified time: 2017-01-16 09:11:40
*/

'use strict';

// 将最开始的三张先就位
carouseWrapLi[left].style.transform = 'translateX('+ -windowWidth +'px)';
carouseWrapLi[center].style.transform = 'translateX(0px)';
carouseWrapLi[right].style.transform = 'translateX('+ windowWidth +'px)';

// 归位
carouseWrapLi[center].style.transform = 'translateX(0px)';
carouseWrapLi[left].style.transform = 'translateX('+ -windowWidth +'px)';
carouseWrapLi[right].style.transform = 'translateX('+ windowWidth +'px)';
// 归位
carouseWrapLi[center].style.transform = 'translateX(0px)';
carouseWrapLi[left].style.transform = 'translateX('+ -windowWidth +'px)';
carouseWrapLi[right].style.transform = 'translateX('+ windowWidth +'px)';

// 滑动
carouseWrapLi[center].style.transform = 'translateX('+ dx +'px)';
carouseWrapLi[left].style.transform = 'translateX('+ (-windowWidth + dx) +'px)';
carouseWrapLi[right].style.transform = 'translateX('+ (windowWidth + dx) +'px)';

// 归位
carouseWrapLi[center].style.transform = 'translateX(0px)';
carouseWrapLi[left].style.transform = 'translateX('+ -windowWidth +'px)';
carouseWrapLi[right].style.transform = 'translateX('+ windowWidth +'px)';

function setTranform(dx){

	dx = dx || 0;

	// 滑动
	carouseWrapLi[center].style.transform = 'translateX('+ dx +'px)';
	carouseWrapLi[left].style.transform = 'translateX('+ (-windowWidth + dx) +'px)';
	carouseWrapLi[right].style.transform = 'translateX('+ (windowWidth + dx) +'px)';
}



// 给元素添加过渡
carouseWrapLi[center].style.transition = 'transform .5s';
carouseWrapLi[left].style.transition = 'transform .5s';
// 右边的图片永远是替补图片，所以不需要走过渡，因为走过渡会穿帮
carouseWrapLi[right].style.transition = 'none';

// 给元素添加过渡
carouseWrapLi[center].style.transition = 'transform .5s';
carouseWrapLi[left].style.transition = 'none';
// 右边的图片永远是替补图片，所以不需要走过渡，因为走过渡会穿帮
carouseWrapLi[right].style.transition = 'transform .5s';

// 清除过渡
carouseWrapLi[center].style.transition = 'none';
carouseWrapLi[left].style.transition = 'none';
carouseWrapLi[right].style.transition = 'none';

// 给所有的元素添加上过渡
carouseWrapLi[center].style.transition = 'transform .5s';
carouseWrapLi[left].style.transition = 'transform .5s';
carouseWrapLi[right].style.transition = 'transform .5s';

function setTransition(a,b,c){
	if(a){
		carouseWrapLi[left].style.transition = 'transform .5s';
	}else{
		carouseWrapLi[left].style.transition = 'none';
	}
	if(b){
		carouseWrapLi[center].style.transition = 'transform .5s';
	}else{
		carouseWrapLi[center].style.transition = 'none';
	}
	if(c){
		carouseWrapLi[right].style.transition = 'transform .5s';
	}else{
		carouseWrapLi[right].style.transition = 'none';
	}
}