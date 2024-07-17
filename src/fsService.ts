import path from "node:path";
import fs from "node:fs/promises"
import {IUser} from "./interfaces/IUser";


const pathToArray = path.join(process.cwd(), 'users.json')

class FsService {
    public async getAll(): Promise<IUser[]> {
        const data = await fs.readFile(pathToArray, "utf-8");
        return data ? JSON.parse(data) : []
    }

    public async write(data: IUser[]): Promise<void> {
        await fs.writeFile(pathToArray, JSON.stringify(data));
    }
}

export const fsService = new FsService()