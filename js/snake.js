function Snake () {
  this.width = 20
  this.height = 20
  this.size = 8
  this.headColor = 'red'
  this.bodyColor = 'skyblue'
  this.top = this.height * 2
  this.left = this.width * 1
  this.borderRadius = this.width/4
  this.position = 'absolute'
  this.direction = "right"
  this.leftn = 0;   //记录舌头位置
  this.topn  = 0;
  this.started = 0;  //记录是否已经开始移动0 未动，1 动
  this.score = 0;
}

//渲染蛇身
Snake.prototype.render = function () {
  var arr = []
  for(var i = 0; i < this.size; i++) {
    var $item = $('<div></div>')
    $item.css({
      width: this.width,
      height: this.height,
      backgroundColor: this.bodyColor,
      top: this.top,
      left: (i + 1) * this.left,
      position: this.position,
      borderRadius: this.borderRadius
    })
    arr.push($item)
  }
  _.last(arr).css({
    backgroundColor: this.headColor
  })
  arr.forEach(function ($item) {
    $canvas.append($item)
  })

// return arr;
this.arr = arr;
}

//记录舌头，控制蛇身移动一步，判断是否吃到食物
Snake.prototype.move1 = function(){
  
       this.leftn = _.last(this.arr).position().left;
       this.topn = _.last(this.arr).position().top;
       // 记录蛇头的位置 ，当蛇头位置与食物位置重合时，
       // 蛇尾加1个，先跟蛇尾重合，下一刻蛇尾就走了，食物重置。
       if (this.leftn === food.left && this.topn === food.top) {
        var $item = $('<div></div>')
            $item.css({
              width: this.width,
              height: this.height,
              borderRadius: this.borderRadius,
              backgroundColor: this.bodyColor,
              top: _.first(this.arr).position().top,
              left: _.first(this.arr).position().left,
              position: this.position
            })
          this.arr.unshift($item);//添加到数组中，用于后续移动
          $canvas.append($item);//添加到画布中，显示

           var level = $('#mode').val();
          for (var j = this.arr.length-2; j >0; j--) {
            (function(){   
              var jj =j;
              var detime = Math.floor(100/this.arr.length)/100;
              var delay = (this.arr.length - j+1)*detime*level;
              console.log(delay);
              setTimeout(function(){
                // console.log(delay);
                // console.log(detime);
                // console.log(j);
                food.$this.css({
                  transition:'all '+ detime +'s' +' linear',
                  left:this.arr[jj].position().left,
                  top:this.arr[jj].position().top
                }) 
              }.bind(this),delay)
             
            }.bind(this))()
          };
         
        
          // console.log(this.arr);
        setTimeout(function(){
          food.remove();  //删除食物
          food = new Food();  //创建食物，注意不能var，用原变量food，否则找不到位置
          food.render();  //渲染到画布上
        },level*2);
        

           this.score++; 
           $('.score').text(this.score);
                                  
       }


    for (var i = 0; i < this.arr.length-1; i++) {
//判断 若咬到自己，结束游戏，炸开
      if (this.leftn == this.arr[i].position().left && 
          this.topn == this.arr[i].position().top) {
          clearInterval(this.motimer);
        for (var i = 0; i < this.arr.length; i++) {
          this.arr[i].css({
            transition: 'all 1s',
            left:_.random(0, ($canvas.width() / this.width - 1)) * this.width,
            top:_.random(0, ($canvas.height() / this.height - 1)) * this.height

          })
        }

        break;          
      }
    //判断咬到墙壁，游戏结束，头断。。。
    if (this.leftn < 0 || 
        this.leftn >$canvas.width()-this.width||
        this.topn < 0||
        this.topn > $canvas.height()-this.height
        ) {

    clearInterval(this.motimer);  //由于是定时器内部清除的定时器，
    //这个定时器内部的后续程序还会执行完,这地方体现在舌头还会向前走一步
      _.last(this.arr).css({
          transition: 'all 1s',
          transform:'rotate(225deg)'
      })
      break;
    }



      this.arr[i].css({
        left:this.arr[i+1].position().left,
        top:this.arr[i+1].position().top
      }); 

      
    }
}
//动起来
Snake.prototype.move = function(){ 
 // clearInterval(this.motimer); 
 var level = $('#mode').val();
 
 this.started = 1;     
 this.motimer= setInterval(function(){ 
    this.move1(); //蛇身先动，蛇头动

    switch (this.direction){
      case "right" :
        this.goright();
      break;
      case "down" : 
        this.godown();
       break;
       case "up" : 
       this.goup();
       break;
       case "left" : 
       this.goleft();
       break;
    }

  }.bind(this),level)
}

//四个方向设置
Snake.prototype.goright = function(){
   _.last(this.arr).css({
            left:this.leftn+this.width,
            top:this.topn
        });
}
Snake.prototype.goleft = function(){
   _.last(this.arr).css({
            left:this.leftn-this.width,
            top:this.topn
        });
}
Snake.prototype.goup = function(){
    _.last(this.arr).css({
            left:this.leftn,
            top:this.topn-this.height
        });
}
Snake.prototype.godown = function(){
   _.last(this.arr).css({
            left:this.leftn,
            top:this.topn+this.height
        });
}