import React, {Component} from "react";
import { connect } from "react-redux";
import { signIn, signOut } from '../actions/index';
import { IGoogleAuth } from '../models/index';
import { PrimaryButton, initializeIcons } from "office-ui-fabric-react";

initializeIcons();

class GoogleAuth extends Component<any, IGoogleAuth> {
    auth: any;

    componentDidMount(){
        window.gapi.load("client:auth2", () => {
            window.gapi.client.init({
                clientId: "1054073046884-nvav73eup9iutlk1gujpngrpq7a2ltfm.apps.googleusercontent.com",
                scope: "email"
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn: any) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return <div>I don't know if we are signed in</div> 
        } else if (this.props.isSignedIn) {
            return (
                <PrimaryButton onClick={this.onSignOutClick} >
                    <i className="google icon" />
                    Sign Out
                </PrimaryButton>
            )
        } else {
            return (
                <PrimaryButton onClick={this.onSignInClick} >
                    <i className="google icon"/>
                    Sign in witn google
                </PrimaryButton>
            )
        }
    }

    render(){
        
        return(
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}

const mapStateToProps = (state: any): any => {
    return { isSignedIn: state.auth.isSignedIn };
}

const mapDispatchToProps = {
    signIn,
    signOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleAuth);

declare global {
    interface Window { 
        gapi: any,
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any 
    }
}