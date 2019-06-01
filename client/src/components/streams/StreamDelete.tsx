import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { fetchStream, deleteStream } from './../../actions/index';
import { connect } from "react-redux";
import { IStreamDelete } from "../../models";
import { Link } from 'react-router-dom';

class StreamDelete extends React.Component<IStreamDelete> {

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }
    
    renderActions(){
        const id = this.props.match.params.id;
        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteStream(id)} className="ui button negative">Delete</button>
                <Link to="/streams" className="ui button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        
        if (!this.props.stream) {
            return "Are you sure you want to delete this stream?";
        }

        return `Are you sure you want to delete this stream with title: ${this.props.stream.title}?`;
    }

    render() {
        return (
            <Modal
                title="Delete Stream" 
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push("/")}
            />
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => {
    return {stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);