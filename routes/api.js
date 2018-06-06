const express = require('express');
const router = express.Router();
const CommentsDB = require('../models/comments');
const AnswerDB = require('../models/answer');
const CoursesDB = require('../models/coursesModel');
const AssignmentsDB = require('../models/assignmentsModel');
const PythonShell = require('python-shell');
var pyshell = new PythonShell('test.py');

// get all comments list
router.get('/ninjas/:n', (req, res, next) => {
  console.log('In router.get:', req.params.n);
  CommentsDB.find({ id: 1 }, { data: { '$elemMatch': { num: req.params.n } } })
    .then((data) => {
      data = data[data.length - 1].data[0];
      // console.log('COMMENTS:', data);
      res.send(data.comments);
    })
    .catch((err) => {
      console.log('ERROR IN API COMMENTS:', err);
    });
});

// get some courses list
router.get('/courses/:n', (req, res, next) => {
  // console.log('In router.get courses:', req.params.n);
  CoursesDB.find({ id: 1 }, { data: { '$elemMatch': { num: req.params.n } } })
    .then((data) => {
      // console.log('COURSES:', data);
      data = data[data.length - 1].data[0];
      // console.log('COURSES:', data);
      res.send(data);
    })
    .catch((err) => {
      console.log('ERROR IN API COURSES:', err);
    });
});

// get all courses list
router.get('/coursesAll', (req, res, next) => {
  // console.log('In router.get courses:', req.params.n);
  CoursesDB.find({ id: 1 })
    .then((data) => {
      // console.log('COURSES:', data);
      data = data[data.length - 1].data;
      // console.log('COURSES:', data);
      res.send(data);
    })
    .catch((err) => {
      console.log('ERROR IN API COURSES:', err);
    });
});

// get some assignments list
router.get('/assignments/:n/:imp', (req, res, next) => {
  console.log('In router.get assignments:', req.params);
  AssignmentsDB.find({ id: 1 }, { data: { '$elemMatch': { num: req.params.n, imp: Number(req.params.imp) } } })
    .then((data) => {
      // console.log('ASSIGNMENTS:', data);
      data = data[data.length - 1].data[0];
      // console.log('ASSIGNMENTS:', data);
      res.send(data);
    })
    .catch((err) => {
      console.log('ERROR IN API ASSIGNMENTS:', err);
    });
});

// get all assignments list
router.get('/assignmentsAll/:imp', (req, res, next) => {
  // console.log('In router.get assignments:', req.params.n);
  AssignmentsDB.find({ id: 1 }, { data: { '$elemMatch': { imp: req.params.imp } } })
    .then((data) => {
      // console.log('ASSIGNMENTS:', data);
      data = data[data.length - 1].data[0];
      // console.log('ASSIGNMENTS:', data);
      res.send(data);
    })
    .catch((err) => {
      console.log('ERROR IN API ASSIGNMENTS:', err);
    });
});

// add new course
router.post('/courses', (req, res, next) => {
  console.log('in Course router.post:',req.body);
  var item = {
    num: req.body.id,
    courses: req.body.course
  };

  if (req.body.c > 1) {
    console.log('In course update');
    CoursesDB.update(
      { 'data.num': item.num },
      { '$set': { 'data.$.courses': item.courses, 'data.$.num': item.num } }
    )
      .then((course) => {
        res.send(course);
      })
      .catch((err) => {
        console.log('ERROR in api course POST:', err);
      });
  } else {
    console.log('In course create');
    CoursesDB.update(
      { id: 1 },
      { $addToSet: { 'data': item } },
      { safe: true, upsert: true }
    )
      .then((course) => {
        res.send(course);
      })
      .catch((err) => {
        console.log('ERROR in course api POST:', err);
      });
    }
});

