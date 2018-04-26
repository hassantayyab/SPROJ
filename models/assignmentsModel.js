const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a Schema and a Model
const AssignmentsSchema = new Schema({
  id: Number,
  data: [
    {
      imp: Number,
      num: String,
      assignments: Array
    }
  ]
});

const AssignmentsDB = mongoose.model('assignmentsdb', AssignmentsSchema);

module.exports = AssignmentsDB;
