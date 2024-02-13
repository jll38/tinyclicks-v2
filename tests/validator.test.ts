import { LinkValidator, AliasValidator } from "@/lib/validator";

test("Validation for URLs", () => {
    expect(LinkValidator.validate("https://example.com")).toBeTruthy()
    expect(LinkValidator.validate("http://example.com")).toBeTruthy()
    expect(LinkValidator.validate("ht://example.com")).toBeFalsy()
    expect(LinkValidator.validate("http://example")).toBeFalsy()
});

test("Validation for Aliases", () => {
    expect(AliasValidator.validate("link")).toBeTruthy()
    expect(AliasValidator.validate("cool-link")).toBeTruthy()
    expect(AliasValidator.validate("cool-linke521")).toBeTruthy()

    expect(AliasValidator.validate("cool-link/")).toBeFalsy()
    expect(AliasValidator.validate("/cool-link/")).toBeFalsy()
    expect(AliasValidator.validate("cool-link%/")).toBeFalsy()
    expect(AliasValidator.validate("cool link")).toBeFalsy()

})

