const net = require('net');

const PROJECTS = [
  {
    name: 'SQ Auto Detailing',
    domain: 'sqautodetailing.xyz',
    description: 'Automotive detailing website built for a real business.',
    url: 'https://sqautodetailing.xyz'
  },
  {
    name: 'Peylo',
    domain: 'peylo.xyz',
    description: 'Learning platform for financial literacy.',
    url: 'https://peylo.xyz'
  },
  {
    name: 'DocGress',
    domain: 'docgress.evaanchowdhry.site',
    description: 'Google Docs progress tracking tool.',
    url: 'https://docgress.evaanchowdhry.site'
  },
  {
    name: 'JEC Hacks',
    domain: 'jechacks.com',
    description: 'Hackathon website for JEC Hacks.',
    url: 'https://jechacks.com'
  }
];

function getStatus(responseTimeMs) {
  if (responseTimeMs == null) return 'down';
  if (responseTimeMs > 1500) return 'degraded';
  return 'up';
}

function pingHost(project) {
  const startedAt = Date.now();
  const { hostname, protocol, port } = new URL(project.url);
  const targetPort = port ? Number(port) : protocol === 'http:' ? 80 : 443;

  return new Promise(resolve => {
    const socket = new net.Socket();
    let settled = false;

    function finish(payload) {
      if (settled) return;
      settled = true;
      socket.destroy();
      resolve(payload);
    }

    socket.setTimeout(5000);

    socket.once('connect', () => {
      const responseTimeMs = Date.now() - startedAt;
      finish({
        ...project,
        statusCode: null,
        responseTimeMs,
        signal: `Connected to ${hostname}:${targetPort}`,
        status: getStatus(responseTimeMs)
      });
    });

    socket.once('timeout', () => {
      finish({
        ...project,
        statusCode: null,
        responseTimeMs: null,
        signal: `Connection to ${hostname}:${targetPort} timed out.`,
        status: 'down'
      });
    });

    socket.once('error', error => {
      finish({
        ...project,
        statusCode: null,
        responseTimeMs: null,
        signal: `Connection failed: ${error.code || 'unknown error'}.`,
        status: 'down'
      });
    });

    socket.connect(targetPort, hostname);
  });
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');

  const projects = await Promise.all(PROJECTS.map(pingHost));

  const counts = projects.reduce((accumulator, project) => {
    accumulator[project.status] += 1;
    return accumulator;
  }, { up: 0, degraded: 0, down: 0 });

  res.status(200).json({
    checkedAt: new Date().toISOString(),
    counts,
    projects
  });
};
