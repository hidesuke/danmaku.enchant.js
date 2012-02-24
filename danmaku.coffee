# -----------------
# enchant.js で弾幕書くよ
# -----------------

enchant()

class DanmakuGame extends Game
  constructor : ->
    super 512, 512
    @fps = 60
    # preloadする素材まわりはこのへんに書いておく
    @preload("./image/chara0.gif")
  
  onload : ->
    label = new Label "東方発火損"
    label.font = "28px 'osaka-mono'"
    label.width = 512
    label.backgroundColor = "red"
    @rootScene.addChild label
    enemy = new Enemy @assets["./image/chara0.gif"]
    enemy.frame = 0
    @rootScene.addChild enemy
    player = new Player @assets["./image/chara0.gif"]
    player.frame = 7
    @rootScene.addChild player
    @drawGrid()
    return

  drawGrid : ->
    for i in [0..8]
      @drawLine i * 64, 0, 1, 512
      @drawLine 0, i * 64, 512, 1

  drawLine : (x, y, w, h) ->
    line = new Label ""
    line.x = x
    line.y = y
    line.width = w
    line.height = h
    line.backgroundColor = "black"
    @rootScene.addChild line


class BodyBase extends Sprite
  x : 0
  y : 0
  constructor : (width, height, x, y, image) ->
    super width, height
    @scale 1.5, 1.5
    @x = x
    @y = y
    @image = image

class Player extends BodyBase
  constructor : (image) ->
    super 32, 32, 256, 400, image

class Enemy extends BodyBase
  constructor : (image) ->
    super 32, 32, 256, 0, image


class Bullet extends Sprite





