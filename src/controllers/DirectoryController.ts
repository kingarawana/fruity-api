import { Request, Response } from 'express';
import { getDirectoryServiceSingleton } from '../services/DirectoryService';

export const handleCommand = (req: Request, res: Response) => {
  const directoryService = getDirectoryServiceSingleton();
  const { command } = req.body;
  const [operation, ...args] = command.split(' ');

  let result = '';
  switch (operation) {
    case 'CREATE':
      result = directoryService.create(args[0]);
      break;
    case 'MOVE':
      result = directoryService.move(args[0], args[1]);
      break;
    case 'DELETE':
      result = directoryService.delete(args[0]);
      break;
    case 'LIST':
      result = directoryService.list();
      break;
    default:
      result = `Invalid command: ${command}`;
  }
  res.send(result);
};
