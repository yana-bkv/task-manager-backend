import { createExpressApp } from "../app";
import connectDB from "../core/db/db";
import type { VercelRequest, VercelResponse } from '@vercel/node';

let dbReady: Promise<void> | null = null;

function ensureDB() {
    if (!dbReady) {
        dbReady = connectDB().catch(err => {
            dbReady = null;
            throw err;
        });
    }
    return dbReady;
}

let app: ReturnType<typeof createExpressApp> | null = null;

// ✅ Основная функция для Vercel
export default async function handler(req: VercelRequest, res: VercelResponse) {
    await ensureDB();

    if (!app) {
        app = createExpressApp();
    }

    // 👉 Express в Vercel нужно вызывать именно так
    return app(req, res);
}