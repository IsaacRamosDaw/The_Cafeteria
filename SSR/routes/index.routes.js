module.exports = (app) => {
  app.get('/', (req, res) => res.render('../views/welcome/welcome.ejs'));

  app.get('/admin', (req, res) => res.render('../views/admins.views/home.ejs'));
};