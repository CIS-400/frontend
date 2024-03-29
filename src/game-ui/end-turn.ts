import * as PIXI from "pixi.js";
import * as SETTLERS from "settlers";
import GameUI, { UIEvents } from "./game-ui";
import Updatable from "./updatable";

class EndTurn extends PIXI.Sprite implements Updatable {
  gameui: GameUI;
  constructor(gameui: GameUI) {
    super();
    this.gameui = gameui;
    this.position.set(
      0.965 * gameui.app.view.width,
      0.925 * gameui.app.view.height
    );
    this.texture = this.gameui.textures["end_turn"];
    this.interactive = true;
    this.anchor.set(0.5);
    this.scale.set(0.8)
    this.on("click", this._onclick.bind(this));
    this.update();
  }

  _onclick() {
    const { game } = this.gameui;
    const action = this.getPotentialAction();
    if (!game.isValidAction(action).valid) return;
    this.gameui.runEventHandlers(UIEvents.EndTurn, action);
    game.handleAction(action);
    this.gameui.update();
  }

  update() {
    this.alpha = this.gameui.game.isValidAction(this.getPotentialAction()).valid
      ? 1.0
      : 0.25;
  }

  private getPotentialAction() {
    return new SETTLERS.Action(
      SETTLERS.ActionType.EndTurn,
      this.gameui.getPerspective(),
      {}
    );
  }
}

export default EndTurn;
