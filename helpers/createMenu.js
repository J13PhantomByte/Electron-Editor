const { app, Menu } = require("electron");
const openFile = require("./openFile");

function createMenu(mainWindow) {
    const isWin = process.platform === "win32";

    const menu = Menu.buildFromTemplate([
        ...(isWin
            ? [
                {
                    label: app.name,
                    submenu: [
                        { role: "about" },
                        { type: "separator" },
                        { role: "services" },
                        { type: "separator" },
                        { role: "hide" },
                        { role: "hideOthers" },
                        { role: "unhide" },
                        { type: "separator" },
                        { role: "quit" },
                    ],
                },
            ]
            : []),
            {
                label: "File",
                submenu: [
                    isWin ? { role: "close" } : { role: "quit" },
                    { 
                        label: "Open File",
                        accelerator: "CmdOrCtrl+O",
                        click: () => openFile(mainWindow),
                    },
                    {
                        label: "Save file",
                        accelerator: "CmdOrCtrl+S",
                        click: () => console.log("save file clicked"),
                    },
                ],
            },
            {
                label: "Edit",
                submenu: [
                    { role: "undo" },
                    { role: "redo" },
                    { type: "separator"},
                    { role: "cut" },
                    { role: "copy" },
                    { role: "paste" },
                    ...(isWin
                        ? [
                            { role: "pasteAndMatchStyle" },
                            { role: "delete" },
                            { role: "selectAll" },
                            { type: "separator" },
                            {
                                label: "Speech",
                                submenu: [{ role: "startSpeaking" }, { role: "stopSpeaking" }],
                            },
                        ]
                        : [{ role: "delete" }, { type: "separator" }, { role: "selectAll"}]),
                ],
            },
            {
                label: "View",
                submenu: [
                    { role: "reload" },
                    { role: "forceReload" },
                    { type: "separator" },
                    { role: "resetZoom" },
                    { role: "zoomIn" },
                    { role: "zoomOut"},
                    { type: "separator" },
                    { role: "togglefullscreen" },
                ],
            },
            {
                label: "window",
                submenu: [
                    { role: "minimize" },
                    { role: "zoom" },
                    ...(isWin
                        ? [{ type: "separator" }, { role: "front" }, { type: "separator" }, { role: "window" }]
                        : [{ role: "close" }]),
                ],
            },
            {
                role: "help",
                submenu: [
                    {
                        label: "About",
                        click: () => console.log("About clicked"),
                    },
                    {
                        label: "Build more",
                        click: () => console.log("Build more clicked"),
                    },
                ],
            },
    ]); 
    Menu.setApplicationMenu(menu);
}

module.exports = createMenu;