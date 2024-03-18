import { DataClass } from '@/main/helper/data';
import { Request, Response } from 'express';
import { Buffer } from "node:buffer";
export function getWebUiState(_req: Request, res: Response) {
    res.json(DataClass.getInstance().get("WebUiApiState"));
}
export function setWebUiConfig(_req: Request, res: Response) {
    // 未实现
    res.json({ message: "Set Success!" });
}
export function getQQLoginQRcodBase64(_req: Request, res: Response) {
    let base64Image: string = DataClass.getInstance().get("QRCODE_BASE64");
    if (base64Image && base64Image.length != 0) {
        res.json({ base64Image: base64Image });
    } else {
        res.status(400)
            .json({
                msg: 'Cant Get QRcode'
            });
    }
}
export function getQQLoginQRcode(_req: Request, res: Response) {
    let base64Image: string = DataClass.getInstance().get("QRCODE_BASE64");
    if (base64Image && base64Image.length != 0) {
        const base64 = base64Image.replace(/^data:image\/\w+;base64,/, "");
        const dataBuffer = Buffer.from(base64, "base64");
        res.set("Content-Type", "image/jpeg");
        res.send(dataBuffer);
    } else {
        res.status(400)
            .json({
                msg: 'Cant Get QRcode'
            });
    }
}