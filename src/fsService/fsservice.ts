import path from "node:path";
import * as fs from "node:fs/promises";
import {IUser} from "../interfaces/IUser";

const pathToUsers = path.join(process.cwd(), 'users.json')

class Fsservice {
    public async read(): Promise<IUser[]> {
        const data = await fs.readFile(pathToUsers, "utf-8")
        return data ? JSON.parse(data) : []
    }
    public async write(data: IUser[]) {
        await fs.writeFile(pathToUsers, JSON.stringify(data))
    }
}

export const fsService = new Fsservice()