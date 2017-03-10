var testUtils = React.addons.TestUtils;

describe("ContactFormModal",
    function() {
        var component, element = null;
        var expectedFirstName = "Patrick";
        var expectedLastName = "Hanna";
        var expectedPhone = "952-334-9342";
        var expectedEmail = "Patrick.Gene.Hanna@gmail.com";
        var action = function() { return false; };
        var handleHideModal = function() {};
        beforeEach(function() {
            component = React.createElement(
                ContactFormModal,
                {
                    action: action,
                    handleHideModal: handleHideModal,
                    firstName: expectedFirstName,
                    lastName: expectedLastName,
                    phone: expectedPhone,
                    email: expectedEmail
                });
            element = testUtils.renderIntoDocument(component);
        });

        it("should call handleFirstNameChange on input field change",
            function() {
                var spy = spyOn(element, "handleFirstNameChange");
                //for some reason we have to force the react component to remount here, otherwise my spy function isn't tracking.
                element.forceUpdate();
                testUtils.Simulate.change($(ReactDOM.findDOMNode(element)).find('#firstName')[0]);
                expect(spy).toHaveBeenCalled();
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

        it("should correctly populate the Last Name field",
            function() {
                expect($(ReactDOM.findDOMNode(element)).find('#lastName')[0].value === expectedLastName).toBe(true);
            });

        it("should call handlePhoneChange on input field change",
            function() {
                var spy = spyOn(element, "handlePhoneChange");
                element.forceUpdate();
                testUtils.Simulate.change($(ReactDOM.findDOMNode(element)).find('#phone')[0]);
                expect(spy).toHaveBeenCalled();
            });

        it("should correctly populate the Phone Number field",
            function() {
                expect($(ReactDOM.findDOMNode(element)).find('#phone')[0].value === expectedPhone).toBe(true);
            });

        it("should call handleEmailChange on input field change",
            function() {
                var spy = spyOn(element, "handleEmailChange");
                element.forceUpdate();
                testUtils.Simulate.change($(ReactDOM.findDOMNode(element)).find('#email')[0]);
                expect(spy).toHaveBeenCalled();
            });

        it("should correctly populate the Email field",
            function() {
                expect($(ReactDOM.findDOMNode(element)).find('#email')[0].value === expectedEmail).toBe(true);
            });

        it("should validate on submit",
            function() {
                var spy = spyOn(element, "ensureAllInputsAreValid").and.callThrough();
                element.forceUpdate();
                testUtils.Simulate.submit($(ReactDOM.findDOMNode(element)).find('form')[0]);
                expect(spy).toHaveBeenCalled();
            });
    })