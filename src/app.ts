import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import { handleCommand } from './controllers/DirectoryController';

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /command:
 *   post:
 *     summary: Execute a directory command
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               command:
 *                 type: JSON
 *                 description: The command to execute (e.g., CREATE, MOVE, DELETE)
 *           examples:
 *               example1:
 *                 summary: Create command
 *                 value:
 *                   command: "CREATE fruits"
 *               example2:
 *                 summary: Move command
 *                 value:
 *                   command: "MOVE fruits vegetables"
 *               example3:
 *                 summary: Delete command
 *                 value:
 *                   command: "DELETE fruits/apples"
 *     responses:
 *       200:
 *         description: Command executed successfully
 */
app.post('/command', handleCommand);

export default app;
