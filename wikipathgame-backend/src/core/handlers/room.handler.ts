import { Server, Socket } from 'socket.io';
import { games } from '../../store';
import { SocketConstants } from '../../utils/socket.constants';
import { Game } from '../models/Game.model';
import { Player } from '../models/Player.model';

export default (io: Server, socket: Socket) => {
	const createRoom = (roomName: string, player: Player) => {
		if (!games.some((el) => el.roomName == roomName)) {
			let newGame = new Game(roomName, 10, [player]);
			games.push(newGame);

			socket.join(roomName);
			io.in(roomName).emit(SocketConstants.GAME_CHANGE, newGame);
		}
	};

	const joinRoom = (roomName: string, player: Player) => {
		const gameIndex = games.findIndex((el) => el.roomName == roomName)!;

		games[gameIndex].players.push(player);

		socket.join(roomName);
		io.in(roomName).emit(SocketConstants.GAME_CHANGE, games[gameIndex]);
	};

	const leaveRoom = (roomName: string) => {
		const gameIndex = games.findIndex((el) => el.roomName == roomName)!;

		const playerIndex = games[gameIndex].players.findIndex(
			(el) => el.idSocket == socket.id
		);
		games[gameIndex].players.splice(playerIndex, 1);

		if (games[gameIndex].players.length <= 0) {
			games.splice(gameIndex, 1);
		} else {
			socket.to(roomName).emit(SocketConstants.GAME_CHANGE, games[gameIndex]);
		}
	};

	socket.on(SocketConstants.CREATE_ROOM, createRoom);
	socket.on(SocketConstants.JOIN_ROOM, joinRoom);
	socket.on(SocketConstants.LEAVE_ROOM, leaveRoom);
};
