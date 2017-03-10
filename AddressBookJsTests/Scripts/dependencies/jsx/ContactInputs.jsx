var ContactInputs = React.createClass({
    //todo: repeated form elements
    render: function() {
        return (
            <div className="text-left">
                <input className="hidden"
                       id="id"
                       type="hidden"
                       placeholder="First Name"
                       value={this.props.id}/>
                <div className="form-group">
                    <label for="firstName">First Name</label>
                    <input className="form-control"
                           id="firstName"
                           type="text"
                           placeholder="First Name"
                           value={this.props.firstName}
                           onChange={this.props.handleFirstNameChange}/>
                </div>
                <div className="form-group">
                    <label for="firstName">Last Name</label>
                    <input className="form-control"
                           id="lastName"
                           type="text"
                           placeholder="Last Name"
                           value={this.props.lastName}
                           onChange={this.props.handleLastNameChange}/>
                </div>
                <div className="form-group">
                    <label for="phone">Phone Number</label>
                    <input className="form-control"
                           id="phone"
                           type="text"
                           placeholder="XXX-XXX-XXXX"
                           value={this.props.phone}
                           onChange={this.props.handlePhoneChange}/>
                </div>
            </div>
        );
    }
});