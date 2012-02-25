# ----------------------------
# danmaku.enchant.js
# enchant.js で弾幕書くよ
# ----------------------------

enchant()

class DanmakuGame extends Game
  constructor : ->
    super 512, 512
    @fps = 60
    # preloadする素材まわりはこのへんに書いておく
    @preload "./image/chara0.gif",
      "./image/icon0.gif",
      "./image/effect0.gif"
  
  onload : ->
    @danmakuScene = new Scene()
    @pushScene @danmakuScene
    @makeStage()
    @setPlayer()
    @setEnemy()

  onenterframe : ->
    @nbullet() if @nbullet isnt null and @nbullet isnt undefined
    if @frame % 180 is 0
      ###
      @nbullet = @nBullet =>
        bullet = new Bullet @enemy.x, @enemy.y, @assets["./image/icon0.gif"], 45
        @danmakuScene.addChild bullet
      ###
      @nbullet = @nBullet =>
        bullet = new AimBullet @enemy.x, @enemy.y, @player.x, @player.y, @assets["./image/icon0.gif"], 45
        @danmakuScene.addChild bullet
      #bullet = new Bullet @enemy.x, @enemy.y, @assets["./image/icon0.gif"], 45
      #bullet = new AimBullet @enemy.x, @enemy.y, @player.x, @player.y, @assets["./image/icon0.gif"], 45
      #@danmakuScene.addChild bullet

  nBullet : (bulletKindCallback) ->
    n = 5
    interval =10
    diffInterval = 0
    return =>
      if diffInterval < 0
        if n > 0
          bulletKindCallback()
          n--
          diffInterval = interval
      else
        --diffInterval
        
  setPlayer : ->
    @player = new Player @assets["./image/chara0.gif"]
    @player.frame = 7
    @danmakuScene.addEventListener "upbuttondown", =>
      @player.y -= 4
    @danmakuScene.addEventListener "downbuttondown", =>
      @player.y += 4
    @danmakuScene.addEventListener "leftbuttondown", =>
      @player.x -= 4
    @danmakuScene.addEventListener "rightbuttondown", =>
      @player.x += 4
    @danmakuScene.addChild @player

  setEnemy : ->
    @enemy = new Enemy @assets["./image/chara0.gif"]
    @enemy.frame = 0
    @enemy.setBulletImage @assets["./image/icon0.gif"]
    @danmakuScene.addChild @enemy

  makeStage : () ->
    label = new Label "東方発火損"
    label.font = "28px 'osaka-mono'"
    label.width = 512
    label.backgroundColor = "red"
    @danmakuScene.addChild label
    @drawGrid()

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
    @danmakuScene.addChild line

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
  goingDown : true
  frameCount : 0
  constructor : (image) ->
    super 32, 32, 256, 0, image

  onenterframe : () ->
    @move()

  setBulletImage : (image) ->
    @bulletImage = image

  move : () ->
    if @goingDown
      if 0 <= @y <= 256
        @y++
      else
        @goingDown = false
        @y--
    else
      if 0 <= @y <= 256
        @y--
      else
        @goingDown = true
        @y++


