/*
* @Author: Administrator
* @Date:   2017-01-17 08:46:04
* @Last Modified by:   Administrator
* @Last Modified time: 2017-01-17 09:23:24
*/

'use strict';

// 需求：点击checkbox实现切换效果

var checkboxWrap = document.querySelectorAll('.checkbox-wrap');

for(var i = 0; i < checkboxWrap.length; i++){
	checkboxWrap[i].addEventListener('click', function(){
		// 点击谁就让谁切换checked类
		this.classList.toggle('checked');
	})
}

//需求 ：全选
// 获取全选按钮
var checkAll = document.querySelector('#checkAll');
//获取主体对象
var cartB = document.querySelector('.cart-m-b');
//获取除了全选按钮的所有checkbox
var checkList = cartB.querySelectorAll('.checkbox-wrap');
// 获取除了全选按钮的所有checkbox里面的复选框
var inputAll = cartB.querySelectorAll('input[type="checkbox"]');
checkAll.addEventListener('click',function(){
	// 判断当前的全选按钮是否被勾选上，如果勾选上，将checkList全部选择上
	if(checkAll.classList.contains('checked')){
		for(var i = 0; i < checkList.length; i++){
			checkList[i].classList.add('checked');
			// 让所有的复选框被选中
			inputAll[i].checked = true;
		}
	}else{
		for(var i = 0; i < checkList.length; i++){
			checkList[i].classList.remove('checked');
			// 让所有的复选框取消选中
			inputAll[i].checked = false;
		}
	}
})


// 垃圾桶动画

//找到所有的垃圾桶
var del = document.querySelectorAll('.pro-tb-r');
var delT = null;
var popModel = document.querySelector('.pop-model');
for(var i = 0; i < del.length; i++){
	// 给所有的垃圾桶绑定点击事件
	del[i].addEventListener('click',function(){
		// 找到当前点击的垃圾桶的盖子
		delT = this.children[0];
		// 让盖子做动画
		delT.style.transform = 'rotate(-20deg) translate(-2px,-2px)'
		//让弹出层显示出来
		popModel.style.display = 'block';
	})
};

// 点击取消按钮关闭弹出层同时关闭垃圾桶的盖子
var cancel = document.querySelector('.cancel');
cancel.addEventListener('click',function(){
	//让弹出层隐藏
	popModel.style.display = 'none';
	// 让盖子做动画
	delT.style.transform = 'none';
})

// 点击加减实现商品加减
var jia = document.querySelectorAll('.jia');
var jian = document.querySelectorAll('jian');
var proNum = document.querySelectorAll('.num');

for(var i = 0; i < jia.length; i++){
	// 给所有的加号绑定点击事件
	jia[i].addEventListener('click',function(){
		// 找到当前点击的num里面的input
		var val = this.parentNode.children[1].children[0].value;
		val++;
		this.parentNode.children[1].children[0].value = val;
	})
}