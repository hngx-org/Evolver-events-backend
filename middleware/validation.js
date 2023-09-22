import { check } from "express-validator";

const validate = {
  Event: [
    check("title", "title field is required.")
      .exists()
      .bail()
      .isString()
      .notEmpty()
      .trim(),
    check("description", "description field is required.")
      .exists()
      .bail()
      .isString()
      .notEmpty()
      .trim(),
    check("location", "location field is required.")
      .exists()
      .bail()
      .isString()
      .notEmpty()
      .trim(),
    check("start_date", "start_date field is required. Format: YYYY-MM-DD")
      .exists()
      .bail()
      .isDate()
      .notEmpty()
      .trim(),
    check("end_date", "end_date field is required. Format: YYYY-MM-DD")
      .exists()
      .bail()
      .isDate()
      .notEmpty()
      .trim(),
    check("start_time", "start_time field is required. 24 hrs format 00:00:00")
      .exists()
      .bail()
      .isString()
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
      .notEmpty()
      .trim(),
    check("end_time", "end_time field is required. 24 hrs format 00:00:00")
      .exists()
      .bail()
      .isString()
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
      .notEmpty()
      .trim(),
  ],
};

export default validate;
