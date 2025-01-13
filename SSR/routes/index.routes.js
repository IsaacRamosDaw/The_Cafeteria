module.exports = (app) => {
  app.get('/', (req, res) => res.render('welcome'));

  app.get('/admin', (req, res) => res.render('admins.views/home.admin.ejs'));
};