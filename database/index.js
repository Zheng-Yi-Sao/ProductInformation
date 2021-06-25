const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Information', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error Connecting Database'));
db.once('open', function() {
  console.log('Database Connected');
});

const fakeSchema = new mongoose.Schema({
  productId: {
    type: String,
    unique: true
  },
  aspectRatio: String,
  rating: String,
  dimensions: String,
  format: String,
  runTime: String,
  releaseDate: Date,
  cast: Array,
  studio: String,
  numberOfDisks: Number,
});


const Information = mongoose.model('Information', fakeSchema);

const returnData = (id) => {
  return Information.findOne({productId: id}).exec();
};

const countEntries = () => {
  return Information.countDocuments().exec();
};

const saveEntry = (record) => {
  let newRecord = new Information(record);
  return newRecord.save();
};


module.exports = {
  returnData,
  countEntries,
  saveEntry,
  Information
};
