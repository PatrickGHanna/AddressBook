var ContactFormModal = React.createClass({
    getInitialState: function() {
        return {
            id: this.props.id ? this.props.id : 0,
            firstName: this.props.firstName ? this.props.firstName : "",
            lastName: this.props.lastName ? this.props.lastName : "",
            phone: this.props.phone ? this.props.phone : ""
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
    componentDidMount() {
        $(ReactDOM.findDOMNode(this)).modal('show');
        $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
    },
    handleSubmit: function(e) {
        e.preventDefault();
        debugger;
        var id = this.state.id;
        var firstName = this.state.firstName.trim();
        var lastName = this.state.lastName.trim();
        //obviously need to do more with phone
        var phone = this.state.phone.trim();

        //validation
        if (!lastName || !firstName) {
            return;
        }
        this.props.action({ id: id, firstName: firstName, lastName: lastName, phone: phone });
        $(ReactDOM.findDOMNode(this)).modal('hide');
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
                                               handleFirstNameChange={this.handleFirstNameChange}
                                               handleLastNameChange={this.handleLastNameChange}
                                               handlePhoneChange={this.handlePhoneChange}/>
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