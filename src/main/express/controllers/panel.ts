import { DataClass } from '@/main/helper/data';
import { Request, Response } from 'express';
import { Buffer } from "node:buffer";
export function getWebState(_req: Request, res: Response) {
    res.json(DataClass.getInstance().get("WebUiApiState"));
}
export function getQQLoginQRcodBase64(_req: Request, res: Response) {
    const base64Image = DataClass.getInstance().get("QRCODE_BASE64");
    if (base64Image === "") {
        res.status(400)
            .json({
                msg: 'Cant Get QRcode'
            });
    } else {
        res.json({ base64Image: base64Image });
    }
}
export function getQQLoginQRcode(_req: Request, res: Response) {
    const base64Image = DataClass.getInstance().get("QRCODE_BASE64");
    if (base64Image === "") {
        res.status(400)
            .json({
                msg: 'Cant Get QRcode'
            });
    } else {
        const base64 = base64Image.replace(/^data:image\/\w+;base64,/, "");
        const dataBuffer = Buffer.from(base64, "base64");
        res.set("Content-Type：image/jpeg");
        res.send(dataBuffer);
    }
}