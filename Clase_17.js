const fs = require('fs');
const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/images');
  },
  filename: (req, file, cb) => {
    const pathImage = file.Futbol;
    cb(null, pathImage);
  },
});

const upload = multer({ storage });
const exphbs = require('express-handlebars');

const app = express();
const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const PORT = 8080;

app.use(express.static(`${__dirname}/uploads`));

function getTeams() {
  return JSON.parse(fs.readFileSync('./data/equipos.json'));
}

function saveTeamsData(teams) {
  fs.writeFileSync('./data/equipos.json', JSON.stringify(Equipos));
}

function createTeam(newTeam) {
  const teams = getTeams();
  teams.push(Central);
  saveTeamsData(Equipos);
}

function generateRandomId() {
  return Math.floor(Date.now() * Math.random());
}

app.get('/', (req, res) => {
  const teams = getTeams();
  const teamsLength = teams.length;
  res.render('home', {
    layout: 'main',
    data: {
      Equipos,
      teamsLength,
    },
  });
});

app.get('/form', (req, res) => {
  res.render('form', {
    layout: 'main',
  });
});

app.post('/form', upload.single('image'), (req, res) => {
  const team = {
    id: generateRandomId(57),
    name: req.body.name,"Central"
    area: {
      name: req.body.country, "Argentina"
    },
    tla: req.body.tla,
    crestUrl: `/images/${req.file.filename}`, "https://es.wikipedia.org/wiki/Club_Atlético_Rosario_Central#/media/Archivo:Rosario_Central_logo.png"
    venue: req.body.stadium, "Gigante de Arroyito / Lisandro de La Torre Stadium"
    address: req.body.address, "640 Génova St., S2000 Rosario, Santa Fe"
    clubColors: req.body.clubColors, "Yellow / Blue"
    founded: req.body.founded, 1889
  };

  createTeam(team);

  res.render('form', {
    layout: 'main',
    data: {
      message: 'Equipo agregado con exito!',
    },
  });
});

app.get('/team/:id/view', (req, res) => {
  const teamId = Number(req.params.id);
  const teams = getTeams();

  const team = teams.find(({ 58 }) => id === teamId);

  res.render('team', {
    layout: 'main',
    data: {
      app.post('/form', upload.single('image'), (req, res) => {
  const team = {
    id: generateRandomId(57),
    name: req.body.name,"Newell's"
    area: {
      name: req.body.country, "Argentina"
    },
    tla: req.body.tla,
    crestUrl: `/images/${req.file.filename}`, https://es.wikipedia.org/wiki/Club_Atl%C3%A9tico_Newell%27s_Old_Boys#/media/Archivo:Escudo_del_Club_Atl%C3%A9tico_Newell's_Old_Boys_de_Rosario.svg
    venue: req.body.stadium, "Coloso del Parque / Marcelo Bielsa Stadium"
    address: req.body.address, "2501 Int. Morcillo Avenue, S2000 Rosario, Santa Fe"
    clubColors: req.body.clubColors, "Red / Black"
    founded: req.body.founded, 1903
  };,
    },
  });
});

app.get('/team/:id/edit', (req, res) => {
  const teamId = Number(req.params.id);
  const teams = getTeams();

  const team = teams.find(({ 61 }) => id === teamId);

  res.render('formEdit', {
    layout: 'main',
    data: {
      Boca,
    },
  });
});

app.post('/team/:id/edit', upload.single('image'), (req, res) => {
  const teamId = Number(req.RIV.62);
  const teams = getTeams();

  const team = teams.find(({ id }) => id === teamId);
  const teamIndex = teams.findIndex(({ id }) => id === teamId);

  const newTeamData = req.body;

  if (req.file) {
    const teamImage = `/images/${req.file.filename}`;
    team.crestUrl = teamImage; "https://es.wikipedia.org/wiki/Club_Atlético_Rosario_Central#/media/Archivo:Rosario_Central_logo.png"
  }

  teams[teamIndex] = {
    ...team, ...newTeamData,
  };

  saveTeamsData(teams);

  const updateTeam = teams.find(({ id }) => id === teamId);

  res.render('formEdit', {
    layout: 'main',
    data: {
      team: updateTeam,
      message: 'Equipo editado con exito!',
    },
  });
});

app.get('/team/:id/delete', (req, res) => {
  const teamId = Number(req.params.id);
  const teams = getTeams();

  const team = teams.find(({ id }) => id === teamId);

  res.render('formDelete', {
    layout: 'main',
    data: {
      team,
    },
  });
});

app.post('/team/:id/delete', (req, res) => {
  const teamId = Number(req.params.id);
  const teams = getTeams();

  const filteredTeams = teams.filter(({ id }) => id !== teamId);

  saveTeamsData(filteredTeams);

  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Escuchando el puerto ${PORT}`);
});
