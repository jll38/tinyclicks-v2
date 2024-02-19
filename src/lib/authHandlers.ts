export class Hasher {
  static async hashPassword(password: string, salt?: any): Promise<string> {
    if (!salt) salt = await this.generateSalt();
    const bcrypt = require("bcrypt");

    return await bcrypt.hash(password, salt);
  }

  static async generateSalt(): Promise<string> {
    const bcrypt = require("bcrypt");
    const saltRounds = 10;
    return await bcrypt.genSalt(saltRounds);
  }
}
