interface IUserAgent {
  browser: string;
  device: string;
}


// Abstracts the logic to detect the user agent
export class UserAgentDetector {
  static detect(): IUserAgent {
    const userAgent = window.navigator.userAgent;
    return {
      browser: this.detectBrowser(userAgent),
      device: this.detectDevice(userAgent),
    };
  }

  static detectBrowser(userAgent: string): string {
    const browsers = [
      { name: "Firefox", rule: /Firefox/ },
      { name: "Samsung Browser", rule: /SamsungBrowser/ },
      { name: "Opera", rule: /(Opera|OPR)/ },
      { name: "Internet Explorer", rule: /Trident/ },
      { name: "Edge", rule: /Edge/ },
      { name: "Chrome", rule: /Chrome/ },
      { name: "Safari", rule: /Safari/ },
    ];

    const defaultBrowser = "Unknown Browser";
    return (
      browsers.find((browser) => browser.rule.test(userAgent))?.name ||
      defaultBrowser
    );
  }

   static detectDevice(userAgent: string): string {
    const devices = [
      { name: "iPhone", rule: /iPhone/ },
      { name: "iPad", rule: /iPad/ },
      { name: "Linux/MacOS", rule: /Linux|Macintosh/ },
      { name: "Android", rule: /Android/ },
      { name: "Windows PC", rule: /Windows/ },
    ];

    const defaultDevice = "Unknown Device";
    return (
      devices.find((device) => device.rule.test(userAgent))?.name ||
      defaultDevice
    );
  }
}

// Encapsulates the logic to fetch the client's IP
export class ClientIpFetcher {
  static async fetch(): Promise<string> {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data: { ip: string } = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Error getting IP:", error);
      return "unknown";
    }
  }
}
