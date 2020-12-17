/*js哄出现了这几个问题
 问题1::Cannot read property 'XXX' of null错误,原因是由于在加载JS的时候，页面还未加载完成，就出现了这样的错误。解决方法：将js的引入移到界面的最下方
 问题二:使用ajax时，没导入jquery的js*/
var send =document.getElementById('send');//该方法是通过唯一id属性获取dom对象
var pic =document.getElementById('pic');
var txt =document.getElementById('inp');
var info_box = document.getElementsByClassName('info_box')[0];//该方法是获取数组
var onoff=true;
/*pic.onclick=function(){
	if(onoff){
		pic.src='img/2.png';
		onoff=false;
	}
	else{
		pic.src='img/1.png';
		onoff=true;
	}
};
*/
function sendInfo(){
	if(txt.value==''){
		alert('请输入内容');
	}
	else{    
		var nDiv = document.createElement('div');
		var spans = document.createElement('span');
		var imgs = document.createElement('img');
		var sTxt = document.createTextNode(txt.value);
		var info_box = document.getElementsByClassName('info_box')[0];
		//拼接顺序，文本接在span后面，然后span和img都接在div的后面
		spans.appendChild(sTxt);
		nDiv.appendChild(spans);
		nDiv.appendChild(imgs);
		//然后div插到info_box div里
		info_box.insertBefore(nDiv,info_box.lastChild);//insertBefore方法的两个参数分别为，第一格参数为要插入的结点，第二个为插在哪个结点前面
		//给对应的div赋予class属性值，然后根据css渲染出来
		spans.className='infor';
	    nDiv.className='info_r';
	    imgs.src='img/2.png';
		//document.createElement()是在对象中创建一个对象，要与appendChild() 或 insertBefore()方法联合使用。
		//其中，appendChild() 方法在节点的子节点列表末添加新的子节点。insertBefore() 方法在节点的子节点列表任意位置插入新的节点。
		$.ajax({
			type:"post",
			url:"/robotProject/queryRobot.do",
			data:{input:txt.value},
			dataType:"json",
			success:function(response){
				//-------------------------------------------------------------------------------------------
				var nDiv = document.createElement('div');
				var spans = document.createElement('span');
				var imgs = document.createElement('img');
				var sTxt = document.createTextNode(response.answer);
				var info_box = document.getElementsByClassName('info_box')[0];
				spans.appendChild(sTxt);
				nDiv.appendChild(spans);
				nDiv.appendChild(imgs);
				// nDiv.style.display='block';
				info_box.insertBefore(nDiv,info_box.lastChild);
			    spans.className='infol';
					nDiv.className='info_l';
					imgs.src='img/1.png';
			}
		});
	}
	txt.value='';
}