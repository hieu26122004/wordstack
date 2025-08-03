import Joi from "joi";
import httpStatus from "http-status";

const registerSchema = Joi.object().keys({
  username: Joi.string().required().messages({
    "string.base": "Username must be a valid string",
    "any.required": "Username is required",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a valid string",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "string.base": "Password must be a valid string",
    "any.required": "Password is required",
  }),
});

export const registerValidator = (req, res, next) => {
  const { value, error } = registerSchema.validate(req.body, {
    allowUnknown: true,
    errors: { wrap: { label: "" } },
  });

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(httpStatus.BAD_REQUEST).json({
      message: errorMessage,
      success: false,
    });
  }

  req.body = value;
  next();
};

const loginSchema = Joi.object().keys({
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a valid string",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "string.base": "Password must be a valid string",
    "any.required": "Password is required",
  }),
});

export const loginValidator = (req, res, next) => {
  const { value, error } = loginSchema.validate(req.body, {
    allowUnknown: true,
    errors: { wrap: { label: "" } },
  });

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(httpStatus.BAD_REQUEST).json({
      message: errorMessage,
      success: false,
    });
  }

  req.body = value;
  next();
};

const definitionSchema = Joi.object({
  definition: Joi.string().trim().required().messages({
    "string.base": "Definition must be a string",
    "any.required": "Definition is required",
  }),
  partOfSpeech: Joi.string().trim().required().messages({
    "string.base": "Part of speech must be a string",
    "any.required": "Part of speech is required",
  }),
  examples: Joi.array()
    .items(
      Joi.object({
        exampleText: Joi.string().trim().required().messages({
          "string.base": "Example text must be a string",
          "any.required": "Example text is required",
        }),
        translation: Joi.string().trim().allow(null, ""),
      })
    )
    .optional(),
  synonyms: Joi.array()
    .items(
      Joi.object({
        synonymyId: Joi.number().integer().required().messages({
          "number.base": "Synonym ID must be a number",
          "any.required": "Synonym ID is required",
        }),
      })
    )
    .optional(),
  antonyms: Joi.array()
    .items(
      Joi.object({
        antonymId: Joi.number().integer().required().messages({
          "number.base": "Antonym ID must be a number",
          "any.required": "Antonym ID is required",
        }),
      })
    )
    .optional(),
});

const createWordSchema = Joi.object({
  word: Joi.string().trim().lowercase().min(2).required().messages({
    "string.base": "Word must be a valid string",
    "string.min": "Word must contain at least 2 characters",
    "any.required": "Word is required",
  }),
  phonetic: Joi.string().trim().allow(null, "").optional(),
  pronunciationUrl: Joi.string()
    .uri()
    .trim()
    .allow(null, "")
    .optional()
    .messages({
      "string.uri": "Pronunciation URL must be a valid URL",
    }),
  definitions: Joi.array().items(definitionSchema).min(1).required().messages({
    "array.base": "Definitions must be an array",
    "array.min": "At least one definition is required",
    "any.required": "Definitions are required",
  }),
});

export const createWordValidator = (req, res, next) => {
  const { value, error } = createWordSchema.validate(req.body, {
    allowUnknown: true,
    errors: { wrap: { label: "" } },
  });

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(httpStatus.BAD_REQUEST).json({
      message: errorMessage,
      success: false,
    });
  }

  req.body = value;
  next();
};

const bulkCreateWordSchema = Joi.object({
  words: Joi.array()
    .items(Joi.string().trim().min(2))
    .min(1)
    .required()
    .messages({
      "array.base": `Words must be an array of strings`,
      "array.min": `Words must contain at least one word`,
      "any.required": `Words is required`,
      "string.base": `Each word must be a string`,
      "string.empty": `Words cannot be empty strings`,
    }),
});

export const bulkCreateWordValidator = (req, res, next) => {
  const { value, error } = bulkCreateWordSchema.validate(req.body, {
    allowUnknown: true,
    errors: { wrap: { label: "" } },
  });

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(httpStatus.BAD_REQUEST).json({
      message: errorMessage,
      success: false,
    });
  }

  req.body = value;
  next();
};
