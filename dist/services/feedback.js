"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Feedback_1 = require("../models/Feedback");
// import { table2 } from '../models/table2'
const getFeedbacks = () => __awaiter(this, void 0, void 0, function* () {
    const feedbackRepo = typeorm_1.getManager().getRepository(Feedback_1.Feedback);
    return feedbackRepo.find();
});
const addFeedback = (text) => __awaiter(this, void 0, void 0, function* () {
    const feedbackRepo = typeorm_1.getManager().getRepository(Feedback_1.Feedback);
    const feedback = new Feedback_1.Feedback();
    feedback.text = text;
    return feedbackRepo.save(feedback);
});
const removeFeedback = (id) => __awaiter(this, void 0, void 0, function* () {
    const feedbackRepo = typeorm_1.getManager().getRepository(Feedback_1.Feedback);
    const feedback = yield feedbackRepo.findOne(id);
    return feedbackRepo.remove(feedback);
});
exports.default = {
    getFeedbacks,
    addFeedback,
    removeFeedback
};
//# sourceMappingURL=feedback.js.map