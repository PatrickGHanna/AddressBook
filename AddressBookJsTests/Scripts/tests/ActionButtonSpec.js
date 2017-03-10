var testUtils = React.addons.TestUtils;

describe("ActionButton",
    function() {
        var component, element = null;
        var expectedText = "BUTTON TEXT";
        var action = function() { return false; };
        beforeEach(function() {
            component = React.createElement(
                ActionButton,
                {
                    action: action,
                    text: expectedText
                });
            element = testUtils.renderIntoDocument(component);
        });

        it("should correctly populate the First Name field",
            function() {
                expect($(ReactDOM.findDOMNode(element)).find('#firstName')[0].value === expectedFirstName).toBe(true);
            });

        it("should call handleLastNameChange on input field change",
            function() {
                var spy = spyOn(element, "handleLastNameChange");
                element.forceUpdate();
                testUtils.Simulate.change($(ReactDOM.findDOMNode(element)).find('#lastName')[0]);
                expect(spy).toHaveBeenCalled();
            });

        
    })