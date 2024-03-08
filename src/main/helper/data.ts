export class DataClass {
    public Data: Map<any, any>;
    static CurrentInstance: DataClass;
    constructor() {
        this.Data = new Map<any, any>()
    }
    static getInstance(): DataClass {
        if (!DataClass.CurrentInstance) {
            DataClass.CurrentInstance = new DataClass();
            return DataClass.CurrentInstance;
        }
        return DataClass.CurrentInstance;
    }
    public get(key: any) {
        return this.Data.get(key);
    }
    public set(key: any, value: any) {
        this.Data.set(key, value);
    }
}