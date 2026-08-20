export default {
  async fetch(request, env, ctx) {
    // Разбираем URL запроса
    const url = new URL(request.url);

    // Проверяем путь и метод
    if (url.pathname === '/health' && request.method === 'GET') {
      // Формируем ответ
      const timestamp = Date.now(); 

      const responseBody = {
        ok: true,
        timestamp: timestamp
      };

      return new Response(JSON.stringify(responseBody), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      });
    }

    // Если путь не /health — возвращаем 404
    return new Response('404 Not Found', { status: 404 });
  }
};
