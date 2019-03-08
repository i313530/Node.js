"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FeedbackController = __importStar(require("../controllers/feedback"));
const ApiRouter = express_1.Router();
exports.default = (app) => {
    ApiRouter.get('/', FeedbackController.getFeedbacks);
    ApiRouter.post('/', FeedbackController.addFeedback);
    ApiRouter.delete('/:id', FeedbackController.removeFeedback);
    app.use('/api/feedbacks', ApiRouter);
};
//# sourceMappingURL=feedback.js.map