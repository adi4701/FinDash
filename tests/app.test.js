process.env.PORT = "4001";
process.env.MONGODB_URI = "mongodb://127.0.0.1:27017/findash_test";
process.env.JWT_SECRET = "test_secret_for_ci_only_12345";
process.env.JWT_EXPIRES_IN = "1d";
process.env.BCRYPT_SALT_ROUNDS = "10";

const request = require("supertest");
const app = require("../src/app");

describe("App smoke tests", () => {
  it("returns health response", async () => {
    const response = await request(app).get("/api/v1/health");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("rejects invalid login payload", async () => {
    const response = await request(app).post("/api/v1/auth/login").send({ email: "not-an-email" });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it("requires auth on records endpoint", async () => {
    const response = await request(app).get("/api/v1/records");

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });
});
