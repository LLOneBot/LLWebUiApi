let ServerState = 0;
export enum ServerStateType{}
function getServerState(){
	return ServerState;
}
function setServerState(state:number){
	ServerState =state;
}
export { getServerState, setServerState };