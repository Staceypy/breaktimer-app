import path from "path";
import { app, screen, BrowserWindow, nativeImage } from "electron";
import log from "electron-log";
import { endPopupBreak } from "./breaks";
import { getSettings } from "./store";

let settingsWindow: BrowserWindow | null = null;
let breakWindows: BrowserWindow[] = [];

const getBrowserWindowUrl = (page: "settings" | "break"): string => {
  return `file://${path.join(
    __dirname,
    `../views/${process.env.NODE_ENV}.html?page=${page}`
  )}`;
};

export function getWindows(): BrowserWindow[] {
  const windows = [];
  if (settingsWindow !== null) {
    windows.push(settingsWindow);
  }

  windows.push(...breakWindows);
  return windows;
}

export function createSettingsWindow(): void {
  if (settingsWindow) {
    settingsWindow.show();
    return;
  }
  const imgPath =
    process.env.NODE_ENV === "development"
      ? path.join(__dirname, "../../../resources/tray/icon.png")
      : path.join(process.resourcesPath, "app/resources/tray/icon.png");

  const windowIcon = nativeImage.createFromPath(imgPath);

  settingsWindow = new BrowserWindow({
    show: false,
    width: 507,
    minWidth: 507,
    height: process.platform === "win32" ? 740 : 700,
    minHeight: process.platform === "win32" ? 740 : 700,
    autoHideMenuBar: true,
    icon: windowIcon,
    webPreferences: {
      preload: path.join(__dirname, "../../renderer/preload.js"),
    },
  });

  settingsWindow.loadURL(getBrowserWindowUrl("settings"));

  settingsWindow.on("ready-to-show", () => {
    if (!settingsWindow) {
      throw new Error('"settingsWindow" is not defined');
    }
    settingsWindow.show();
    settingsWindow.focus();
  });

  settingsWindow.on("closed", () => {
    settingsWindow = null;
  });
}

export function createBreakWindows(): void {
  const settings = getSettings();

  const displays = screen.getAllDisplays();
  for (const display of displays) {
    const size = 900;
    const breakWindow = new BrowserWindow({
      show: false,
      autoHideMenuBar: true,
      frame: false,
      x: display.bounds.x + display.bounds.width / 2 - size / 2,
      y: display.bounds.y + display.bounds.height / 2 - size / 2,
      width: size,
      height: size,
      resizable: false,
      focusable: false,
      transparent: true,
      hasShadow: false,
      webPreferences: {
        devTools: false,
        preload: path.join(__dirname, "../../renderer/preload.js"),
      },
    });

    // for (const display of displays) {
    //   const size = 900;
    //   const screenWidth = display.bounds.width;
    //   const windowWidth = size;

    //   const breakWindow = new BrowserWindow({
    //     show: false,
    //     autoHideMenuBar: false,
    //     frame: true,
    //     x: screenWidth - windowWidth - 50, // 屏幕右边留 50 的空隙
    //     y: 50, // 屏幕上边留 50 的空隙

    //     // x: display.bounds.x + display.bounds.width / 2 - size / 2,
    //     // y: display.bounds.y + display.bounds.height / 2 - size / 2,
    //     width: size,
    //     height: size,
    //     focusable: true,
    //     resizable: true,
    //     transparent: false,
    //     hasShadow: false,
    //     webPreferences: {
    //       devTools: true,
    //       preload: path.join(__dirname, "../../renderer/preload.js"),
    //     },
    //   });

    breakWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
    breakWindow.setAlwaysOnTop(true);
    breakWindow.setFullScreenable(false);
    breakWindow.moveTop();

    if (process.platform === "darwin") {
      // setVisibleOnAllWorkspaces seems to have a bug that causes the dock to
      // unhide when called.
      app.dock.hide();
    }

    breakWindow.loadURL(getBrowserWindowUrl("break"));

    breakWindow.on("ready-to-show", () => {
      if (!breakWindow) {
        throw new Error('"breakWindow" is not defined');
      }
      //breakWindow.webContents.openDevTools({ mode: "detach" });

      if (settings.showBackdrop) {
        // if (process.platform === "darwin") {
        // } else {
        //   // breakWindow.setSize(display.bounds.width, display.bounds.height);
        //   // breakWindow.setPosition(display.bounds.x, display.bounds.y);
        //   console.log(screen.getPrimaryDisplay().workAreaSize);
        //   breakWindow.setSize(screen.getPrimaryDisplay().workAreaSize.width, s); // 设置新的窗口大小  }

        const gap = 50; // 间隙大小
        const newX = display.bounds.x + 20; // 在 x 轴上向右移动
        const newY = display.bounds.y; // 在 y 轴上向下移动
        // const newWidth = display.bounds.width; // 宽度减去左右间隙
        const newHeight = display.bounds.height - gap; // 高度减去上下间隙
        breakWindow.setSize(display.bounds.width, newHeight); // 设置新的窗口大小
        breakWindow.setPosition(newX, newY); // 设置新的窗口位置

        // Show as inactive to avoid stealing focus
        breakWindow.showInactive();
      }
    });

    breakWindow.on("closed", () => {
      if (process.platform === "darwin") {
        // Ensure that focus is returned to the previous app when break windows
        // close.
        app.hide();
      }

      for (const win of breakWindows) {
        if (!win.isDestroyed()) {
          try {
            win.close();
          } catch (err) {
            log.warn(err);
          }
        }
      }
      breakWindows = [];
      endPopupBreak();
    });

    breakWindows.push(breakWindow);
  }
}
