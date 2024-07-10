import {createHookServer} from "../dist/index";

const server = createHookServer({
    port: 3002,
    showListen: true,
});
const bus = server.bus
bus.on("request", (data) => {})
bus.on("response", (data) => {})

