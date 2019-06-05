
module.exports = (app, isLoggedIn, isAdmin) => {
  // Gets timesheets info for a user
  app.get('/api/admin/timesheets/', isLoggedIn, isAdmin, (req, res) => {
    res.send({ response: 'success' });
  });
  // *WIP* Gets Timesheets for individual user
  app.get('api/admin/timesheets/user/:userId', isLoggedIn, isAdmin, (req, res) => {
    res.send({ response: 'success' });
  });
  // *WIP* Edits Timesheet of user;
  // Needs to update WhenIWork and Database
  app.post('api/admin/timesheets/edit/:userId', isLoggedIn, isAdmin, (req, res) => {
    res.send({ response: 'success' });
  });
};
