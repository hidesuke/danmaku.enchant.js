var BodyBase, Bullet, DanmakuGame, Enemy, Player;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

enchant();

DanmakuGame = (function() {

  __extends(DanmakuGame, Game);

  function DanmakuGame() {
    DanmakuGame.__super__.constructor.call(this, 512, 512);
    this.fps = 60;
    this.preload("./image/chara0.gif");
  }

  DanmakuGame.prototype.onload = function() {
    var enemy, label;
    label = new Label("東方発火損");
    label.font = "28px 'osaka-mono'";
    label.backgroundColor = "red";
    this.rootScene.addChild(label);
    enemy = new Enemy(this.assets["./image/chara0.gif"]);
    enemy.frame = 0;
    this.rootScene.addChild(enemy);
  };

  return DanmakuGame;

})();

BodyBase = (function() {

  __extends(BodyBase, Sprite);

  BodyBase.prototype.x = 0;

  BodyBase.prototype.y = 0;

  function BodyBase(width, height, x, y, image) {
    BodyBase.__super__.constructor.call(this, width, height);
    this.scaleX = 2;
    this.scaleY = 2;
    this.x = x;
    this.y = y;
    this.image = image;
  }

  return BodyBase;

})();

Player = (function() {

  __extends(Player, BodyBase);

  function Player() {
    Player.__super__.constructor.apply(this, arguments);
  }

  Player.prototype.construnctor = function(image) {
    return Player.__super__.construnctor.call(this, 32, 32, 256, 480, image);
  };

  return Player;

})();

Enemy = (function() {

  __extends(Enemy, BodyBase);

  function Enemy(image) {
    Enemy.__super__.constructor.call(this, 32, 32, 256, 0, image);
  }

  return Enemy;

})();

Bullet = (function() {

  __extends(Bullet, Sprite);

  function Bullet() {
    Bullet.__super__.constructor.apply(this, arguments);
  }

  return Bullet;

})();
