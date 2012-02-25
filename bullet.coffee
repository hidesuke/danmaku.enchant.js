# --------------------------------
# bullet.js
# 弾に関することを記述するよ
# --------------------------------

class Bullet extends Sprite
  constructor : (x, y, image, frame) ->
    super 16, 16
    @image = image
    @frame = frame
    @x = x
    @y = y
    @scale 1.5, 1.5

  setDirection : (dx, dy) ->
    @dx = dx
    @dy = dy

  setAcceleration : (acc) ->
    @acc = acc

  behaviorFunction : () ->


  onenterframe : (callback) ->
    @scene.removeChild @ unless 0 <= @x <= 512
    @scene.removeChild @ unless 0 <= @y <= 512
    @y += @acc

