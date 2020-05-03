import { join } from "path";

// config.ts
require('dotenv').config({ path: join(process.cwd(), 'apps/api/src/.env') });
