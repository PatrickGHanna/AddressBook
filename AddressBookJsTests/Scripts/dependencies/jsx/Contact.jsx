var Contact = React.createClass({
    handleContactRemove: function() {
        this.props.handleContactRemove(this.props.id);
    },
    render: function() {
        return (
            <div className="contact panel panel-default">
                <div className="panel-heading container">
                    <div className="row">
                        <div className="col-xs-4 panel-title">
                            {this.props.firstName} {this.props.lastName}
                        </div>
                        <div className="col-xs-8 text-right">
                            <ModalFormButton id={this.props.id}
                                             firstName={this.props.firstName}
                                             lastName={this.props.lastName}
                                             phone={this.props.phone}
                                             email={this.props.email}
                                             action={this.props.handleContactEdit}
                                             text="Edit Contact"/>
                            <ActionButton action={this.handleContactRemove} text="Delete"/>
                        </div>
                    </div>
                </div>

                <div className="panel-body">
                    <div>
                        <b>Phone:</b> {!this.props.phone ? <span className="text-muted">None provided</span> : this.props.phone}
                    </div>
                    <hr/>
                    <div>
                        <b>Email:</b> {!this.props.email ? <span className="text-muted">None provided</span> : this.props.email}
                    </div>
                </div>
            </div>
        );
    }
});