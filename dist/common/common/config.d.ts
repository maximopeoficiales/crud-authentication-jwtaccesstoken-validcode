declare const _default: (() => {
    mongo: {
        dbname: string;
        user: string;
        password: string;
        port: string;
        hostname: string;
        connection: string;
        params: string;
    };
    hosting: {
        clientHostOwner: string;
        clientHostReseller: string;
        clientHostTenant: string;
    };
    owner: {
        accessTokenOwner: string;
        jwtSecretOwner: string;
        jwtExpiresTimeOwner: string;
        jwtSecretRefreshOwner: string;
        jwtRefereshExpiresTimeOwner: string;
        Owner_Port: string;
        Owner_Host: string;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    mongo: {
        dbname: string;
        user: string;
        password: string;
        port: string;
        hostname: string;
        connection: string;
        params: string;
    };
    hosting: {
        clientHostOwner: string;
        clientHostReseller: string;
        clientHostTenant: string;
    };
    owner: {
        accessTokenOwner: string;
        jwtSecretOwner: string;
        jwtExpiresTimeOwner: string;
        jwtSecretRefreshOwner: string;
        jwtRefereshExpiresTimeOwner: string;
        Owner_Port: string;
        Owner_Host: string;
    };
}>;
export default _default;
