import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'https://api.selfmade.city';

const token = 'your_jwt_token_here';

const socket = io(URL, {
    auth: {
        token: token
    }
});

export default { socket }

