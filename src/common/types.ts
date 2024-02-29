export type ServerAdapterCallback = (ActionName: string, ArgData: string) => boolean;
export interface ServerConfig {
    Port: number,
    AuthCode: string,
    IsRunning: boolean
}