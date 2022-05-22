const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Categories = require("../helpers/categories");

const categoriesNames = Categories.map((category) => category.name);

const transactionSchema = new Schema(
  {
    date: {
      type: String,
      required: [true, "Date is required."],
    },
    income: {
      type: Boolean,
      required: [true, "Income type is required."],
      default: false,
    },
    category: {
      type: String,
      trim: true,
      required: [true, "Category is required."],
      enum: categoriesNames,
      default: "Основные расходы",
    },
    comment: {
      type: String,
      trim: true,
      maxLength: 160,
      default: "",
    },
    sum: {
      type: Number,
      min: 0,
      required: [true, "Sum is required."],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    balance: {
      type: String,
      required: [true, "Balance is required."],
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
  }
);

transactionSchema.plugin(mongoosePaginate);

const Transaction = model("transaction", transactionSchema);

module.exports = Transaction;
