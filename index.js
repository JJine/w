const {app, BrowserWindow, ipcMain} = require('electron');
const LolAPI = require('./LolAPI.js');

const option = {
    width: 1200,
    height: 600,
    resizeble : false,
    webPreferences: {
        nodeIntegration: true,
        nativeWindowOpen: true,
    }
};

let win = null;
let api = new LolAPI(); //인스턴스를 하나 만들어준다.
app.on("ready", ()=> {
    win = new BrowserWindow(option);
    win.removeMenu(null); //기본메뉴 사라짐
    win.loadFile("index.html");

    win.webContents.openDevTools();
});

ipcMain.on("openDev", ()=> {
    win.webContents.openDevTools();
})

ipcMain.on("summoner", (e, data)=> {
    api.loadSummoner(data.name).then(data=>{
        e.reply("summonerData", data);
    });
    
})