// add new comment
router.post('/ninjas', (req, res, next) => {
  // console.log('in router.post:',req.body);
  var item = {
    id: 1,
    num: req.body.id,
    size: req.body.com.length,
    comments: req.body.com
  };

  if (item.size > 1) {
    // console.log('In comment update');
    CommentsDB.update(
      { 'data.num': item.num },
      { '$set': { 'data.$.comments': item.comments, 'data.$.num': item.num } }
    )
      .then((comments) => {
        res.send(comments);
      })
      .catch((err) => {
        console.log('ERROR in api comment POST:', err);
      });
  } else {
    console.log('In comment create');
    CommentsDB.update(
      { id: 1 },
      { $addToSet: { 'data': item } },
      { safe: true, upsert: true }
    )
      .then((comments) => {
        res.send(comments);
      })
      .catch((err) => {
        console.log('ERROR in comment api POST:', err);
      });
  }
});

// add new assignment
router.post('/assignments', (req, res, next) => {
  console.log('in Assignment router.post:', req.body);
  var item = {
    num: req.body.id,
    imp: req.body.imp,
    assignments: req.body.assignment
  };

  if (req.body.c > 1) {
    console.log('In assignment update');
    AssignmentsDB.updateMany(
      { data: { $elemMatch: { imp: Number(item.imp), num: item.num} }},
      // { 'data.imp': Number(item.imp), 'data.num': item.num },
      { '$set': { 'data.$.assignments': item.assignments } },
      { safe: true, upsert: true }
    )
      .then((assignment) => {
        res.send(assignment);
      })
      .catch((err) => {
        console.log('ERROR in api assignment POST:', err);
      });
  } else {
    console.log('In assignment create');
    AssignmentsDB.update(
      { id: 1 },
      { $addToSet: { 'data': item } },
      { safe: true, upsert: true }
    )
      .then((assignment) => {
        res.send(assignment);
      })
      .catch((err) => {
        console.log('ERROR in assignment api POST:', err);
      });
  }
});

// update comments
router.put('/ninjas', (req, res, next) => {
  CommentsDB.update({ _id: req.params.id }, req.body).then(
    () => {
      CommentsDB.findOne({ _id: req.params.id }).then((comment) => {
        res.send(comment);
      });
    }
  );
});

// get answer
router.get('/answer/:n/:id', (req, res, next) => {
  //console.log('check',req.params.n);
  AnswerDB.find({ id: 1 }, { data: { '$elemMatch': { num: req.params.n } } })
    .then((data) => {
      data = data[data.length - 1].data[0];
      // console.log('ANSWER:', data);
      if (data) {
        res.send(data);
      }
    })
    .catch((err) => {
      console.log('ERROR IN API ANSWER:', err);
    });
});

// add new answer
router.post('/answer', (req, res, next) => {
  var item = {
    num: req.body.id,
    count: req.body.hiLiCount,
    answer: req.body.answer
  };
  console.log('item.count=',item.count)
  if (item.count >= 2) {
    console.log('In update');
    AnswerDB.update(
      { 'data.num': item.num },
      { '$set': { 'data.$.answer': item.answer, 'data.$.count': item.count } }
    )
      .then((answer) => {
        pyshell.send('hello');
        pyshell.on('message', (message) => {
          // received a message sent from the Python script (a simple "print" statement)
          console.log(message);
        });
        // end the input stream and allow the process to exit
        pyshell.end((err, code, signal) => {
          if (err) throw err;
          // console.log('The exit code was: ' + code);
          // console.log('The exit signal was: ' + signal);
          // console.log('finished');
          console.log('finished');
        });
        
        res.send(answer);
      })
      .catch((err) => {
        console.log('ERROR in api POST:', err);
      });
  } else {
    console.log('In create');
    AnswerDB.update(
      { id: 1 },
      { $addToSet: { 'data': item } },
      { safe: true, upsert: true }
    )
      .then((answer) => {
        res.send(answer);
      })
      .catch((err) => {
        console.log('ERROR in api POST:', err);
      });
  }
});

module.exports = router;
