"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => ({
    auth: {
        secret: env('ADMIN_JWT_SECRET'),
    },
    apiToken: {
        salt: env('API_TOKEN_SALT'),
    },
    transfer: {
        token: {
            salt: env('TRANSFER_TOKEN_SALT'),
        },
    },
    flags: {
        nps: env.bool('NPS', true),
        promoteEE: env.bool('PROMOTE_EE', true),
    },
});
//# sourceMappingURL=admin.js.map