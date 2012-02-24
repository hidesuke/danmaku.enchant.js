# -----------------
# enchant.js で弾幕書くよ
# -----------------

enchant()

class DanmakuGame extends Game
  constructor : ->
    super 512, 512
    @fps = 60
    # preloadする素材まわりはこのへんに書いておく
  
  onload : ->
    label = new Label "東方発火損"
    label.font = "28px 'osaka-mono'"
    label.backgroundColor = "red"
    @rootScene.addChild label
    return
