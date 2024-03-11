export interface InjectPlugin {
    preload: string,
    renderer: string,
    main: string,
}
export interface WebPluginData {
    name: string,
    slug: string,
    manifest_version: number,
    description: string,
    version: string,
    injects: InjectPlugin
}
export enum PluginIpcType {
    Listen,
    Send,
    Invoke
}
export interface LiteLoaderConfig {
    LiteLoader: {
        disabled_plugins: string[]
    }
}