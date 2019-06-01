import React from "react";
import _ from "lodash";
import {connect} from "react-redux";
import { IStreamEdit } from "../../models";
import { fetchStream, editStream } from './../../actions/index';
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component<IStreamEdit> {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues: any) => {
        this.props.editStream(this.props.match.params.id, formValues);
    }

    render() {
        
        if (!this.props.stream) {
            return (
                <div>
                    <StreamForm />
                </div>
            )
        }
        
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm 
                    initialValues={_.pick(this.props.stream, "title", "description", "id")} 
                    onSubmit={this.onSubmit}
                 />
            </div>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => {
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);