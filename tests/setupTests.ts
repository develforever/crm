
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw'

export const handlers = [
  
]

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// server.events.on('request:start', ({ request }) => {
//   console.log('Outgoing:', request.method, request.url)
// })

export { server };