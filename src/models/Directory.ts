/**
 * If you visualize a directory from the top down, it essentially
 * represents a tree structure where each node can have n child
 * nodes. Because of that I decided to implement Directory to
 * essentially be a tree data structure.
 */

class Directory {
  public children: Map<string, Directory> = new Map();

  /**
   * Note: It might not be obvious but in typescript, we can define the class
   * properties without having to define the property and set the property in
   * the constructor.
   */
  constructor(public name: string) {}

  /**
   * Creates a new subdirectory
   *
   * @param subDirName - name of sub-directory
   */
  create(subDirName: string): Directory {
    // if the sub directory already exists, do nothing
    if (!this.children.has(subDirName)) {
      const newDirectory = new Directory(subDirName);
      this.children.set(subDirName, newDirectory);
      return newDirectory;
    }
    throw new Error(`Directory ${subDirName} already exists`);
  }

  /**
   * Deletes a subdirectory
   *
   * @param subDirName - Name of sub-directory to delete
   */
  delete(subDirName: string): void {
    if (!this.children.delete(subDirName)) {
      throw new Error(`Cannot delete ${subDirName} - does not exist`);
    }
  }

  /**
   * Moves a subdirectory from the current directory
   * and adds it as a child of the targetDirectory
   *
   * @param subDirName - sub-directory name of the current directory
   * @param targetDirectory = the directory to add the subDirName name to
   */
  move(subDirName: string, targetDirectory: Directory): void {
    const subDir = this.children.get(subDirName);
    if (!subDir) throw new Error(`Cannot move ${subDirName} - does not exist`);

    targetDirectory.addDirectory(subDir);
    this.children.delete(subDirName);
  }

  // Adds an existing directory (used in move)
  addDirectory(directory: Directory): void {
    if (this.children.has(directory.name)) {
      throw new Error(`Cannot add directory ${directory.name} - already exists`);
    }
    this.children.set(directory.name, directory);
  }

  /**
   * This fn is a bit more abstract, it's essentially a recursive process, each
   * directory calls `list` on the sub-directory and adds the child's directories
   * to the parent, which comes all the way back up and adds all the results to
   * the root `result`
   * @param depth - this value is used to indent the sub-directory names correctly
   */
  list(depth = 0): string[] {
    let result: string[] = [];
    if (depth > 0) {
      result = [`${'  '.repeat(depth - 1)}${this.name}`];
    }

    for (const subDir of this.children.values()) {
      // increment by 1 to indent the lower level
      result.push(...subDir.list(depth + 1));
    }
    return result;
  }
}

export default Directory;
