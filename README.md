### API
	默认端口 8000
	http://localhost:{port}/request
	http://localhost:{port}/response

### 使用
```javascript
import { createHookServer } from '@biggerstar-hook-server'
const server  =createHookServer({
		port: 8000,
		showListen: true,
	})
server.on('request', (data) => {})
server.on('response', (data) => {})

```
