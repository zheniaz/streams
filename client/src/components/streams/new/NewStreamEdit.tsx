import React from "react";
import _ from "lodash";
import {connect} from "react-redux";
import StreamForm from "../StreamForm";
import { fetchStream, editStream } from "../../../actions";

export interface INewStreamEdit {
    fetchStream(id: number): any;
    editStream(id: number, formValues: any): any;
    onSubmit(): any;
    closeDialog(): any;
    id: number;
    stream: any;
}

class NewStreamEdit extends React.Component<INewStreamEdit> {

    componentDidMount() {
        this.props.fetchStream(this.props.id);
    }

    onSubmit = (formValues: any) => {
        if(formValues) {
            this.props.editStream(this.props.id, formValues);
            this.props.onSubmit();
        } else {
            this.props.closeDialog();
        }
        
    }

    closeDialog(){
        this.props.closeDialog();
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
                <StreamForm 
                    initialValues={_.pick(this.props.stream, "title", "description", "id")} 
                    onSubmit={this.onSubmit}
                 />
            </div>
        )
    }

    
}

const mapStateToProps = (state: any, ownProps: any) => {
    return { stream: state.streams[ownProps.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(NewStreamEdit);