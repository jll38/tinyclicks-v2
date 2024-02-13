abstract class Validator {
  static validate(value: any): boolean {
    return false;
  }
}
export class AliasValidator extends Validator {
  static validate(alias: string) {
    const pattern = /^[a-zA-Z0-9-]+$/;
    return pattern.test(alias);
  }
}

export class LinkValidator extends Validator {
  static validate(link: string): boolean {
    try {
      const newUrl = new URL(link);
      return (
        (this.hasTopLevelDomain(newUrl.hostname) &&
          newUrl.protocol === "http:") ||
        newUrl.protocol === "https:"
      );
    } catch (err) {
      return false;
    }
  }

  private static hasTopLevelDomain(link: string): boolean {
    return /\.[a-z]{2,}$/i.test(link);
  }
}
