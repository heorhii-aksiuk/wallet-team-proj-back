const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Category name is required."],
    },
    income: {
      type: Boolean,
      required: [true, "Category income is required."],
      default: false,
    },
    color: {
      type: String,
      trim: true,
      required: [true, "Category color is required."],
      default: "#009688",
    },
    icon: {
      type: String,
      trim: true,
      required: [true, "Category icon is required."],
      default: "pig-icon",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
  },
);

const Category = model("category", categorySchema);

module.exports = Category;