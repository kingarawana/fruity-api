import Directory from '../models/Directory';

class DirectoryService {
  private root = new Directory('root');

  /**
   * Recursively creates the path starting from the
   * "front" of the path all the way down
   * @param path - A path string e.g. "fruits/apples/fuji"
   */
  create(path: string): string {
    const parts = path.split('/');
    let current = this.root;

    for (const part of parts) {
      if (!current) throw new Error(`Cannot create ${path} - path does not exist`);
      if (!current.children.has(part)) {
        current = current.create(part);
      } else {
        current = current.children.get(part) as Directory;
      }
    }
    return `CREATE ${path}`;
  }

  /**
   * Deletes the final directory/path key
   * e.g. if path = "fruits/apples/fuji"
   * it'll delete fuji
   * outcome = "fruits/apples"
   *
   * @param path - path to delete. It will only delete the final path part.
   */
  delete(path: string): string {
    const parts = path.split('/');
    const name = parts.pop() as string; // get the parent name of the final leaf directory
    const parentDir = this.getDir(parts.join('/'));
    if (parentDir) {
      // delete the leaf directory from the parent.
      parentDir.delete(name);
      return `DELETE ${path}`;
    } else {
      // there are two cases here, either the child doesn't exist or the parent
      return `Cannot delete ${path} - ${parts[parts.length - 1] || name} does not exist`;
    }
  }

  /**
   * Moves the final path key from the `source` path to the `destination` path
   * e.g.
   * source = "fruits/apples/fuji"
   * destination = "grains/squash"
   * outcome = "grains/squash/fuji"
   *
   * @param source
   * @param destination
   */
  move(source: string, destination: string): string {
    const sourceParts = source.split('/');
    const sourceName = sourceParts.pop() as string;
    const sourceParentDir = this.getDir(sourceParts.join('/')) || this.root;
    const destDir = this.getDir(destination) || this.root;

    if (sourceParentDir && destDir) {
      const sourceDir = sourceParentDir.children.get(sourceName);
      if (!sourceDir) return `Cannot move ${source} - does not exist`;

      sourceParentDir.move(sourceName, destDir);
      return `MOVE ${source} ${destination}`;
    } else {
      return `Cannot move ${source} to ${destination} - path does not exist`;
    }
  }

  /**
   * Returns a formatted string displaying the directory structure.
   */
  list(): string {
    /**
     * this.root.list() will return a list of strings with the indents
     * already accounted for.
     *
     * Note: calling slice(1) to remove the first obj since it's the
     * root obj.
     */
    return `LIST\n${this.root.list().join('\n')}`;
  }

  /**
   * In real life usually data is not stored in memory, it would be stored
   * in a database or some external database. Usually in the tests, there
   * would be an ORM that provides a delete method to clear a specific
   * table. Since this is all in memory, I added this so that my tests
   * can reset the data so that every test runs independently.
   */
  resetData(): void {
    this.root = new Directory('root');
  }

  /**
   * Gets the final leaf nodes in the given `path`
   * @param path - Directory path. e.g. `/grains/squash` will return the squash directory
   * @private
   */
  private getDir(path: string): Directory | null {
    const parts = path.split('/');
    let current = this.root;

    for (const part of parts) {
      current = current.children.get(part) as Directory;
      if (!current) return null;
    }
    return current;
  }
}

let directoryService: DirectoryService;

export const getDirectoryServiceSingleton = () => {
  if (!directoryService) {
    directoryService = new DirectoryService();
  }
  return directoryService;
};
