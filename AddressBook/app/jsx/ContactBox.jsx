var ContactBox = React.createClass({
    loadContactsFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({ data: data });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleContactAdd: function(contact) {
        var contacts = this.state.data;
        var newContacts = contacts;
        newContacts[contact.id] = contact;
        this.setState({ data: newContacts });
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: contact,
            success: function(data) {
                this.setState({ data: data });
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({ data: contacts });
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleContactEdit: function(contact) {
        var contacts = this.state.data;
        var newContacts = contacts;
        newContacts[contact.id] = contact;
        this.setState({ data: newContacts });
        $.ajax({
            url: this.props.url + '/' + contact.id,
            dataType: 'json',
            type: 'PUT',
            data: contact,
            success: function(data) {
                this.setState({ data: data });
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({ data: contacts });
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleContactRemove: function(id) {
        var contacts = this.state.data;
        var remainingContacts = contacts;
        var indexToRemove = remainingContacts.map(function (contact) { return contact.id; }).indexOf(id);
        remainingContacts.splice(indexToRemove, 1);
        this.setState({ data: remainingContacts });
        $.ajax({
            url: this.props.url + '/' + id,
            dataType: 'json',
            type: 'DELETE',
            success: function(data) {
                this.setState({ data: data });
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({ data: contacts });
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return { data: [] };
    },
    componentDidMount: function() {
        this.loadContactsFromServer();
        setInterval(this.loadContactsFromServer, this.props.pollInterval);
    },
    render: function() {
        return (
            <div className="contactBox container">
                <div className="row">
                    <div className="col-xs-12 col-md-5 ">
                        <div>
                            <h1>Contacts</h1>
                            <ModalFormButton action={this.handleContactAdd} text="Add Contact"/>
                        </div>
                        <ContactList data={this.state.data}
                                     handleContactEdit={this.handleContactEdit}
                                     handleContactRemove={this.handleContactRemove}/>
                    </div>
                </div>
            </div>
        );
    }
});