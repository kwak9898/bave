"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../base/base.entity");
const user_entity_1 = require("../../user/entity/user.entity");
const feed_entity_1 = require("../../feed/entity/feed.entity");
let Like = class Like extends base_entity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'like_id',
        comment: '좋아요 ID',
    }),
    __metadata("design:type", Number)
], Like.prototype, "likeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Users, (user) => user.likeList),
    (0, typeorm_1.JoinColumn)({ name: 'user_id', referencedColumnName: 'userId' }),
    __metadata("design:type", user_entity_1.Users)
], Like.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => feed_entity_1.Feed, (feed) => feed.likeList),
    (0, typeorm_1.JoinColumn)({ name: 'feed_id', referencedColumnName: 'feedId' }),
    __metadata("design:type", feed_entity_1.Feed)
], Like.prototype, "feed", void 0);
Like = __decorate([
    (0, typeorm_1.Entity)('bookmark')
], Like);
exports.Like = Like;
//# sourceMappingURL=bookmark.entity.js.map
