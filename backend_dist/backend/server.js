"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const shared_config = __importStar(require("../shared/shared_config"));
const get_session_1 = __importDefault(require("./routes/get/get_session"));
const server_status_1 = __importDefault(require("./routes/get/server_status"));
const database_status_1 = __importDefault(require("./routes/get/database_status"));
const get_all_items_1 = __importDefault(require("./routes/get/get_all_items"));
const get_all_products_1 = __importDefault(require("./routes/get/get_all_products"));
const get_all_users_1 = __importDefault(require("./routes/get/get_all_users"));
const create_product_1 = __importDefault(require("./routes/post/create_product"));
const create_item_1 = __importDefault(require("./routes/post/create_item"));
const create_user_1 = __importDefault(require("./routes/post/create_user"));
const login_1 = __importDefault(require("./routes/post/login"));
const health_observer_1 = __importDefault(require("./mongoose/health_observer"));
const scrum_rules_1 = __importDefault(require("./mongoose/scrum_rules"));
const promises_1 = require("node:dns/promises");
const dotenv_1 = require("dotenv");
const node_path_1 = require("node:path");
(0, dotenv_1.config)();
(0, promises_1.setServers)(['1.1.1.1', '8.8.8.8']);
(async () => {
    try {
        console.log('Attempting to connect to DB...');
        (0, health_observer_1.default)();
        await mongoose_1.default.connect(process.env.MONGO_URI);
        (0, scrum_rules_1.default)();
        console.log('DB Connected and Scrum Rules active.');
    }
    catch (error) {
        console.log('CRITICAL! Failed to connect to database!', error);
        process.exit(1);
    }
})();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
const originURL = process.env.FRONTEND_URL || shared_config.localClientURL;
// Middleware
app.use((0, cors_1.default)({
    origin: originURL,
    credentials: true, // cookies
}));
console.log('Cors Origin is set to:', originURL);
const folderPath = (0, node_path_1.join)(__dirname, '../../frontend/dist');
const path = (0, node_path_1.join)(folderPath, 'index.html');
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api', server_status_1.default);
app.use('/api', database_status_1.default);
app.use('/api', get_all_users_1.default);
app.use('/api', get_all_items_1.default);
app.use('/api', get_all_products_1.default);
app.use('/api', get_session_1.default);
app.use('/api', create_product_1.default);
app.use('/api', create_item_1.default);
app.use('/api', create_user_1.default);
app.use('/api', login_1.default);
// fallback to origin on invalid routes
// adresses Issue #23
app.use(express_1.default.static(folderPath));
app.get('/*splat', (_, res) => {
    console.log('Fallback route triggered');
    res.sendFile(path);
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});
