const vogels = require('vogels');
const Joi = require('joi');

const BlogPosts = vogels.define('BlogPosts', {
  hashKey : 'email',
  rangeKey : 'title',
  schema : {
    email   : Joi.string().email(),
    title   : Joi.string(),
    content : Joi.binary(),
    tags   : vogels.types.stringSet(),
  },
  tableName: 'blog_posts'
});

module.exports = BlogPosts;