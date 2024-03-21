import { ipcMain } from "electron";
export function generateUUID() {
    //[8,4,4,4,12]
    let uuid = "";
    let part = "";
    for (let len of [8, 4, 4, 4, 12]) {
        part = "";
        while (len >= part.length) {
            part = part + Math.random().toString(36).substring(2);
        }
        if (uuid === "") {
            uuid = part.slice(0, len);
        } else {
            uuid = uuid + "-" + part.slice(0, len);
        }

    }
    return uuid;
}
export function callNtQQApi(_params: string) {
    /*
    channel
    ipcMain.emit(
        channel,
        {},
        {type: 'request', callbackId: uuid, eventName},
        apiArgs
    )
    */
}
