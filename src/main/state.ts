let ServerState = new Map();
export enum ServerStateType { }
function getServerState(key: string) {
	return ServerState.get(key);
}
function setServerState(key: number, value: any) {
	ServerState.set(key, value);
}
export { getServerState, setServerState };