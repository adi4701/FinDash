const app = require("./app");
const env = require("./config/env");
const { connectDb } = require("./config/db");

async function bootstrap() {
  try {
    await connectDb();
    app.listen(env.PORT, () => {
      console.log(`Server listening on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
}

bootstrap();
