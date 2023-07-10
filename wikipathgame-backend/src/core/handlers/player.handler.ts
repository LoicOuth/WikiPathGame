import { Server, Socket } from 'socket.io';
import { games } from '../../store';
import { SocketConstants } from '../../utils/socket.constants';
import { Player } from '../models/Player.model';

export default (io: Server, socket: Socket) => {
	const changePlayer = (roomName: string, player: Player) => {
		const gameIndex = games.findIndex((el) => el.roomName == roomName)!;

		games[gameIndex].players = games[gameIndex].players.map(
			(_player: Player) => {
				if (_player.idSocket == player.idSocket) {
					return player;
				}

				return _player;
			}
		);

		io.in(roomName).emit(SocketConstants.GAME_CHANGE, games[gameIndex]);
	};

	const disconnect = () => {
		for (const room of socket.rooms) {
			if (room !== socket.id) {
				const gameIndex = games.findIndex((el) => el.roomName == room);

				if (gameIndex != -1) {
					const playerIndex = games[gameIndex].players.findIndex(
						(el) => el.idSocket == socket.id
					);
					games[gameIndex].players.splice(playerIndex, 1);

					if (games[gameIndex].players.length <= 0) {
						games.splice(gameIndex, 1);
					} else {
						socket.to(room).emit(SocketConstants.GAME_CHANGE, games[gameIndex]);
					}
				}
			}
		}
	};

	socket.on(SocketConstants.CHANGE_PLAYER, changePlayer);
	socket.on('disconnecting', disconnect);
};
