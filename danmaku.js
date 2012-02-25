var BodyBase, DanmakuGame, Enemy, Player;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

enchant();

DanmakuGame = (function() {

  __extends(DanmakuGame, Game);

  function DanmakuGame() {
    DanmakuGame.__super__.constructor.call(this, 512, 512);
    this.fps = 60;
    this.preload("./image/chara0.gif", "./image/icon0.gif", "./image/effect0.gif");
  }

  DanmakuGame.prototype.onload = function() {
    this.danmakuScene = new Scene();
    this.pushScene(this.danmakuScene);
    this.makeStage();
    this.setPlayer();
    return this.setEnemy();
  };

  DanmakuGame.prototype.onenterframe = function() {
    if (this.nbullet !== null && this.nbullet !== void 0) this.nbullet();
    if (this.frame % 180 === 0) {
      /*
            @nbullet = @nBullet =>
              bullet = new Bullet @enemy.x, @enemy.y, @assets["./image/icon0.gif"], 45
              @danmakuScene.addChild bullet
      */
      /*
            @nbullet = @nBullet =>
              bullet = new AimBullet @enemy.x, @enemy.y, @player.x, @player.y, @assets["./image/icon0.gif"], 45
              @danmakuScene.addChild bullet
      */
      return this.nbullet = this.fixedAimNBullet();
    }
  };

  DanmakuGame.prototype.nBullet = function(bulletKindCallback, n, interval) {
    var diffInterval;
    var _this = this;
    if (n == null) n = 5;
    if (interval == null) interval = 10;
    diffInterval = 0;
    return function() {
      if (diffInterval < 0) {
        if (n > 0) {
          bulletKindCallback();
          n--;
          return diffInterval = interval;
        }
      } else {
        return --diffInterval;
      }
    };
  };

  DanmakuGame.prototype.fixedAimNBullet = function(n, interval) {
    var dx, dy, nbullet;
    var _this = this;
    if (n == null) n = 5;
    if (interval == null) interval = 10;
    dx = this.player.x;
    dy = this.player.y;
    nbullet = this.nBullet(function() {
      var bullet;
      bullet = new AimBullet(_this.enemy.x, _this.enemy.y, dx, dy, _this.assets["./image/icon0.gif"], 45);
      return _this.danmakuScene.addChild(bullet);
    });
    return nbullet;
  };

  DanmakuGame.prototype.setPlayer = function() {
    var _this = this;
    this.player = new Player(this.assets["./image/chara0.gif"]);
    this.player.frame = 7;
    this.danmakuScene.addEventListener("upbuttondown", function() {
      return _this.player.y -= 4;
    });
    this.danmakuScene.addEventListener("downbuttondown", function() {
      return _this.player.y += 4;
    });
    this.danmakuScene.addEventListener("leftbuttondown", function() {
      return _this.player.x -= 4;
    });
    this.danmakuScene.addEventListener("rightbuttondown", function() {
      return _this.player.x += 4;
    });
    return this.danmakuScene.addChild(this.player);
  };

  DanmakuGame.prototype.setEnemy = function() {
    this.enemy = new Enemy(this.assets["./image/chara0.gif"]);
    this.enemy.frame = 0;
    this.enemy.setBulletImage(this.assets["./image/icon0.gif"]);
    return this.danmakuScene.addChild(this.enemy);
  };

  DanmakuGame.prototype.makeStage = function() {
    var label;
    label = new Label("東方発火損");
    label.font = "28px 'osaka-mono'";
    label.width = 512;
    label.backgroundColor = "red";
    this.danmakuScene.addChild(label);
    return this.drawGrid();
  };

  DanmakuGame.prototype.drawGrid = function() {
    var i, _results;
    _results = [];
    for (i = 0; i <= 8; i++) {
      this.drawLine(i * 64, 0, 1, 512);
      _results.push(this.drawLine(0, i * 64, 512, 1));
    }
    return _results;
  };

  DanmakuGame.prototype.drawLine = function(x, y, w, h) {
    var line;
    line = new Label("");
    line.x = x;
    line.y = y;
    line.width = w;
    line.height = h;
    line.backgroundColor = "black";
    return this.danmakuScene.addChild(line);
  };

  return DanmakuGame;

})();

BodyBase = (function() {

  __extends(BodyBase, Sprite);

  BodyBase.prototype.x = 0;

  BodyBase.prototype.y = 0;

  function BodyBase(width, height, x, y, image) {
    BodyBase.__super__.constructor.call(this, width, height);
    this.scale(1.5, 1.5);
    this.x = x;
    this.y = y;
    this.image = image;
  }

  return BodyBase;

})();

Player = (function() {

  __extends(Player, BodyBase);

  function Player(image) {
    Player.__super__.constructor.call(this, 32, 32, 256, 400, image);
  }

  return Player;

})();

Enemy = (function() {

  __extends(Enemy, BodyBase);

  Enemy.prototype.goingDown = true;

  Enemy.prototype.frameCount = 0;

  function Enemy(image) {
    Enemy.__super__.constructor.call(this, 32, 32, 256, 0, image);
  }

  Enemy.prototype.onenterframe = function() {
    return this.move();
  };

  Enemy.prototype.setBulletImage = function(image) {
    return this.bulletImage = image;
  };

  Enemy.prototype.move = function() {
    var _ref, _ref2;
    if (this.goingDown) {
      if ((0 <= (_ref = this.y) && _ref <= 256)) {
        return this.y++;
      } else {
        this.goingDown = false;
        return this.y--;
      }
    } else {
      if ((0 <= (_ref2 = this.y) && _ref2 <= 256)) {
        return this.y--;
      } else {
        this.goingDown = true;
        return this.y++;
      }
    }
  };

  return Enemy;

})();
