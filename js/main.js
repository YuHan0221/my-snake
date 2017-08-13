var $canvas = $('#canvas')


var food = new Food()
food.render()

var snake = new Snake()
snake.render();
// console.log(snake);

$("button").eq(0).on("click",function(){
  if (snake.started == 1) { return false};
  snake.move();
})
$("button").eq(1).on("click",function(){

  clearInterval(snake.motimer);
  snake.started =0;
})


 $(document).on("keyup",function(e){
      switch (e.keyCode){
        case 39:
          // this.direction == "left" ? break : null; //语法报错，break  return不要放在三元中
          if (this.direction == "left" || this.started == 0) {break};
          this.move1();
          this.goright();          
          this.direction = "right";
        break;
        case 40:
          // this.direction == "up" ? break : null;
          if (this.direction == "up" || this.started == 0) {break};
          this.move1();
          this.godown();          
          this.direction = "down";
        break;
        case 37:
          // this.direction == "right" ? break : null;
          if (this.direction == "right" || this.started == 0) {break};
          this.move1();
          this.goleft();          
          this.direction = "left";
        break;
        case 38:
          // this.direction == "down" ? break : null;
          if (this.direction == "down" || this.started == 0) {break};
          this.move1();
          this.goup();
          this.direction = "up";
        break;
        case 32:
          if (this.started == 1) {
            clearInterval(snake.motimer);
            this.started =0;
          } else {
            snake.move();
          }                                                   
          return false;   //防止空格键默认光标事件，若光标在开始按钮上， 则暂停后马上又启动了。
        break;
      }
  }.bind(snake));
