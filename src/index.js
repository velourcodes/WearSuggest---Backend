import "dotenv/config";
import fs from "fs";
import path from "path";

import { app } from "./app.js";
import { ENV } from "./config/env.js";
import { dbConnection } from "./db/index.js";

(async () => {
    try {
        await dbConnection(ENV.DB.URL, ENV.DB.NAME);

        const tempDir = path.join(process.cwd(), "public", "temp");
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        app.listen(ENV.PORT, () => {
            console.log(
                ENV.IS_PROD
                    ? "Server running in PRODUCTION"
                    : " Server running in DEVELOPMENT"
            );
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
})();
