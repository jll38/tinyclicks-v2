import { Shortener } from "@/lib/Shortener";

test("Shortener should create a consistent 7 character long string", () => {
  expect(Shortener.shorten("http://example.com")).toBe("V7KF2Kl");
});
