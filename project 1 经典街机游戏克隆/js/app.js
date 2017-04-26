// 这是我们的玩家要躲避的敌人 
var Enemy = function(x,y,speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
	this.x=x;
	this.y=y;
	this.speed=speed;
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x+=this.speed*dt;
    this.checkCollisions(player);
    if(this.x>83*6){//判定 当虫子移出地图时 回到初始位置 给玩家一种重新生成敌人的错觉。
    	this.x=0;
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.checkCollisions=function(player){
	if(Math.abs(this.x-player.x)<=83&&Math.abs(this.y-player.y)<55){//此处的55是一个格子的高度 ,83是一个格子的宽度
		//初始化任务对象的位置
		player.x=200;
		player.y=404;
	}
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player=function(x,y,score){
	this.x=x;
	this.y=y;
	this.sprite='images/char-boy.png';
	this.score=score;
	};
//玩家类 的方法	
Player.prototype.update=function(dt){
	if(this.y<55){ //检测是否过关。只需检测Y坐标即可。
		var success=document.getElementById('success');
		success.style.color="red";
		success.style.lineHeight="60px";
		success.style.fontSize="60px";
		var score=this.showScore();//显示分数
		success.innerHTML="分数："+score;
		//将玩家归位
			player.x=200;
			player.y=404;		
	}
	
};
Player.prototype.render=function(){
	ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};
Player.prototype.showScore=function(){
	this.score++;
	return this.score;
	console.log(this.score);
};
Player.prototype.handleInput=function(movement){
	switch(movement){  
//在人物移动的同时进行边界检测，如果人物左移时X坐标已经在边界，
//保持它的X坐标不变（人物就无法移到边界外了），同理Y坐标也一样！
		case 'left':
			if(this.x<=83){   
				this.x=this.x;break;
			}else{
				this.x-=101;break;
			}
		case 'up':
			if(this.y<0){
				this.y=this.y;break;
			}
			else{
				this.y-=83;break;
			}
		case 'right':
			if(this.x>=402){
				this.x=this.x;break;
			}
			else{
				this.x+=101;break;
			}
		
		case 'down':
			if(this.y>=404){
				this.y=this.y;break;
			}
			else{
				this.y+=83;break;
			}
	}
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
var allEnemies=[   
//采用Math.random生成随机速度，和随机初始x坐标
//第一行虫子
	new Enemy(0,55,Math.random()*100+50), 
	new Enemy((Math.random()-1)*500,55,Math.random()*100+100),
//第二行虫子	
	new Enemy(0,83*1+55,Math.random()*100+50),
	new Enemy((Math.random()-1)*500,83*1+55,Math.random()*100+100),
//第三行虫子	
	new Enemy(0,83*2+55,Math.random()*100+50),
	new Enemy((Math.random()-1)*500,83*2+55,Math.random()*100+100),
	];
// 把玩家对象放进一个叫 player 的变量里面
var player=new Player(200,404,0); //给小家伙一个初始位置和初始分数0

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

