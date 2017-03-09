var ActionButton = React.createClass({
    render: function() {
        return <button type="button" onClick={this.props.action} className="btn btn-danger">{this.props.text}</button>;
    },
    propTypes: {
        action: React.PropTypes.func.isRequired,
        text: React.PropTypes.string.isRequired
    }
});