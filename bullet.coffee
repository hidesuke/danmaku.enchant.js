# --------------------------------
# bullet.js
# 弾に関することを記述するよ
# --------------------------------

# -------------------------
# 基本の打ちおろし弾
# -------------------------
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

  setSpeed : (speed) ->
    @speed = speed

  behaviorFunction : () ->
    # 動きを定義する関数
    # Bulletの子クラスは
    # これをオーバーライドすればいいんじゃない？
    @speed = 5
    @y += @speed
    return

  checkRange : ->
    @scene.removeChild @ unless -16 <= @x <= 528
    @scene.removeChild @ unless -16 <= @y <= 528

  onenterframe : (callback) ->
    @checkRange()
    @behaviorFunction()


# -----------------------
# 自機狙い
# -----------------------
class AimBullet extends Bullet
  constructor : (x, y, dx, dy, image, frame) ->
    super x, y, image, frame
    @dx = dx
    @dy = dy
    @acc = 0
    @speed = 5
    rate = @speed / Math.sqrt( (x - dx) * (x - dx) + (y - dy) * (y - dy) )
    @deltaX = (dx - x) * rate
    @deltaY = (dy - y) * rate

  behaviorFunction : () ->
    @x += @deltaX
    @y += @deltaY
    


