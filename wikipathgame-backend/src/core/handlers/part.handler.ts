import { Server, Socket } from 'socket.io';
import { games } from '../../store';
import { SocketConstants } from '../../utils/socket.constants';
import { Page } from '../models/Page.model';
import { Part } from '../models/Part.model';
import { Player } from '../models/Player.model';
import { WikipediaService } from '../services/wikipedia.service';

export default (io: Server, socket: Socket) => {
	const wikipediaService = WikipediaService.instance;

	const finishPart = (
		roomName: string,
		winner: Player,
		winnerPath: Array<Page>
	) => {
		const gameIndex = games.findIndex((el) => el.roomName === roomName)!;
		const lasPartIndex = games[gameIndex].parts.length - 1;
		const playerIndex = games[gameIndex].players.findIndex(
			(el) => el.idSocket === winner.idSocket
		);
		let timer = games[gameIndex].timeBetweenParts;

		games[gameIndex].parts[lasPartIndex].inGame = false;
		games[gameIndex].parts[lasPartIndex].winner = winner;
		games[gameIndex].parts[lasPartIndex].winnerPath = winnerPath;

		games[gameIndex].players[playerIndex].points += 1;

		io.in(roomName).emit(SocketConstants.GAME_CHANGE, games[gameIndex]);

		if (
			games[gameIndex].parts[lasPartIndex].number < games[gameIndex].maxPart
		) {
			let myTimer = setInterval(async () => {
				if (timer === 0) {
					await clearInterval(myTimer);

					await newPart(gameIndex, roomName);
				} else {
					timer--;
				}

				io.in(roomName).emit(SocketConstants.TIMER, timer);
			}, 1000);
		} else {
			games[gameIndex].isStarted = false;

			io.in(roomName).emit(SocketConstants.GAME_CHANGE, games[gameIndex]);

			endGame(roomName);
		}
	};

	const newPart = async (gameIndex: number, roomName: string) => {
		let pages: Array<Page> = await wikipediaService.getTwoRandomPages(
			games[gameIndex].lang
		);

		let nextPart = new Part(
			true,
			pages[0],
			pages[1],
			games[gameIndex].parts.length
		);

		games[gameIndex].parts.push(nextPart);

		io.in(roomName).emit(SocketConstants.GAME_CHANGE, games[gameIndex]);
	};

	const endGame = (roomName: string) => {
		const gameIndex = games.findIndex((el) => el.roomName == roomName)!;
		let timer = 60;

		let myTimer = setInterval(() => {
			if (timer === 0) {
				clearInterval(myTimer);

				games.splice(gameIndex, 1);

				io.in(roomName).emit(SocketConstants.END_GAME);
			} else {
				timer--;
			}

			io.in(roomName).emit(SocketConstants.TIMER, timer);
		}, 1000);
	};

	socket.on(SocketConstants.FINISH_PART, finishPart);
};
