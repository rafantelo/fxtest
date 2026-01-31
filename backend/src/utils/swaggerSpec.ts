export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: "FXTest API",
    version: '1.0.0',
    description: "Simple API docs for the FXTest backend",
  },
  servers: [{ url: `${process.env.BASE_URL || 'http://localhost'}:${process.env.PORT || 3000}` }],
  components: {
    schemas: {
      Trade: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          pair: { type: 'string' },
          side: { type: 'string' },
          price: { type: 'number' },
          type: { type: 'string' },
          status: { type: 'string' },
        },
      },
    },
  },
  paths: {
    '/trade_orders': {
      get: {
        summary: 'Get all trade orders',
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer' } },
          { name: 'limit', in: 'query', schema: { type: 'integer' } },
          { name: 'side', in: 'query', schema: { type: 'string' } },
          { name: 'type', in: 'query', schema: { type: 'string' } },
        ],
        responses: {
          '200': {
            description: 'List of trades',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Trade' } } } },
          },
        },
      },
      post: {
        summary: 'Create a trade order',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Trade' } } },
        },
        responses: { '201': { description: 'Created' } },
      },
    },
  },
};