const { pack, unpack } = require("msgpackr");
const WebSocket = require("ws");

const ws = new WebSocket("wss://skid-headless-production.up.railway.app");
ws.binaryType = "nodebuffer";

ws.on("open", () => {
    console.log("연결됨");
    ws.send(pack(["M", 72011]));
});

ws.on("message", (msg) => {
    const data = unpack(msg);
    const type = data[0];

    if (type === "M") {
        const challenge = data[1];
        console.log("챌린지 받음:", challenge);
        ws.send(pack(["C", challenge ^ 845]));
        console.log("인증 완료!");
    }
});
