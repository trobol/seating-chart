
module.exports = (app, isLoggedIn, isAdmin) => {
  // Gets All Project Info
  app.get('/api/admin/projects/', isAdmin, (req, res) => {
    console.log({ req, res });
    console.log('In final callback');
    res.send({ response: 'success' });
  });
  // Gets Specific Project Info
  app.get('/api/admin/projects/:projectId', isLoggedIn, isAdmin, (req, res) => {
    res.send({ response: 'success' });
  });
  // Posts new project
  app.post('/api/admin/projects/', isLoggedIn, isAdmin, (req, res) => {
    res.send({ response: 'success' });
  });
  // Deletes a project
  app.post('api/admin/projects/:projectId', isLoggedIn, isAdmin, (req, res) => {
    res.send({ response: 'success' });
  });
};
