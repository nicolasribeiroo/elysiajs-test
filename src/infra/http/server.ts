import 'dotenv/config';
import { app } from './app';

app.listen(process.env.HTTP_PORT!, (server) => {
	console.log(`Server is running on http://${server.hostname}:${server.port}`);
});
