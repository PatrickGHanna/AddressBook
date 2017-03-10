var ContactFormModal = React.createClass({
    getInitialState: function () {
        return {
            id: this.props.id ? this.props.id : 0,
            firstName: this.props.firstName ? this.props.firstName : "",
            lastName: this.props.lastName ? this.props.lastName : "",
            phone: this.props.phone ? this.props.phone : "",
            email: this.props.email ? this.props.email : ""

        };
    },
    //todo: these on change handlers are pretty much the same thing. can I refactor this?
    handleFirstNameChange: function(e) {
        this.setState({ firstName: e.target.value });
    },
    handleLastNameChange: function(e) {
        this.setState({ lastName: e.target.value });
    },
    handlePhoneChange: function(e) {
        this.setState({ phone: e.target.value });
    },
    handleEmailChange: function (e) {
        this.setState({ email: e.target.value });
    },
    componentDidMount() {
        var componentDom = $(ReactDOM.findDOMNode(this));
        componentDom.modal('show');
        componentDom.on('hidden.bs.modal', this.props.handleHideModal);
        componentDom.find('form').validate();
    },
    ensureAllInputsAreValid: function (inputs) {
        var returnValue = true;
        inputs.each(function (index, input) {
                if (!$(input).valid()) {
                    returnValue = false;
                }
        });
        return returnValue;
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var inputs = $(e.target).find(':input:not(:button)');
        if (!this.ensureAllInputsAreValid(inputs)) {
            return;
        }
        var id = this.state.id;
        var firstName = this.state.firstName.trim();
        var lastName = this.state.lastName.trim();
        var phone = this.state.phone.trim();
        var email = this.state.email.trim();
        $(ReactDOM.findDOMNode(this)).modal('hide');
        this.props.handleHideModal();
        this.props.action({ id: id, firstName: firstName, lastName: lastName, phone: phone, email: email });
        
    },
    render() {
        return (
            <div className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form className="contactForm" onSubmit={this.handleSubmit}>
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title">{this.props.title}</h4>
                            </div>
                            <div className="modal-body">
                                <ContactInputs firstName={this.state.firstName}
                                               lastName={this.state.lastName}
                                               phone={this.state.phone}
                                               email={this.state.email}
                                               handleFirstNameChange={this.handleFirstNameChange}
                                               handleLastNameChange={this.handleLastNameChange}
                                               handlePhoneChange={this.handlePhoneChange}
                                               handleEmailChange={this.handleEmailChange}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-link" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    },
    propTypes: {
        handleHideModal: React.PropTypes.func.isRequired
    }
});