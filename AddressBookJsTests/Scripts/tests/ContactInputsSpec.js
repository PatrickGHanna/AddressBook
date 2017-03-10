var testUtils = React.addons.TestUtils;

describe("ContactInputs", function () {
    var component, element = null;
    var action = function () { return false; };
    beforeEach(function() {
        component = React.createElement(
                ContactFormModal,
                { action: action });
        element = testUtils.renderIntoDocument(component);
    });


    it("should validate on submit",
        function() {
            var spy = spyOn(ContactFormModal.prototype, "handleSubmit");
            testUtils.Simulate.submit($(ReactDOM.findDOMNode(element)).find('form')[0]);
            expect(spy).toHaveBeenCalled();
        });
})