import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'The Fruity API',
      version: '1.0.0',
      description:
        'API documentation for the fruity-api. This API allows clients to call this API to create file system. At the moment' +
        'it only allows you to create folders, move folders, and delete folders',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Replace with your server URL
      },
    ],
  },
  apis: ['./src/app.ts'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
