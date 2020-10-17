import i18n from "./index";

test("i18n function returns value from dictionary", () => {
  expect(i18n("test_key")).toEqual("Test value");
});

test(" i18n function injects replacements", () => {
  expect(
    i18n("test_key_with_replacements", {
      first: "my first replacement",
      second: "My sEcOnD rEpLaCeMeNt"
    })
  ).toEqual(
    "Test value with replacements, my first replacement and My sEcOnD rEpLaCeMeNt"
  );
});
