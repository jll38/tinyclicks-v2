import { LinkValidator } from "@/lib/validator";

test("Validation for URLs", () => {
    expect(LinkValidator.validate("https://example.com")).toBeTruthy()
    expect(LinkValidator.validate("http://example.com")).toBeTruthy()
    expect(LinkValidator.validate("ht://example.com")).toBeFalsy()
    expect(LinkValidator.validate("http://example")).toBeFalsy()
});


