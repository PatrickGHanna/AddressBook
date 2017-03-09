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
                                             action={this.props.handleContactEdit}
                                             text="Edit Contact"/>
                            <ActionButton action={this.handleContactRemove} text="Delete"/>
                        </div>
                    </div>
                </div>

                <div className="panel-body">

                    {this.props.phone}
                </div>
            </div>
        );
    }
});