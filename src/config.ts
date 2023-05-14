import { registerAs } from "@nestjs/config";

export default registerAs("config", () => {
  return {
    mongo: {
      dbname: process.env?.DATABASE_NAME,
      user: process.env?.DB_USERNAME,
      password: process.env?.DB_PASSWORD,
      port: process?.env.DATABASE_PORT,
      hostname: process.env?.HOST_NAME,
      connection: process.env.DB_CONNECTION,
      params: process.env?.PARAMS,
    },
    hosting: {
      /** CLIENT */
      clientHostOwner: process.env.CLIENT_HOST_OWNER,
    },
    owner: {
      /** OWNER */
      accessTokenOwner: process.env.OWNER_ACCESS_TOKEN,
      jwtSecretOwner: process.env.OWNER_JWT_SECRET,
      jwtExpiresTimeOwner: process.env.OWNER_JWT_EXPIRES_TIME,
      jwtSecretRefreshOwner: process.env.OWNER_JWT_SECRET_REFRESH,
      jwtRefereshExpiresTimeOwner: process.env.OWNER_JWT_REFRESH_EXPIRES_TIME,
      Owner_Port: process.env.OWNER_PORT,
      Owner_Host: process.env.OWNER_HOST,
      audience: process.env.OWNER_JWT_AUDIENCE,
      issuer: process.env.OWNER_JWT_ISSUER,
    },
  };
});
