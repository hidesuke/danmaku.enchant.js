# --------------------------------
# bullet.js
# 弾に関することを記述するよ
# --------------------------------

class Bullet extends Sprite
  currentFrame : 0

  constructor : (x, y, image, frame) ->
    super 16, 16
    @image = image
    @frame = frame
    @x = x
    @y = y
    @scale 1.5, 1.5
    @speed = 3

  setDirection : (dx, dy) ->
    @dx = dx
    @dy = dy

  setAcceleration : (acc) ->
    @acc = acc

  setSpeed : (speed) ->
    @speed = speed

  behaviorFunction : () ->
    # 動きを定義する関数
    # Bulletの子クラスは
    # これをオーバーライドすればいいんじゃない？
    return

  onenterframe : (callback) ->
    @currentFrame++
    @scene.removeChild @ unless -16 <= @x <= 528
    @scene.removeChild @ unless -16 <= @y <= 528
    @y += @speed




