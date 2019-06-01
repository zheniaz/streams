import React from "react";
import { connect } from "react-redux";
import { INewStreamCreate } from "../../../models";
import StreamForm from "../StreamForm";
import { createStream } from "../../../actions";

class NewStreamCreate extends React.Component<INewStreamCreate> {

    onSubmit = (formValues: any) => {
        if (formValues) {
            this.props.createStream(formValues);
        }
        this.props.closeDialog();
    }

    render() {
        return (
            <div>
                <StreamForm onSubmit={this.onSubmit} />
            </div>
        )
    }
};

export default connect(null, { createStream })(NewStreamCreate);