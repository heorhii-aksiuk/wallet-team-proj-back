const { Schema, model } = require('mongoose');
const Categories = require('../helpers/categories');

const categoriesNames = Categories.map(category => category.name);

const transactionSchema = new Schema(
  {
    date: {
      type: Date,
      required: [true, 'Date is required.']
    },
    income: {
      type: Boolean,
      required: [true, 'Income type is required.'],
      default: false
    },
    category: {
      type: String,
      trim: true,
      required: [true, 'Category is required.'],
      enum: categoriesNames,
      default: 'Основные расходы'
    },
    comment: { type: String, trim: true, default: '' },
    sum: {
      type: Number,
      min: 0,
      required: [true, 'Sum is required.']
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user'
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
      }
    }
  }
);

const Transaction = model('transaction', transactionSchema);

module.exports = Transaction;