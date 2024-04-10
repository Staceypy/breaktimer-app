declare const ipcRenderer: {
  invokeBreakPostpone: () => Promise<void>;
  invokeGetAllowPostpone: () => Promise<boolean>;
  invokeGetBreakLength: () => Promise<Date>;
  invokeGetSettings: () => Promise<unknown>;
  invokeGetProcess: () => Promise<string>;
  invokeGongEndPlay: () => Promise<unknown>;
  invokeGongStartPlay: () => Promise<unknown>;
  invokeBreakStart: () => Promise<unknown>;
  invokeBreakEnd: () => Promise<unknown>;
  invokeOpenExternalURL: () => Promise<unknown>;
  invokeSetSettings: (settings: unknown) => Promise<void>;
  onPlayEndGong: (cb: () => void) => Promise<void>;
  onPlayStartGong: (cb: () => void) => Promise<void>;
};

declare const processEnv: {
  [key: string]: string;
};

declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}

declare module "*.png" {
  const value: string;
  export default value;
}
