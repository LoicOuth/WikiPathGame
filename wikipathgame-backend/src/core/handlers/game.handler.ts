import { Server, Socket } from 'socket.io';
import { games } from '../../store';
import { SocketConstants } from '../../utils/socket.constants';
import { Game } from '../models/Game.model';
import { Page } from '../models/Page.model';
import { Part } from '../models/Part.model';
import { WikipediaService } from '../services/wikipedia.service';

export default (io: Server, socket: Socket) => {
	const wikipediaService = WikipediaService.instance;

	const startGame = async (roomName: string) => {
		const gameIndex = games.findIndex((el) => el.roomName == roomName)!;

		games[gameIndex].isStarted = true;
		io.in(roomName).emit(SocketConstants.GAME_CHANGE, games[gameIndex]);

		let pages: Array<Page> = await wikipediaService.getTwoRandomPages(
			games[gameIndex].lang
		);

		let firstPart = new Part(true, pages[0], pages[1], 1);

		games[gameIndex].parts.push(firstPart);

		io.in(roomName).emit(SocketConstants.GAME_CHANGE, games[gameIndex]);
	};

	const onGameSettingChange = (game: Game) => {
		const gameIndex = games.findIndex((el) => el.roomName == game.roomName)!;

		games[gameIndex] = game;

		io.in(game.roomName).emit(SocketConstants.GAME_CHANGE, games[gameIndex]);
	};

	socket.on(SocketConstants.START_GAME, startGame);
	socket.on(SocketConstants.GAME_SETTING_CHANGE, onGameSettingChange);
};
