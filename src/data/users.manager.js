import fs from "fs";
import crypto from "crypto";

class UsersManager {
  constructor(path) {
    this.path = path;
    this.exists();
  }
  exists() {
    const exist = fs.existsSync(this.path);
    if (!exist) {
      fs.writeFileSync(this.path, JSON.stringify([]));
      console.log("File has been created");
    } else {
      console.log("The file already exists");
    }
  }
  async readAll(category) {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const parseData = JSON.parse(data);
      if (category) {
        const filteredData = parseData.filter(
          (each) => each.category === category
        );
        return filteredData;
      } else {
        return parseData;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async read(id) {
    try {
      const all = await this.readAll();
      const one = all.find((each) => each.id === id);
      return one;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async create(data) {
    try {
      data.id = crypto.randomBytes(12).toString("hex");
      const all = await this.readAll();
      all.push(data);
      const stringAll = JSON.stringify(all, null, 2);
      await fs.promises.writeFile(this.path, stringAll);
      return data.id;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id, newData) {
    try {
      const all = await this.readAll();
      const index = all.findIndex((product) => product.id === id);
      if (index === -1) {
        return null;
      }
      all[index] = { ...all[index], ...newData };
      const stringAll = JSON.stringify(all, null, 2);
      await fs.promises.writeFile(this.path, stringAll);
      return all[index];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const all = await this.readAll();
      const filtered = all.filter((product) => product.id !== id);
      if (all.length === filtered.length) {
        return null
      }
      const stringAll = JSON.stringify(filtered, null, 2);
      await fs.promises.writeFile(this.path, stringAll);
      return `User with id ${id} has been deleted`;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

const usersManager = new UsersManager("./src/data/files/users.json");
export default usersManager;