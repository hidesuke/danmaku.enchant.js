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
    label.backgroundColor = "red"
    @rootScene.addChild label
    enemy = new Enemy(@assets["./image/chara0.gif"])
    enemy.frame = 0
    @rootScene.addChild enemy
    return

class BodyBase extends Sprite
  x : 0
  y : 0
  constructor : (width, height, x, y, image) ->
    super width, height
    @scaleX = 2
    @scaleY = 2
    @x = x
    @y = y
    @image = image

class Player extends BodyBase
  construnctor : (image) ->
    super 32, 32, 256, 480, image

class Enemy extends BodyBase
  constructor : (image) ->
    super 32, 32, 256, 0, image


class Bullet extends Sprite


