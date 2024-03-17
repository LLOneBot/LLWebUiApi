import { DataClass } from '@/main/helper/data';
import { Request, Response } from 'express';
export function getWebState(_req: Request, res: Response) {
    res.json(DataClass.getInstance().get("WebUiApiState"));
}
export function getQQLoginQRcode(_req: Request, res: Response){
    const base64Image = DataClass.getInstance().get("QRCODE_BASE64");
    res.json( { base64Image: base64Image });
}