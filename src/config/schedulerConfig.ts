import config from ".";
import { GameController, SpeedController } from "../logic/controllers";
import { GameScheduler } from "../logic/gameScheduler";
import { evasiveEntity, obstaclesChanger, transparentWalls } from "../logic/features";
import { XShape } from "./shapes";

export function configuredSchuduler(
	gameController: GameController,
	speedController: SpeedController
) {
	const shape = XShape(gameController.game.grid);
	return new GameScheduler(gameController)
		.addFeature(evasiveEntity(() => speedController.getTimeFunction() * 1.5, 1, 3))
		.addFeature(
			transparentWalls(
				config.shouldGoThroughWalls,
				(score) => score % 10 >= 0 && score % 10 <= 3
			)
		)
		.addFeature(
			obstaclesChanger(
				{
					shouldEventRunFunction: (game) => game.score % 5 >= 0 && game.score % 5 <= 2 && game.score > 0,
					intervalFunc: () => speedController.getTimeFunction() * 2,
				},
				shape
			)
		);
}
