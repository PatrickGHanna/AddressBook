var ContactInputs = React.createClass({
    //todo: repeated form elements, I would like to make an input component possibly, or at least a component per type
    render: function() {
        return (
            <div className="text-left">
                <input className="hidden"
                       id="id"
                       type="hidden"
                       value={this.props.id}/>
                <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input required="required"
                           className="form-control"
                           id="firstName"
                           type="text"
                           placeholder="First Name"
                           value={this.props.firstName}
                           onChange={this.props.handleFirstNameChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input required="required"
                           className="form-control"
                           id="lastName"
                           type="text"
                           placeholder="Last Name"
                           value={this.props.lastName}
                           onChange={this.props.handleLastNameChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input data-rule-phoneUS="true"
                           className="form-control"
                           id="phone"
                           type="text"
                           placeholder="XXX-XXX-XXXX"
                           value={this.props.phone}
                           onChange={this.props.handlePhoneChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Email</label>
                    <input className="form-control"
                           id="email"
                           type="email"
                           placeholder="JohnDoe@Example.com"
                           value={this.props.email}
                           onChange={this.props.handleEmailChange} />
                </div>
            </div>
        );
    }
});