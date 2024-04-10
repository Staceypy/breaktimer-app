import * as React from "react";
// import { Howl } from "howler";

export default function Sounds() {
  // const playSound = (path: string): void => {
  //   const sound = new Howl({ src: [path] });
  //   sound.play();
  // };

  React.useEffect(() => {
    ipcRenderer.onPlayStartGong(() => {
      console.log("sounds.tsx play start gong");
      // playSound("../../renderer/sounds/gong_start.wav");
    });
    ipcRenderer.onPlayEndGong(() => {
      console.log("sounds.tsx play end gong");
      // playSound("../../renderer/sounds/gong_end.wav");
    });
  }, []);

  return null;
}
