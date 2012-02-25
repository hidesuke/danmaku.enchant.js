var Bullet;
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

  Bullet.prototype.setDirection = function(dx, dy) {
    this.dx = dx;
    return this.dy = dy;
  };

  Bullet.prototype.setAcceleration = function(acc) {
    return this.acc = acc;
  };

  Bullet.prototype.behaviorFunction = function() {};

  Bullet.prototype.onenterframe = function(callback) {
    var _ref, _ref2;
    if (!((0 <= (_ref = this.x) && _ref <= 512))) this.scene.removeChild(this);
    if (!((0 <= (_ref2 = this.y) && _ref2 <= 512))) this.scene.removeChild(this);
    return this.y += this.acc;
  };

  return Bullet;

})();
