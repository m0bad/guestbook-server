import express from 'express';
import mongoose from 'mongoose';
// @ts-ignore
import {PORT, DB_URL} from "../local";
import {UserRouter} from "./routes/userRouter";
import {MessagesRouter} from "./routes/Messagesrouter";

class Server {
    private app: express.Application;

    constructor() {
        this.app = express();
        this.initializeConfigs();
        this.initializeRoutes();
        this.initializeDB();
    }

    private initializeConfigs(): void {
        console.log('port is: ', PORT);
        this.app.set('port', PORT || 3000);
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    private initializeRoutes(): void{
        this.app.use('/api/auth', new UserRouter().router);
        this.app.use('/api/messages', new MessagesRouter().router);
    }

    private initializeDB() {
        const dbConnection = mongoose.connection;

        dbConnection.on('connected', () => console.log('Connected to the database'));
        dbConnection.on('reconnected', () => console.log('Reconnected to the database'));
        dbConnection.on('close', () => console.log('closed connection to the database'));
        dbConnection.on('error', (error: Error) => console.log(`database connection error ${error}`));
        dbConnection.on('disconnected', () => {
            console.log('Disconnected from the database');
            setTimeout(() => {
                mongoose.connect(DB_URL, {
                    autoReconnect: true, keepAlive: true,
                    socketTimeoutMS: 3000, connectTimeoutMS: 3000
                });
            }, 3000);
        });

        const run = async () => {
            await mongoose.connect(DB_URL, {
                autoReconnect: true, keepAlive: true
            });
        };

        run().catch(error => console.error(error));

    }

    public start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log(`API is running on port ${PORT}`);
        });
    }
}

const server = new Server();
server.start();
