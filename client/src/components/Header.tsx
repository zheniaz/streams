import React, { Component } from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import { signIn, signOut } from '../actions/index';
import { connect } from "react-redux";
import { CommandBarButton, CommandBar, mergeStyles } from "office-ui-fabric-react";
import history from "../history";
import { inherits } from "util";

export interface IHeader {
    isSignedIn?: boolean;
    disabled?: boolean;
    checked?: boolean;
}

class Header extends Component<any, any> {

    auth2: any;
    authButtonText: string = "";
    onAuthButtonClick: any;

    componentDidMount(){
        window.gapi.load("client:auth2", () => {
            window.gapi.client.init({
                clientId: "764636850491-403a313mlpt3khbe7trscr59j1d48ie0.apps.googleusercontent.com",
                scope: "email"
            }).then(() => {
                this.auth2 = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth2.isSignedIn.get());
                this.auth2.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    setAuthButton () {
        if(this.props.isSignedIn === null){
            this.authButtonText = "I don't know if we are signed in";
            this.onAuthButtonClick = ""
        } else if (this.props.isSignedIn) {
            this.authButtonText = "Sign Out";
            this.onAuthButtonClick = this.onSignOutClick;
        } else if (!this.props.isSighedIn) {
            this.authButtonText = "Sign in witn google";
            this.onAuthButtonClick = this.onSignInClick;
        }
    }

    onAuthChange = (isSignedIn: any) => {
        if (isSignedIn) {
            this.props.signIn(this.auth2.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth2.signIn().then(() => {
            this.getGoogleAuthItem();
        });
    }

    onSignOutClick = () => {
        this.auth2.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return "I don't know if we are signed in";
        } else if (this.props.isSignedIn) {
            return (
                <div onClick={this.onSignOutClick}>
                    "Sign Out"
                </div>
            )
        } else {
            return(
                <div onClick={this.onSignInClick}>
                    "Sign in witn google"
                </div>
            )
        }
    }
    
    render(){
        return (
            <div>
                {/* {this.renderButton()} */}
                
                <div>
                    <CommandBar
                        items={this.getItems()}
                        farItems={this.getGoogleAuthItem()}
                        className={commandBarStyles}
                    />
                </div>
                <div>
                    <Link to="/">
                        <GoogleAuth />
                    </Link>
                </div>
            </div>
        )
    }

    renderButton() {
        const {disabled, checked} = this.props;
        
        return(
            <div style={{ display: 'flex', alignItems: 'stretch' }}><div>asdfasdfasdf{this.props.isSignedIn}</div>
                <CommandBarButton
                    data-automation-id="test"
                    disabled={disabled}
                    checked={checked}
                    iconProps={{ iconName: 'CollapseMenu' }}
                    text="Zen3 Internship"
                    menuProps={{
                        items: [
                            {
                                key: 'allStreams',
                                text: 'View all Trainees',
                                onClick: () => history.push("/"),
                                iconProps: { iconName: 'BulletedList' },
                                hidden: this.props.isSignedIn
                            },
                            {
                                key: 'allStreams',
                                text: 'Compound List',
                                onClick: () => history.push("/streams/compound"),
                                iconProps: { iconName: 'BulletedList' },
                                disabled: this.props.isSignedIn === false,
                            },
                            {
                                key: 'allStreams',
                                text: 'Edit Trainee List',
                                onClick: () => history.push("/streams"),
                                iconProps: { iconName: 'BulletedList' },
                                disabled: this.props.isSignedIn === false,
                            },
                            {
                                key: 'home',
                                text: 'Contact',
                                onClick: () => history.push("/streams/contact/zen3"),
                                iconProps: { iconName: 'Home' }
                            }
                        ]
                    }}
                />
            </div>
        )
    }

    public getItems = () => {
        return [
            {
                key: 'allStreamsMain',
                name: "View all Trainees",
                onClick: () => history.push("/"),
                iconProps: { iconName: 'BulletedList' },
                hidden: this.props.isSignedIn
            },
            {
                key: 'allStreamsCompound',
                name: "Compound List",
                onClick: () => history.push("/streams/compound"),
                iconProps: { iconName: 'BulletedList' },
                disabled: this.props.isSignedIn === false,
            },
            {
                key: 'allStreamsEdit',
                name: "Edit Trainee List",
                onClick: () => history.push("/streams"),
                iconProps: { iconName: 'BulletedList' },
                disabled: this.props.isSignedIn === false,
            },
            {
                key: 'home',
                name: "Contacts",
                onClick: () => history.push("/streams/contact/zen3"),
                iconProps: { iconName: 'Home' }
            }
        ]
    }

    public getGoogleAuthItem = () => {
        if (this.props.isSignedIn === null) {
            return [
                {
                    key: "googleAuth",
                    text: "I don't know if we are signed in",
                    iconProps: { 
                        iconName: 'googleIcon'
                    },
                    onRenderIcon: () => {return <i className="fa fa-google"></i>},
                    className: googleAuthButtonStyles,
                    onClick: this.onAuthChange,
                }
            ]
        } else if (this.props.isSignedIn) {
            return [
                {
                    key: "googleAuth",
                    text: "Sign Out",
                    iconProps: { 
                        iconName: 'googleIcon'
                    },
                    onRenderIcon: () => {return <i className="fa fa-google"></i>},
                    className: googleAuthButtonStyles,
                    onClick: this.onSignOutClick,
                }
            ]
        }

        return [
            {
                key: "googleAuth",
                text: "Sign in witn google",
                iconProps: { 
                    iconName: 'googleIcon'
                },
                onRenderIcon: () => {return <i className="fa fa-google"></i>},
                className: googleAuthButtonStyles,
                onClick: this.onSignInClick,
            }
        ]
    }
};

const mapStateToProps = (state: any) => {
    return {isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn, signOut })(Header);

const googleAuthButtonStyles = mergeStyles({
    backgroundColor: "#0078d4", 
    color: "white",
});

const commandBarStyles = mergeStyles({
    backgroundColor: "#eff6fc",
    selectors: {
        '.ms-Nav-compositeLink:hover &': {
          color: 'red',
          backgroundColor: 'green',
        },
      },
})