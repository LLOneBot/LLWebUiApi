import express from "express";
import { Express } from "express";
export class HttpAdapter {
    private app: Express;
    constructor(port: number) {
        this.app = express();
        this.app.use(express.json());
        this.app.listen(port, async () => {
            console.log(`App is running at http://localhost:${port}`)
        })
    }
}