var AimBullet, Bullet;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Bullet = (function() {

  __extends(Bullet, Sprite);

  function Bullet(x, y, image, frame) {
    Bullet.__super__.constructor.call(this, 16, 16);
    this.image = image;
    this.frame = frame;
    this.x = x;
    this.y = y;
    this.scale(1.5, 1.5);
  }

  Bullet.prototype.setAcceleration = function(acc) {
    return this.acc = acc;
  };

  Bullet.prototype.setSpeed = function(speed) {
    return this.speed = speed;
  };

  Bullet.prototype.behaviorFunction = function() {
    this.speed = 5;
    this.y += this.speed;
  };

  Bullet.prototype.checkRange = function() {
    var _ref, _ref2;
    if (!((-16 <= (_ref = this.x) && _ref <= 528))) this.scene.removeChild(this);
    if (!((-16 <= (_ref2 = this.y) && _ref2 <= 528))) this.scene.removeChild(this);
  };

  Bullet.prototype.onenterframe = function(callback) {
    this.checkRange();
    this.behaviorFunction();
  };

  return Bullet;

})();

AimBullet = (function() {

  __extends(AimBullet, Bullet);

  function AimBullet(x, y, dx, dy, image, frame) {
    var rate;
    AimBullet.__super__.constructor.call(this, x, y, image, frame);
    this.dx = dx;
    this.dy = dy;
    this.acc = 0;
    this.speed = 5;
    rate = this.speed / Math.sqrt((x - dx) * (x - dx) + (y - dy) * (y - dy));
    this.deltaX = (dx - x) * rate;
    this.deltaY = (dy - y) * rate;
  }

  AimBullet.prototype.behaviorFunction = function() {
    this.x += this.deltaX;
    return this.y += this.deltaY;
  };

  return AimBullet;

})();
