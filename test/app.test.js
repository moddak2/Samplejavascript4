const request = require('supertest');
const { createApp } = require('../src/app');

const app = createApp({ enableRateLimit: false });

describe('Samplejavascript4 secure training app', () => {
  test('GET /health', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });

  test('GET /api/people returns mock people', async () => {
    const res = await request(app).get('/api/people');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);

    // helmet should add security headers (one quick spot-check)
    expect(res.headers).toHaveProperty('content-security-policy');
  });

  test('GET /api/labs returns mixed posture inventory', async () => {
    const res = await request(app).get('/api/labs');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    const ids = res.body.data.map((x) => x.id);
    expect(ids).toContain('xss-output-escaping');
    expect(ids).toContain('broken-access-control');
  });

  test('POST /api/preview escapes HTML (XSS mitigation)', async () => {
    const payload = { text: '<img src=x onerror=alert(1) />' };
    const res = await request(app)
      .post('/api/preview')
      .send(payload)
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/text\/html/);
    expect(res.text).toContain('&lt;img');
    expect(res.text).not.toContain('<img');
  });

  test('GET /api/people/:id validates params', async () => {
    const res = await request(app).get('/api/people/' + 'x'.repeat(1000));
    expect(res.status).toBe(400);
  });
});
