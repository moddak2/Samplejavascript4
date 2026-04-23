const { app } = require('./app');

const DEFAULT_PORT = 3000;

function parsePort(argv) {
  const idx = argv.indexOf('--port');
  if (idx === -1) return DEFAULT_PORT;
  const value = argv[idx + 1];
  const port = Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65535) return DEFAULT_PORT;
  return port;
}

const port = parsePort(process.argv);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
