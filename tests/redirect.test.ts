import { UserAgentDetector, ClientIpFetcher } from "@/lib/clientInfoGrabber";

it('should handle network errors, and return "unknown" as a string', async () => {
        jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network Error'));
        const ip = await ClientIpFetcher.fetch();
        expect(ip).toBe('unknown');
      });

