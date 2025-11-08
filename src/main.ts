import connectDB from './db/db';
import {createExpressApp} from './app';

async function main() {
    try {
        await connectDB();
        const app = createExpressApp();
        const port = process.env.PORT || 4000;
        app.listen(port, () => {
            console.log(`Server listens on port localhost:${port}`);
        })
    } catch (err) {
        console.error(err);
    }
}

main();