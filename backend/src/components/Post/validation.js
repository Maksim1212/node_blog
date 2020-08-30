const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class PostValidation extends Validation {

    findById(data) {
        return this.Joi
            .object({
                id: this.Joi.objectId(),
            })
            .validate(data);
    }
    findByUserId(data) {
        return this.Joi
            .object({
                id: this.Joi.objectId(),
            })
            .validate(data);
    }

    create(post) {
        return this.Joi
            .object({
                author_id: this.Joi
                    .string()
                    .min(15)
                    .max(35)
                    .required(),
                accessToken: this.Joi
                    .string()
                    .min(40)
                    .max(200)
                    .required(),
                author_name: this.Joi
                    .string()
                    .min(2)
                    .max(35)
                    .required(),
                title: this.Joi
                    .string()
                    .min(1)
                    .max(100)
                    .required(),
                body: this.Joi
                    .string()
                    .min(1)
                    .max(10000)
                    .required(),
                comment: this.Joi
                    .string()
                    .min(1)
                    .max(500),
            })
            .validate(post);
    }

    updateById(data) {
        return this.Joi
            .object({
                id: this.Joi.objectId(),
                accessToken: this.Joi.string().min(40).max(200).required(),
                author_id: this.Joi.string().min(12).max(40),
                title: this.Joi
                    .string()
                    .min(1)
                    .max(100)
                    .required(),
                body: this.Joi
                    .string()
                    .min(1)
                    .max(10000)
                    .required(),
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
                post_id: this.Joi
                    .string()
                    .min(15)
                    .max(28)
                    .required(),
            })
            .validate(data);
    }

    deleteById(data) {
        return this.Joi
            .object({
                id: this.Joi.objectId(),
                _csrf: this.Joi.string(),
            })
            .validate(data);
    }
}

module.exports = new PostValidation();