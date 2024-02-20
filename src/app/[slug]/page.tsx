"use client";
import React, { useEffect } from "react";
import redirect from "next/navigation";

import { UserAgentDetector, ClientIpFetcher } from "@/lib/clientInfoGrabber";

interface IParams {
  slug: string;
}

interface IFetchData {
  url: string;
}
class Redirector {
  params: IParams;

  constructor(params: IParams) {
    this.params = params;
  }

  async redirectToMatchedUrl(): Promise<void> {
    const userAgent = UserAgentDetector.detect();
    const ip = await ClientIpFetcher.fetch();
    const { slug } = this.params;
    const referrer = document.referrer;

    try {
      const data = await this.fetchData(slug, ip, referrer, userAgent.browser, userAgent.device);
      window.location.assign(data.url);
    } catch (error) {
      console.error("Redirect Error:", error);
      window.location.assign("/");
    }
  }

  private async fetchData(slug: string, ip: string, referrer: string, browser: string, device: string): Promise<IFetchData> {
    const response = await fetch(
      `/api/match-url?slug=${slug}&ip=${ip}&source=${referrer}&browser=${browser}&device=${device}`
    );
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
  }
}

export default function Redirect({ params }: { params: IParams }) {
  useEffect(() => {
    const redirector = new Redirector(params);
    redirector.redirectToMatchedUrl();
  }, [params.slug]);

  return (
    <div></div>
  );
}
