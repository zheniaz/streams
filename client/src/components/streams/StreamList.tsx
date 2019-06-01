import React from "react";
import { fetchStreams } from '../../actions/index';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { PrimaryButton, initializeIcons, Icon, ActionButton, DefaultButton, Dialog, ContextualMenu, DialogType, DialogFooter } from "office-ui-fabric-react";
import NewStreamEdit from "./new/NewStreamEdit";
import { number } from "prop-types";


class StreamList extends React.Component<any, any> {

    public state: any = {
        hideDialog: true,
        selectedId: number,
    };

    hideDialog: boolean = false;

    componentDidMount(){
        this.props.fetchStreams();
    }

    showDialog = (id?: number): any => {
        this.setState({hideDialog: false, selectedId: id })
    }

    closeDialog = (): void => {
        this.setState({ hideDialog: true, selectedId: undefined });
    };

    renderAdmin(stream: any) {
        if (stream.userId === this.props.currentUserId && this.props.isSignedIn){
            return (
                <div className="right floated contend">
                    <Link to={`/streams/edit/${stream.id}`} >
                        <PrimaryButton iconProps={{iconName: "Edit"}}>
                            EDIT
                        </PrimaryButton>
                    </Link>  
                    <Link to={`/streams/delete/${stream.id}`}>
                        <DefaultButton iconProps={{iconName: "Delete"}}>
                            DELETE
                        </DefaultButton>
                    </Link>  
                </div>
            )
        }
    }

    renderNewAdmin(stream: any) {
        if (stream.userId === this.props.currentUserId && this.props.isSignedIn){
            return (
                <div className="right floated contend">
                        <PrimaryButton onClick={() => this.showDialog(stream.id)} iconProps={{iconName: "Edit"}}>
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

    renderCreate() {
        if(this.props.isSignedIn) {
            return (
                <div style={{textAlign: "right"}}>
                    <Link to="/streams/new">
                        <PrimaryButton iconProps={{iconName: "Add"}}>
                            Crate Stream
                        </PrimaryButton>
                    </Link>
                </div>
            )
        } 
    }

    renderNewCreate(){
        if(this.props.isSignedIn) {
            return (
                <div style={{textAlign: "right"}}>
                        <PrimaryButton onClick={() => this.showDialog()} iconProps={{iconName: "Add"}}>
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

    renderModal() {
        const { hideDialog, isDraggable } = this.state;

        return(
            <div>
                <Dialog
                    hidden={hideDialog}
                    onDismiss={this.closeDialog}
                    dialogContentProps={{
                        type: DialogType.normal,
                        title: 'Edit Stream'
                    }}
                    modalProps={{
                        styles: { main: { maxWidth: 450 } },
                        isModeless: true,
                        dragOptions: isDraggable ? this._dragOptions : undefined,
                        onDismissed: this.closeDialog
                    }}
                >

                    <NewStreamEdit onSubmit={this.closeDialog} id={this.state.selectedId} />
                </Dialog>
            </div>
        )
    }

    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderNewCreate()}
                {this.renderModal()}
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return { 
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);