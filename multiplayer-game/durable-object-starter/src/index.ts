export { GameRoom } from './durable-object';

export interface Env {
	GAME_ROOM: DurableObjectNamespace;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const gameId = url.pathname.split('/')[2];
		console.log('🚀 ~ fetch ~ gameId:', gameId);

		if (!gameId) {
			return new Response('Not Found', { status: 404 });
		}

		const id = env.GAME_ROOM.idFromName(gameId);
		const stub = env.GAME_ROOM.get(id);

		return stub.fetch(request);
	},
};
