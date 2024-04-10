import * as React from "react";
import moment from "moment";

import { Button, Spinner, ControlGroup, ButtonGroup } from "@blueprintjs/core";
import { useSpring, animated, config } from "react-spring";
import { Settings } from "../../types/settings";

import styles from "./Break.scss";
const COUNTDOWN_SECS = 10;
const TICK_MS = 200;

function createRgba(hex: string, a: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

interface TimeRemaining {
  hours: number;
  minutes: number;
  seconds: number;
}

interface SpinnerProps {
  value: number;
  textColor: string;
}

function OuterSpinner(props: SpinnerProps) {
  const { textColor, value } = props;

  return (
    <div className={`bp3-spinner ${styles.outerSpinner}`}>
      <svg width="500" height="500" strokeWidth="2" viewBox="2 2 96 96">
        <path
          className="bp3-spinner-track"
          d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
          style={{ stroke: "none" }}
        ></path>
        <path
          className="bp3-spinner-head"
          d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
          pathLength="100"
          strokeDasharray="100 100"
          strokeDashoffset={100 - 100 * value}
          style={{ stroke: textColor }}
        ></path>
      </svg>
    </div>
  );
}
interface ImageData {
  id: number;
  url: string;
  type: "short" | "long";
}

interface ImageComponentProps {
  textColor: string;
  backgroundColor: string;
  processEnv: string;
}
const ImageComponent = (props: ImageComponentProps) => {
  const { textColor, backgroundColor, processEnv } = props;
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const processEnvSlash = processEnv.replace(/\\/g, "/");

  const imagesData: ImageData[] = [
    {
      id: 1,
      // path.join(process.resourcesPath, "app/resources/images/rotator.png")
      url: `${processEnvSlash}/app/resources/images/rotator.png`,
      type: "short",
    },
    {
      id: 2,
      url: `${processEnvSlash}/app/resources/images/shoulder_work.png`,

      type: "short",
    },
    {
      id: 3,
      url: `${processEnvSlash}/app/resources/images/shoulder.png`,
      type: "short",
    },
    {
      id: 4,
      url: `${processEnvSlash}/app/resources/images/sore_neck.png`,
      type: "short",
    },
    {
      id: 5,
      url: `${processEnvSlash}/app/resources/images/stiff_neck.png`,
      type: "short",
    },
    {
      id: 6,
      url: `${processEnvSlash}/app/resources/images/stretch.png`,
      type: "short",
    },
    {
      id: 7,
      url: `${processEnvSlash}/app/resources/images/sun_salutation.png`,
      type: "short",
    },
    {
      id: 8,
      url: `${processEnvSlash}/app/resources/images/upperbody_mobility.png`,
      type: "short",
    },
    {
      id: 9,
      url: `${processEnvSlash}/app/resources/images/yoga.png`,
      type: "short",
    },
    {
      id: 10,
      url: `${processEnvSlash}/app/resources/images/eye_rest.png`,
      type: "short",
    },
    {
      id: 11,
      url: `${processEnvSlash}/app/resources/images/energy_boost.png`,
      type: "short",
    },
    {
      id: 12,
      url: `${processEnvSlash}/app/resources/images/basics.png`,
      type: "short",
    },
    {
      id: 13,
      url: `${processEnvSlash}/app/resources/images/lower_back.png`,
      type: "short",
    },
    {
      id: 14,
      url: `${processEnvSlash}/app/resources/images/office_circuit.png`,
      type: "short",
    },
    {
      id: 15,
      url: `${processEnvSlash}/app/resources/images/back_pain.png`,
      type: "short",
    },
    {
      id: 16,
      url: `${processEnvSlash}/app/resources/images/back_pain_chair.png`,
      type: "short",
    },
    {
      id: 17,
      url: `${processEnvSlash}/app/resources/images/below_zero.png`,
      type: "short",
    },
    {
      id: 18,
      url: `${processEnvSlash}/app/resources/images/best_thing.png`,

      type: "long",
    },
    {
      id: 19,
      url: `${processEnvSlash}/app/resources/images/cardio_fusion.png`,

      type: "long",
    },
    {
      id: 20,
      url: `${processEnvSlash}/app/resources/images/healer.png`,
      type: "long",
    },
    {
      id: 21,
      url: `${processEnvSlash}/app/resources/images/ace.png`,
      type: "long",
    },
    {
      id: 22,
      url: `${processEnvSlash}/app/resources/images/cardio_grind.png`,
      type: "long",
    },
    {
      id: 23,
      url: `${processEnvSlash}/app/resources/images/cardio_mill.png`,
      type: "long",
    },
    {
      id: 24,
      url: `${processEnvSlash}/app/resources/images/morning.png`,
      type: "long",
    },
    {
      id: 25,
      url: `${processEnvSlash}/app/resources/images/cookie.png`,
      type: "long",
    },
    {
      id: 26,
      url: `${processEnvSlash}/app/resources/images/cardio_sculpt.png`,
      type: "long",
    },
    {
      id: 27,
      url: `${processEnvSlash}/app/resources/images/cardio_simple.png`,
      type: "long",
    },
  ];
  // shortImages.length = 17, 0 - 16
  const initialShortIndex = Math.floor(Math.random() * 17);

  React.useEffect(() => {
    setCurrentImageIndex(initialShortIndex);
  }, [initialShortIndex]);

  const switchToNextShortImage = () => {
    let nextShortIndex;
    do {
      nextShortIndex = Math.floor(Math.random() * 17);
    } while (nextShortIndex === currentImageIndex);

    setCurrentImageIndex(nextShortIndex);
  };

  const switchToNextLongImage = () => {
    // longImages.length = 10, 17 - 26
    let nextLongIndex;
    do {
      nextLongIndex = Math.floor(Math.random() * 10) + 17;
    } while (nextLongIndex === currentImageIndex);

    setCurrentImageIndex(nextLongIndex);
  };

  return (
    <animated.div className={styles.imgOverallContainer}>
      <animated.div
        className={styles.imgContainer}
        style={{
          backgroundImage: `url(${imagesData[currentImageIndex].url})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></animated.div>
      <animated.div className={styles.imgButton}>
        <Button
          onClick={switchToNextShortImage}
          className={styles.actionButton}
          outlined
          autoFocus={true}
          style={{
            marginRight: "10px",
            color: textColor,
            backgroundColor: backgroundColor,
          }}
        >
          Next Relaxation Stretch
        </Button>
        <Button
          onClick={switchToNextLongImage}
          className={styles.actionButton}
          autoFocus={true}
          style={{
            marginLeft: "10px",
            color: textColor,
            backgroundColor: backgroundColor,
          }}
          outlined
        >
          Try a 7-minute workout
        </Button>
      </animated.div>
    </animated.div>
  );
};

interface BreakProgressProps {
  breakMessage: string;
  endBreakEnabled: boolean;
  onEndBreak: () => void;
  onSkipBreak: () => void;
  settings: Settings;
  textColor: string;
}

function BreakProgress(props: BreakProgressProps) {
  const {
    breakMessage,
    endBreakEnabled,
    onEndBreak,
    onSkipBreak,
    settings,
    textColor,
  } = props;
  const [timeRemaining, setTimeRemaining] =
    React.useState<TimeRemaining | null>(null);
  const [progress, setProgress] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (settings.gongEnabled) {
      ipcRenderer.invokeGongStartPlay();
    }
    ipcRenderer.invokeBreakStart();

    (async () => {
      const length = new Date(await ipcRenderer.invokeGetBreakLength());
      const breakEndTime = moment()
        .add(length.getHours(), "hours")
        .add(length.getMinutes(), "minutes")
        .add(length.getSeconds(), "seconds");

      const startMsRemaining = moment(breakEndTime).diff(
        moment(),
        "milliseconds"
      );

      const tick = () => {
        const now = moment();

        if (now > moment(breakEndTime)) {
          onEndBreak();
          return;
        }

        const msRemaining = moment(breakEndTime).diff(now, "milliseconds");
        setProgress(1 - msRemaining / startMsRemaining);
        setTimeRemaining({
          hours: Math.floor(msRemaining / 1000 / 3600),
          minutes: Math.floor(msRemaining / 1000 / 60),
          seconds: (msRemaining / 1000) % 60,
        });
        setTimeout(tick, TICK_MS);
      };

      tick();
    })();
  }, [onEndBreak, settings]);

  const fadeIn = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: config.slow,
    delay: 500,
  });

  if (timeRemaining === null || progress === null) {
    return null;
  }

  return (
    <animated.div className={styles.breakProgress} style={fadeIn}>
      <OuterSpinner value={progress} textColor={textColor} />
      <div className={styles.progressContent}>
        <h1
          className={styles.breakMessage}
          dangerouslySetInnerHTML={{ __html: breakMessage }}
        />
        {endBreakEnabled && (
          <Button
            className={styles.actionButton}
            onClick={onSkipBreak}
            outlined
            autoFocus={true}
            style={{ color: textColor }}
          >
            Skip
          </Button>
        )}
      </div>
    </animated.div>
  );
}

interface BreakEndProps {
  onSubmitSurvey: () => void;
  textColor: string;
}

function BreakEnd(props: BreakEndProps) {
  const { onSubmitSurvey, textColor } = props;
  const fadeIn = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: config.slow,
    delay: 500,
  });
  const breakMessage =
    "Great job completing your break! Take a minute to answer a quick survey about your experience";
  return (
    <animated.div className={styles.breakEnd} style={fadeIn}>
      <div className={styles.breakEndContent}>
        <h1
          className={styles.breakMessage}
          dangerouslySetInnerHTML={{ __html: breakMessage }}
        />
        {
          <Button
            className={styles.actionButton}
            onClick={onSubmitSurvey}
            autoFocus={true}
            outlined
            style={{
              color: textColor,
            }}
          >
            Submit Survey and Close
          </Button>
        }
      </div>
    </animated.div>
  );
}

interface BreakCountdownProps {
  breakTitle: string;
  onCountdownOver: () => void;
  onPostponeBreak: () => void;
  onSkipBreak: () => void;
  postponeBreakEnabled: boolean;
  skipBreakEnabled: boolean;
  textColor: string;
}

function BreakCountdown(props: BreakCountdownProps) {
  const {
    breakTitle,
    onCountdownOver,
    onPostponeBreak,
    onSkipBreak,
    postponeBreakEnabled,
    skipBreakEnabled,
    textColor,
  } = props;
  const [progress, setProgress] = React.useState<number | null>(null);

  React.useEffect(() => {
    (async () => {
      const countdownEndTime = moment().add(COUNTDOWN_SECS, "seconds");

      const tick = () => {
        const now = moment();

        if (now > countdownEndTime) {
          onCountdownOver();
          return;
        }

        const msRemaining = countdownEndTime.diff(now, "milliseconds");
        setProgress(1 - msRemaining / 1000 / COUNTDOWN_SECS);
        setTimeout(tick, TICK_MS);
      };

      tick();
    })();
  }, [onCountdownOver]);

  const fadeIn = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: config.slow,
    delay: 500,
  });

  if (progress === null) {
    return null;
  }

  return (
    <animated.div className={styles.breakCountdown} style={fadeIn}>
      <h2
        className={styles.breakTitle}
        dangerouslySetInnerHTML={{ __html: breakTitle }}
      />
      {(skipBreakEnabled || postponeBreakEnabled) && (
        <ControlGroup>
          <ButtonGroup>
            {skipBreakEnabled && (
              <Button
                className={styles.actionButton}
                onClick={onSkipBreak}
                icon={<Spinner value={1 - progress} size={16} />}
                outlined
                autoFocus={true}
                style={{ color: textColor }}
              >
                Skip
              </Button>
            )}
            {postponeBreakEnabled && (
              <Button
                className={styles.actionButton}
                onClick={onPostponeBreak}
                icon={<Spinner value={1 - progress} size={16} />}
                outlined
                autoFocus={true}
                style={{ color: textColor }}
              >
                Postpone
              </Button>
            )}
          </ButtonGroup>
        </ControlGroup>
      )}
    </animated.div>
  );
}

export default function Break() {
  const [settings, setSettings] = React.useState<Settings | null>(null);
  const [countingDown, setCountingDown] = React.useState(true);
  const [allowPostpone, setAllowPostpone] = React.useState<boolean | null>(
    null
  );
  const [processEnv, setProcessEnv] = React.useState<string | null>(null);
  const [ready, setReady] = React.useState(false);
  const [closing, setClosing] = React.useState(false);
  const [breakEnding, setBreakEnding] = React.useState(false);
  const [anim, animApi] = useSpring(() => ({
    width: 0,
    height: 0,
    backgroundOpacity: 0,
    backdropOpacity: 0,
  }));

  React.useEffect(() => {
    setTimeout(async () => {
      // 延迟1秒后执行
      animApi({
        backgroundOpacity: 1,
        backdropOpacity: 1,
        width: 250, // 250
        height: 250,
      });
      const allowPostpone = await ipcRenderer.invokeGetAllowPostpone();
      const settings = (await ipcRenderer.invokeGetSettings()) as Settings;
      const processEnv = await ipcRenderer.invokeGetProcess();

      // Skip the countdown if these are disabled
      if (
        !settings.skipBreakEnabled &&
        !(settings.postponeBreakEnabled && allowPostpone)
      ) {
        setCountingDown(false);
      }

      setAllowPostpone(await ipcRenderer.invokeGetAllowPostpone());
      setSettings(settings);
      setProcessEnv(processEnv);

      setReady(true);
    }, 1000);
  }, [animApi]); // 只有在 animApi 发生变化时才重新运行 effect 函数

  const handleCountdownOver = React.useCallback(() => {
    setCountingDown(false);
  }, []);

  React.useEffect(() => {
    if (!countingDown) {
      animApi({ backgroundOpacity: 1, width: 500, height: 500 });
    }
  }, [countingDown, animApi]);

  React.useEffect(() => {
    if (breakEnding) {
      animApi({ backgroundOpacity: 1, width: 500, height: 500 });
    }
  }, [breakEnding, animApi]);

  React.useEffect(() => {
    if (closing) {
      animApi({ backgroundOpacity: 0, width: 0, height: 0 });
      setTimeout(() => {
        window.close();
      }, 500);
    }
  }, [animApi, closing]);

  const handlePostponeBreak = React.useCallback(async () => {
    await ipcRenderer.invokeBreakPostpone();
    setClosing(true);
  }, []);

  const handleSkipBreak = React.useCallback(() => {
    setClosing(true);
  }, []);

  const handleSubmitSurvey = React.useCallback(() => {
    ipcRenderer.invokeOpenExternalURL();
    setTimeout(() => {
      setClosing(true);
    }, 1000);
    // setClosing(true);
  }, []);

  const handleEndBreak = React.useCallback(() => {
    if (settings?.gongEnabled) {
      // For some reason the end gong sometimes sounds very distorted, so just
      // reuse the start gong.
      ipcRenderer.invokeGongEndPlay();
    }
    ipcRenderer.invokeBreakEnd();
    setBreakEnding(true);
    // setClosing(true);
  }, [settings]);

  if (settings === null || allowPostpone === null) {
    console.log("settings, allowPostpone is null");

    return null;
  }
  if (processEnv === null) {
    console.log("processEnv is null");
    return null;
  } else {
    console.log(processEnv);
  }

  return (
    <div className={styles.overallContainer}>
      <animated.div
        className={`bp3-dark ${styles.breakContainer}`}
        style={{
          backgroundColor: countingDown
            ? "initial"
            : createRgba(settings.backdropColor, settings.backdropOpacity),
          opacity: anim.backdropOpacity,
        }}
      >
        {ready && !countingDown && !closing && (
          <ImageComponent
            textColor={settings.textColor}
            backgroundColor={settings.backgroundColor}
            processEnv={processEnv}
          />
        )}

        <animated.div
          className={styles.break}
          style={{
            width: anim.width,
            height: anim.height,
            color: settings.textColor,
          }}
        >
          <animated.div
            className={styles.background}
            style={{
              width: anim.width,
              height: anim.height,
              opacity: anim.backgroundOpacity,
              backgroundColor: settings.backgroundColor,
            }}
          />
          {ready && !breakEnding && !closing && (
            <>
              {countingDown ? (
                <BreakCountdown
                  breakTitle={settings.breakTitle}
                  onCountdownOver={handleCountdownOver}
                  onPostponeBreak={handlePostponeBreak}
                  onSkipBreak={handleSkipBreak}
                  postponeBreakEnabled={
                    settings.postponeBreakEnabled && allowPostpone
                  }
                  skipBreakEnabled={settings.skipBreakEnabled}
                  textColor={settings.textColor}
                />
              ) : (
                <BreakProgress
                  breakMessage={settings.breakMessage}
                  endBreakEnabled={settings.endBreakEnabled}
                  onSkipBreak={handleSkipBreak}
                  onEndBreak={handleEndBreak}
                  settings={settings}
                  textColor={settings.textColor}
                />
              )}
            </>
          )}
          {breakEnding && !closing && (
            <div>
              <BreakEnd
                onSubmitSurvey={handleSubmitSurvey}
                textColor={settings.textColor}
              />
            </div>
          )}
        </animated.div>
      </animated.div>
    </div>
  );
}
