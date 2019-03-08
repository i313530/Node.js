"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const feedback_1 = __importDefault(require("../services/feedback"));
/* API Controllers */
exports.getFeedbacks = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const feedbacks = yield feedback_1.default.getFeedbacks();
        res.json(feedbacks);
    }
    catch (err) {
        res.status(500);
        res.send(err);
    }
});
exports.addFeedback = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const text = req.body.text;
        const feedback = yield feedback_1.default.addFeedback(text);
        res.json(feedback);
    }
    catch (err) {
        res.status(500);
        res.send(err);
    }
});
exports.removeFeedback = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield feedback_1.default.removeFeedback(id);
        res.send('ok');
    }
    catch (err) {
        res.status(500);
        res.send(err);
    }
});
//# sourceMappingURL=feedback.js.map