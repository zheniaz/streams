import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { PrimaryButton, DefaultButton, Dialog, ContextualMenu, DialogType, Nav } from "office-ui-fabric-react";
import { number } from "prop-types";
import { fetchStreams, fetchTodos } from "../../../actions";
import NewStreamEdit from "./NewStreamEdit";
import { buttonType } from '../../../models/index';
import NewStreamCreate from "./NewStreamCreate";
import TaskList from "../../tasks/TaskList";




class NewStreamList extends React.Component<any, any> {

    public state: any = {
        hideDialog: true,
        selectedId: number,
        buttonType: buttonType,
    };

    hideDialog: boolean = false;

    componentDidMount(){
        this.props.fetchStreams();
        this.props.fetchTodos();
    }

    showDialog = (buttontype: buttonType, id?: number): any => {
        this.setState({hideDialog: false, buttonType: buttontype, selectedId: id })
    }

    closeDialog = (): void => {
        this.setState({ hideDialog: true, selectedId: undefined });
    };

    renderNewAdmin(stream: any) {
        if (stream.userId === this.props.currentUserId && this.props.isSignedIn){
            return (
                <div className="right floated contend">
                        <PrimaryButton onClick={() => this.showDialog(buttonType.edit, stream.id)} iconProps={{iconName: "Edit"}}>
                            EDIT
                        </PrimaryButton>
                    <Link to={`/streams/delete/${stream.id}`}>
                        <DefaultButton iconProps={{iconName: "Delete"}}>
                            DELETE
                        </DefaultButton>
                    </Link>  
                </div>
            )
        }
    }

    renderList() {
        return this.props.streams.map((stream: any) => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderNewAdmin(stream)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        <Link to={`/streams/${stream.id}`} className="header">
                            {stream.title}
                        </Link>
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            );
        });
    }

    renderNewCreate(){
        if(this.props.isSignedIn) {
            return (
                <div style={{textAlign: "right"}}>
                        <PrimaryButton onClick={() => this.showDialog(buttonType.create)} iconProps={{iconName: "Add"}}>
                            Crate Stream
                        </PrimaryButton>
                </div>
            )
        } 
    }

    private _dragOptions = {
        moveMenuItemText: 'Move',
        closeMenuItemText: 'Close',
        menu: ContextualMenu
    };

    renderEditCreate(){
        if(this.state.buttonType === buttonType.edit) {
            return <NewStreamEdit 
                        onSubmit={this.closeDialog} 
                        id={this.state.selectedId} 
                        closeDialog={this.closeDialog}
                    />;
        } else if (this.state.buttonType === buttonType.create) {
            return <NewStreamCreate onSubmit={this.closeDialog} closeDialog={this.closeDialog} />;
        }
    }

    renderModal() {
        const { hideDialog, isDraggable } = this.state;

        return(
            <div>
                <Dialog
                    hidden={hideDialog}
                    onDismiss={this.closeDialog}
                    dialogContentProps={{
                        type: DialogType.normal,
                        title: this.state.buttonType
                    }}
                    modalProps={{
                        styles: { main: { maxWidth: 450 } },
                        isModeless: true,
                        dragOptions: isDraggable ? this._dragOptions : undefined,
                        onDismissed: this.closeDialog
                    }}
                >
                    <TaskList />
                    {this.renderEditCreate()}
                    
                </Dialog>
            </div>
        )
    }

    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderModal()}
                {this.renderNewCreate()}
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return { 
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn,
        todos: Object.values(state.todos),
    }
}

export default connect(mapStateToProps, { fetchStreams, fetchTodos })(NewStreamList);