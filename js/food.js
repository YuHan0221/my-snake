function Food() {
  this.width = 20
  this.height = 20
  this.borderRadius = this.width/2
  this.backgroundColor = 'yellow'
  this.top = _.random(0, ($canvas.height() / this.height - 1)) * this.height
  this.left = _.random(0, ($canvas.width() / this.width - 1)) * this.width
  this.position = 'absolute',
  this.zIndex = 1

}

Food.prototype.render = function () {
  // 这里直接将生成的 jQuery 包装的 DOM 对象挂载到实例对象上
  // 目的是为了在 Food 的其它方法中可以访问当前实例对象对应的真实的 DOM 对象
  this.$this = $('<div></div>').css({
    width: this.width,
    height: this.height,
    borderRadius: this.borderRadius,
    backgroundColor: this.backgroundColor,
    top: this.top,
    left: this.left,
    position: this.position,
    zIndex:this.zIndex
  })
  // 将生成的食物追加渲染到游戏画布上
  $canvas.append(this.$this)
}

Food.prototype.remove = function () {
  // 通过实例对象找到自己的 DOM 对象，然后删除
  this.$this.remove()
}
