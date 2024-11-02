import request from 'supertest';
import app from '../../app';
import { getDirectoryServiceSingleton } from '../../services/DirectoryService';

describe('Directory API Integration Tests', () => {
  const directoryService = getDirectoryServiceSingleton();

  beforeEach(() => {
    directoryService.resetData();
  });

  describe('CREATE & LIST', () => {
    it('should create directories and list them', async () => {
      // Test CREATE commands
      let response = await request(app).post('/command').send({ command: 'CREATE fruits' });
      expect(response.text).toBe('CREATE fruits');

      response = await request(app).post('/command').send({ command: 'CREATE vegetables' });
      expect(response.text).toBe('CREATE vegetables');

      response = await request(app).post('/command').send({ command: 'CREATE grains' });
      expect(response.text).toBe('CREATE grains');

      response = await request(app).post('/command').send({ command: 'CREATE fruits/apples' });
      expect(response.text).toBe('CREATE fruits/apples');

      response = await request(app).post('/command').send({ command: 'CREATE fruits/apples/fuji' });
      expect(response.text).toBe('CREATE fruits/apples/fuji');

      // Test LIST command and check output
      response = await request(app).post('/command').send({ command: 'LIST' });
      expect(response.text).toBe(`LIST\nfruits\n  apples\n    fuji\nvegetables\ngrains`);
    });
  });

  describe('MOVE command tests', () => {
    it('should be able to move root level directories', async () => {
      let response = await request(app).post('/command').send({ command: 'CREATE grains' });
      expect(response.text).toBe('CREATE grains');

      response = await request(app).post('/command').send({ command: 'CREATE grains/squash' });
      expect(response.text).toBe('CREATE grains/squash');

      response = await request(app).post('/command').send({ command: 'CREATE foods' });
      expect(response.text).toBe('CREATE foods');

      response = await request(app).post('/command').send({ command: 'MOVE grains foods' });
      expect(response.text).toBe('MOVE grains foods');

      response = await request(app).post('/command').send({ command: 'LIST' });
      expect(response.text).toBe(`LIST\nfoods\n  grains\n    squash`);
    });

    it('should be able to move one child to another directory', async () => {
      let response = await request(app).post('/command').send({ command: 'CREATE grains' });
      expect(response.text).toBe('CREATE grains');

      response = await request(app).post('/command').send({ command: 'CREATE grains/squash' });
      expect(response.text).toBe('CREATE grains/squash');

      response = await request(app).post('/command').send({ command: 'CREATE foods' });
      expect(response.text).toBe('CREATE foods');

      response = await request(app).post('/command').send({ command: 'MOVE grains/squash foods' });
      expect(response.text).toBe('MOVE grains/squash foods');

      response = await request(app).post('/command').send({ command: 'LIST' });
      expect(response.text).toBe(`LIST\ngrains\nfoods\n  squash`);
    });
  });

  describe('DELETE command tests', () => {
    it('should return error message when deleting a child does not exist', async () => {
      const response = await request(app)
        .post('/command')
        .send({ command: 'DELETE fruits/apples' });
      expect(response.text).toBe('Cannot delete fruits/apples - fruits does not exist');
    });

    it('should return error message when deleting a root does not exist', async () => {
      const response = await request(app).post('/command').send({ command: 'DELETE foods' });
      expect(response.text).toBe('Cannot delete foods - foods does not exist');
    });
  });
});
