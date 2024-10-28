# Information
Development of a progress system for an idle game.

This service is responsible for updating the player's experience (XP) and level. Even when the player is inactive (logged out), XP and level will still increase. **XP is updated every minute.**

# Important
For further work, you need to create a ```.env``` file in the root of the project with the following variables:
```
SERVER_PORT=your_server_port
SERVER_API_PREFIX=your_server_api_prefix

DB_URL="postgresql://your_username:your_password@your_host:your_port/your_db_name"

TELEGRAM_TOKEN="fake_token"

JWT_TTL=your_jwt_ttl_value
JWT_ACCESS_SECRET=your_jwt_access_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key

XP_PER_MINUTE=your_xp_per_minute_value
LEVEL_THRESHOLD=your_level_threshold_value
LEVEL_THRESHOLD_INCREASE_BY=your_increase_level_threshold_by_value
```
If any of these values are missing, an error will occur.

Also install/update the Nest JS package globally:
```bash
npm i -g @nestjs/cli
```

You can also notice the x-telegram header in Swagger.
This is a fake Telegram authorization, and its value is ```fake_token```.

# Running
```bash
npm i
npm run app
```

The Swagger is at ```http://localhost:your_server_port/api```.
