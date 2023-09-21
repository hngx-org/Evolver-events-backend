const { check, validationResult } = require("express-validator");

exports.checkName = [];
exports.checkEmail = [];
exports.checkImage = [];

const {} = require("express-validator");

// Validation for user's name
exports.validateName = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long")
    .isString()
    .withMessage("Name must be a string"),
];

// Validation for user's email
exports.validateEmail = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
];

// Validation for event title
exports.validateTitle = [
  check("title")
    .trim()
    .notEmpty()
    .withMessage("Event title is required")
    .isString()
    .withMessage("Event title must be a string"),
];

// Validation for event description
exports.validateDescription = [
  check("description")
    .trim()
    .notEmpty()
    .withMessage("Event description is required")
    .isString()
    .withMessage("Event description must be a string"),
];

// Validation for avatar/thumbnail
exports.validateAvatarThumbnail = [
  check("avatar")
    .trim()
    .optional()
    .isURL()
    .withMessage("Invalid URL format for avatar"),

  check("thumbnail")
    .trim()
    .optional()
    .isURL()
    .withMessage("Invalid URL format for thumbnail"),
];

// Validation for user comment
exports.validateComment = [
  check("comment")
    .trim()
    .notEmpty()
    .withMessage("Comment is required")
    .isString()
    .withMessage("Comment must be a string"),
];

// Validation for event dates (assuming they are in ISO 8601 format)
exports.validateDates = [
  check("dates")
    .isArray()
    .withMessage("Dates must be an array")
    .notEmpty()
    .withMessage("At least one date is required")
    .custom((dates) => {
      // --- Check if all dates in the array are valid ISO 8601 dates
      return dates.every((date) => {
        return new Date(date).toISOString() === date;
      });
    })
    .withMessage("Invalid date format in the dates array"),
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};
