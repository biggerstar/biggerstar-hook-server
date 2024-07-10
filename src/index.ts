import express, {Express} from 'express';
import cors from 'cors';
import mitt, {Emitter} from "mitt";

export type CreateHookServerOptions = {
    /**
     * 监听的端口
     * */
    port?: number,
    /**
     * 是否在启动的时候打印监听信息
     */
    showListen?: boolean
}

export type HookServerApp = Express & {
    bus: Emitter<Record<any, any>>;
}
/**
 * 创建一个简易服务器，拦截传入的请求 Request Response ，并触发事件以便拦截获取相关信息
 * */
export function createHookServer(options?: CreateHookServerOptions): HookServerApp {
    const app = express() as HookServerApp
    const PORT = options?.port ?? 8000;
    const router = express.Router();
    const bus = mitt()
    app.use(cors());
    app.use(express.json({limit: '100mb'}));
    app.use(express.urlencoded({limit: '100mb', extended: true}));
    app.use('/', router);
    router.get('/request', (req, res) => {
        res.send('小老弟 不要用 get 而是换成 post 哦')
    });
    router.post('/request', (req, res) => {
        bus.emit('request', req.body)
        res.send('ok')
    });
    router.get('/response', (req, res) => {
        res.send('小老弟 不要用 get 而是换成 post 哦')
    });
    router.post('/response', (req, res) => {
        bus.emit('request', req.body)
        res.send('ok')
    });

    app.listen(PORT, () => {
        if (options?.showListen) {
            console.log(`server listen on http://localhost:${PORT}`)
        }
    });
    app.bus = bus;
    return app
}
