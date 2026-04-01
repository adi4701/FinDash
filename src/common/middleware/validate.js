const { z } = require("zod");

function validate(schema) {
  return (req, _res, next) => {
    const input = {
      body: req.body,
      query: req.query,
      params: req.params,
    };

    const result = schema.safeParse(input);

    if (!result.success) {
      return next(result.error);
    }

    req.body = result.data.body;
    req.query = result.data.query;
    req.params = result.data.params;
    return next();
  };
}

module.exports = validate;
module.exports.z = z;
