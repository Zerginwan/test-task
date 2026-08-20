// server.js - обертка для работы index.js в докере
import http from 'http';
import worker from './index.js';  // импортируем CF-скрипт

const PORT = process.env.PORT || 8080;

const server = http.createServer(async (req, res) => {
  try {
    // Собираем тело запроса (если есть)
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const body = Buffer.concat(chunks);

    // Формируем стандартный объект Request
    const request = new Request(`http://${req.headers.host}${req.url}`, {
      method: req.method,
      headers: req.headers,
      body: body.length ? body : undefined,
    });

    // Вызываем метод fetch из импортированного worker
    const response = await worker.fetch(request);

    // Отправляем ответ клиенту
    res.writeHead(response.status, Object.fromEntries(response.headers));
    const responseBody = await response.text();
    res.end(responseBody);
  } catch (err) {
    console.error(err);
    res.writeHead(500);
    res.end('Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`Test-Task API is running on port ${PORT}`);
});
