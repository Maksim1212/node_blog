const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class CommentValidation extends Validation {

    findById(data) {
        return this.Joi
            .object({
                id: this.Joi.objectId(),
            })
            .validate(data);
    }
    likedUserId(data) {
        return this.Joi
            .object({
                user_id: this.Joi
                    .string()
                    .min(15)
                    .max(28)
                    .required(),
                comment_id: this.Joi
                    .string()
                    .min(15)
                    .max(28)
                    .required(),
            })
            .validate(data);
    }
    findByPostId(data) {
        return this.Joi
            .object({
                id: this.Joi.objectId(),
            })
            .validate(data);
    }

    create(comment) {
        return this.Joi
            .object({
                author_id: this.Joi
                    .string()
                    .min(15)
                    .max(35)
                    .required(),
                post_id: this.Joi
                    .string()
                    .min(15)
                    .max(35)
                    .required(),
                body: this.Joi
                    .string()
                    .min(1)
                    .max(10000)
                    .required(),
            })
            .validate(comment);
    }
}

module.exports = new CommentValidation();
