import bcrypt from "bcrypt"


class PasswordService {
    public async hash(password: string): Promise<string> {
        return bcrypt.hash(password, 2)
    }
}

export const passwordService = new PasswordService()