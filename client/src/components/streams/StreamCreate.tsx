import React from "react";
import { connect } from "react-redux";
import { createStream } from '../../actions/index';
import { IStreamCreate } from "../../models";
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component<IStreamCreate> {

    onSubmit = (formValues: any) => {
        this.props.createStream(formValues);
    }

    render() {
        return (
            <div>
                <h3>Create a Stream</h3>
                <StreamForm onSubmit={this.onSubmit} />
            </div>
        )
    }
};

export default connect(null, { createStream })(StreamCreate);