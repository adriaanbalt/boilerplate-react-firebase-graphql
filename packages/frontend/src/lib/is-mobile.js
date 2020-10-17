import platform from "platform";

export default () =>
  platform.os.family === "Android" || platform.os.family === "iOS";
