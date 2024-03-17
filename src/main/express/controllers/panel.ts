import { DataClass } from '@/main/helper/data';
import { Request, Response } from 'express';
export function GetWebState(_req: Request, res: Response) {
    res.json(DataClass.getInstance().get("WebUiApiState"));
}