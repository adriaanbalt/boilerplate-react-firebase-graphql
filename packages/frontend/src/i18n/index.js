const dictionary = {
	//For tests
	test_key: "Test value",
	test_key_with_replacements:
		"Test value with replacements, {first} and {second}",
	buy_modal_headline: "BUY WORK",
	buy_modal_purchase_details: "Purchase Details",
	buy_modal_who: "Buying from {name}",
};

export default function i18n(stringKey, replacements = {}) {
	if (!dictionary[stringKey])
		console.warn("Caution! No i18n string exists for key", stringKey);
	return Object.entries(replacements).reduce((str, [key, value]) => {
		return str.replace(`{${key}}`, value);
	}, dictionary[stringKey]);
}
