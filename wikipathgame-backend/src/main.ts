import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { SocketConstants } from './utils/socket.constants';

import registerGameHandler from './core/handlers/game.handler';
import registerPartHandler from './core/handlers/part.handler';
import registerPlayerHandler from './core/handlers/player.handler';
import registerRoomHandler from './core/handlers/room.handler';

const httpServer = createServer();
const io = new Server(httpServer, {
	cors: {
		origin: '*',
	},
});

io.on(SocketConstants.CONNECTION, (socket: Socket) => {
	registerRoomHandler(io, socket);
	registerGameHandler(io, socket);
	registerPlayerHandler(io, socket);
	registerPartHandler(io, socket);
});

httpServer.listen(3000);
