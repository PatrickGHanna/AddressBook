var testUtils = React.addons.TestUtils;

describe("ActionButton",
    function() {
        var component, element = null;
        var expectedText = "BUTTON TEXT";
        var action = jasmine.createSpy('action');
        beforeEach(function() {
            component = React.createElement(
                ActionButton,
                {
                    action: action,
                    text: expectedText
                });
            element = testUtils.renderIntoDocument(component);
        });

        it("should correctly populate the button text",
            function() {
                expect($(ReactDOM.findDOMNode(element)).text() === expectedText).toBe(true);
            });

        it("should call Action on input field change",
            function() {
                testUtils.Simulate.click($(ReactDOM.findDOMNode(element))[0]);
                expect(action).toHaveBeenCalled();
            });

        
    })