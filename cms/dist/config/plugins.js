"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    'users-permissions': {
        config: {
            jwtSecret: process.env.JWT_SECRET || 'jwt-secret-dev',
        },
    },
});
//# sourceMappingURL=plugins.js.map