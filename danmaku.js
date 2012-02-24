var DanmakuGame;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

enchant();

DanmakuGame = (function() {

  __extends(DanmakuGame, Game);

  function DanmakuGame() {
    DanmakuGame.__super__.constructor.call(this, 512, 512);
    this.fps = 60;
  }

  DanmakuGame.prototype.onload = function() {
    var label;
    label = new Label("東方発火損");
    label.font = "28px 'osaka-mono'";
    label.backgroundColor = "red";
    this.rootScene.addChild(label);
  };

  return DanmakuGame;

})();
