var ContactList = React.createClass({
    render: function() {
        var handleContactEdit = this.props.handleContactEdit;
        var handleContactRemove = this.props.handleContactRemove;
        var contactNodes = this.props.data.map(function(contact) {
            return (
                <Contact id={contact.id}
         firstName={contact.firstName}
         lastName={contact.lastName}
         phone={contact.phone}
         handleContactEdit={handleContactEdit} handleContactRemove={handleContactRemove} key={contact.id}/>
            );
        });
        return (
            <div className="contactList">
                {contactNodes}
            </div>
        );
    }
});