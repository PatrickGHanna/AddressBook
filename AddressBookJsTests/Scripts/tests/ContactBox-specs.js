var testUtils = React.addons.TestUtils;

describe("contact-box", function () {
    it("should render correctly without error",
        function() {
            var component, element;

            element = React.createElement(
                ContactBox,
                {});
            component = testUtils.renderIntoDocument(element);
            debugger;
        });
})