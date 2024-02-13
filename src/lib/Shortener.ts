export class Shortener {
  static readonly BASE62: string =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  static shorten(url: string) {
    const base62URL = this.encodeBase62(this.hashURL(url));
    const shortenedURL = base62URL.slice(0, 7);
    return shortenedURL;
  }

  protected static hashURL(url: string) {
    const crypto = require("crypto");
    // Creates a Sha256 Hash from the given URL
    const hash = crypto.createHash("sha256");
    hash.update(url);
    return hash.digest("hex");
  }

  protected static encodeBase62(url: string) {
    const baseX = require("base-x")(this.BASE62);
    return baseX.encode(Buffer.from(url, "hex")); // Convert Hashed String to base62 encoding
  }

}
