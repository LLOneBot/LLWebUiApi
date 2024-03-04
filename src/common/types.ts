export type ServerAdapterCallback = (ActionName: string, ArgData: string) => string;
export interface ServerConfig {
    Port: number,
    AuthCode: string,
    IsRunning: boolean
}