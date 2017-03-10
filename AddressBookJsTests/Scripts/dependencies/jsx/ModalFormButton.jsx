var ModalFormButton = React.createClass({
    getInitialState() {
        debugger;
        return { view: { showModal: false } }
    },
    handleHideModal() {
        this.setState({ view: { showModal: false } });
    },
    handleShowModal() {
        this.setState({ view: { showModal: true } });
    },
    render: function() {
        return <span>
                   <button type="button" className="btn btn-link" onClick={this.handleShowModal}>{this.props.text}</button>
                   {this.state.view.showModal
                    ? <ContactFormModal handleHideModal={this.handleHideModal}
                  action={this.props.action}
                  id={this.props.id}
                  firstName={this.props.firstName}
                  lastName={this.props.lastName}
                  phone={this.props.phone}
                  email={this.props.email}
                  title={this.props.title}/>
                    : null}
               </span>;
    },
    propTypes: {
        text: React.PropTypes.string.isRequired
    }
});