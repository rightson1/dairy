import PusherClient from "pusher-js";
import PusherServer from "pusher";
const appId = process.env.NEXT_PUBLIC_APP_ID;
const key = process.env.NEXT_PUBLIC_KEY;
const secret = process.env.NEXT_PUBLIC_SECRET;
console.log(appId, key, secret);
if (!appId || !key || !secret) {
  throw new Error(
    "Please provide PUSHER_APP_ID, PUSHER_KEY and PUSHER_SECRET in .env.local file"
  );
}
export const pusherServer = new PusherServer({
  appId,
  key,
  secret,
  cluster: "ap2",
  useTLS: true,
});

export const pusherClient = new PusherClient(key, {
  cluster: "ap2",
});
