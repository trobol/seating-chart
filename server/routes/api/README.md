# API

This is the API for the seating chart.

## Common Mistakes

When writing/edit an api request. It is imoprtant to note that `res.send` should only be called once or wrapped within conditional statements so that it doesn't get called twice.

###### Good Example
```javascript
app.post('/api/admin/projects/', isLoggedIn, isAdmin, (req, res) => {
    const uSql = 'INSERT INTO `projects`(`project`) VALUES (?)';
    const { project } = req.body;
    const sql = mysql.format(uSql, [project]);
    app.pool.query(sql, (error, results, fields) => {
      if (error) { res.send({ response: error }); } else {
        res.send({ response: { results, fields } });
      }
    });
  });
```

In this example, the `res.send` are seperated by a conditional statement which means that there will never be called on the same request.

###### Bad Example
```javascript
app.post('/api/admin/projects/', isLoggedIn, isAdmin, (req, res) => {
    const uSql = 'INSERT INTO `projects`(`project`) VALUES (?)';
    const { project } = req.body;
    const sql = mysql.format(uSql, [project]);
    app.pool.query(sql, (error, results, fields) => {
      if (error) res.send({ response: error });
      res.send({ response: { results, fields } });
    });
  });
```

This is example may look logically the same as the last example but there is one key difference. If there is an error in the sql database then `res` will first send the error and then the code below it will execute causing the server to crash.