# ----------------------------
# danmaku.enchant.js
# enchant.js で弾幕書くよ
# ----------------------------

enchant()

class DanmakuGame extends Game
  mode : 0
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
    @danmakuScene.addEventListener "touchend", =>
      @mode = 0 if ++@mode > 5
      @danmakuScene.removeChild @label
      switch @mode
        when 0
          @makeLabel "単発撃ち下ろし", "red"
        when 1
          @makeLabel "単発自機狙い", "blue"
        when 2
          @makeLabel "撃ち下ろし、N連射", "green"
        when 3
          @makeLabel "自機狙い、N連射", "yellow"
        when 4
          @makeLabel "固定自機狙い、N連射", "gray"
        when 5
          @makeLabel "N連N分裂", "teal"


  onenterframe : ->
    @nbullet() if @nbullet isnt null and @nbullet isnt undefined
    if @frame % 180 is 0
      switch @mode
        when 0
          # 単発撃ち下ろし
          console.log "単発撃ち下ろし"
          bullet = new Bullet @enemy.x, @enemy.y, @assets["./image/icon0.gif"], 45
          @danmakuScene.addChild bullet
        when 1
          # 単発自機狙い
          console.log "単発自機狙い"
          bullet = new AimBullet @enemy.x, @enemy.y, @player.x, @player.y, @assets["./image/icon0.gif"], 45
          @danmakuScene.addChild bullet
        when 4
          # 固定自機狙い、N連射
          console.log "固定自機狙い、N連射"
          @nbullet = @fixedAimNBullet()
        when 2
          # 撃ち下ろし、N連射
          console.log "撃ち下ろし、N連射"
          @nbullet = @nBullet =>
            bullet = new Bullet @enemy.x, @enemy.y, @assets["./image/icon0.gif"], 45
            @danmakuScene.addChild bullet
        when 3
          # 自機狙い、N連射
          console.log "自機狙い、N連射"
          @nbullet = @nBullet =>
            bullet = new AimBullet @enemy.x, @enemy.y, @player.x, @player.y, @assets["./image/icon0.gif"], 45
            @danmakuScene.addChild bullet
        when 5
          # n連n分裂
          console.log "n連n分裂"
          @nbullet = @nBulletNSpread()

  # n連射
  nBullet : (bulletKindCallback, n = 5, interval = 10) ->
    diffInterval = 0
    return =>
      if diffInterval < 0
        if n > 0
          bulletKindCallback()
          n--
          diffInterval = interval
      else
        --diffInterval

  # 初弾のみ自機狙い。後はぜんぶ初弾と同じ場所を狙う
  fixedAimNBullet : (n = 5, interval = 10) ->
    dx = @player.x
    dy = @player.y
    nbullet = @nBullet =>
      bullet = new AimBullet @enemy.x, @enemy.y, dx, dy, @assets["./image/icon0.gif"], 45
      @danmakuScene.addChild bullet
    return nbullet

  # n連射n方向
  nBulletNSpread : (n = 5, interval = 10, spread = 4, angle = Math.PI / 3) ->
    diffInterval = 0
    dx = @player.x
    dy = @player.y
    theta = angle / spread
    return =>
      if diffInterval < 0
        if n > 0
          for i in [0..spread]
            bullet = new AimBullet @enemy.x, @enemy.y, dx + 100*Math.cos( theta*i ), dy + 100*Math.sin( theta*i ), @assets["./image/icon0.gif"], 45
            @danmakuScene.addChild bullet
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

  makeLabel : (message, color = "red") ->
    @label = new Label message
    @label.font = "28px 'osaka-mono'"
    @label.width = 512
    @label.backgroundColor = color
    @danmakuScene.addChild @label

  makeStage : () ->
    @makeLabel "単発撃ち下ろし"
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


