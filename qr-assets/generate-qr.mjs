import QRCode from "qrcode";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const OPTS = {
  width: 1024,
  margin: 4,
  color: { dark: "#000000", light: "#FFFFFF" },
};

const APPS = [
  {
    dir: "healthyword",
    ios: "https://testflight.apple.com/join/WkYC6kHx",
    android: "https://play.google.com/apps/testing/com.bespokenit.healthyword",
  },
  {
    dir: "luvacross",
    ios: "https://testflight.apple.com/join/q5SWZwgr",
    android: "https://play.google.com/apps/testing/com.bespokenit.luvacross",
  },
  {
    dir: "eko-guide",
    ios: "https://testflight.apple.com/join/ATjfNdsF",
    android: "https://play.google.com/apps/testing/com.bespokenit.ekoguide",
  },
];

for (const app of APPS) {
  const outDir = path.join(__dirname, app.dir);
  await QRCode.toFile(path.join(outDir, "qr-ios.png"), app.ios, OPTS);
  await QRCode.toFile(path.join(outDir, "qr-android.png"), app.android, OPTS);
  console.log(`${app.dir}: qr-ios.png, qr-android.png written`);
}
