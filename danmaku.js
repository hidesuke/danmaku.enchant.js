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
    var bullet, enemy, label, player;
    label = new Label("東方発火損");
    label.font = "28px 'osaka-mono'";
    label.width = 512;
    label.backgroundColor = "red";
    this.rootScene.addChild(label);
    enemy = new Enemy(this.assets["./image/chara0.gif"]);
    enemy.frame = 0;
    this.rootScene.addChild(enemy);
    player = new Player(this.assets["./image/chara0.gif"]);
    player.frame = 7;
    this.rootScene.addEventListener("upbuttondown", function() {
      return player.y -= 4;
    });
    this.rootScene.addEventListener("downbuttondown", function() {
      return player.y += 4;
    });
    this.rootScene.addEventListener("leftbuttondown", function() {
      return player.x -= 4;
    });
    this.rootScene.addEventListener("rightbuttondown", function() {
      return player.x += 4;
    });
    this.rootScene.addChild(player);
    bullet = new Bullet(enemy.x, enemy.y, this.assets["./image/icon0.gif"], 45);
    bullet.setAcceleration(5);
    this.rootScene.addChild(bullet);
    this.drawGrid();
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
    return this.rootScene.addChild(line);
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

  function Enemy(image) {
    Enemy.__super__.constructor.call(this, 32, 32, 256, 0, image);
  }

  Enemy.prototype.onenterframe = function() {
    return this.move();
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
