/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

/** Boards */

/** TaskLists */

server.get('/taskLists', (req, res) => {
  const boardID = req.query.boardID;

  const taskLists = boardID
    ? router.db.get('taskLists').filter({ boardID }).value()
    : router.db.get('taskLists').value();

  const tasks = router.db
    .get('tasks')
    .filter((task) => taskLists.some((t) => t.id === task.taskListId))
    .value();

  taskLists.forEach((taskList) => {
    taskList.tasks = tasks.filter((task) => task.taskListId === taskList.id);
  });

  res.json(taskLists);
});

/** Tasks */

/** All */

server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
    req.body.updatedAt = Date.now();
    req.body.id = Math.random().toString(36).substring(2, 15);
  }

  if (req.method === 'PUT' || req.method === 'PATCH') {
    req.body.updatedAt = Date.now();
  }

  next();
});

server.use(router);
server.listen(4000, () => {
  console.log('JSON Server is running');
});
