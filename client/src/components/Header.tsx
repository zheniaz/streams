import React, { Component } from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import { signIn } from '../actions/index';
import { connect } from "react-redux";
import { CommandBarButton } from "office-ui-fabric-react";
import history from "../history";

export interface IHeader {
    isSigned?: boolean;
    disabled?: boolean;
    checked?: boolean;
}

class Header extends Component<any, any> {


    isSigned = () => {
        return this.props.isSigned;
    }

    componentDidMount(){
        console.log("Header, isSigned:", this.state)
    }

    render(){
        console.log(this.props.auth)
        return (
            <div className="ui secondary pointing menu">
                {this.renderButton()}
                <div className="right menu">
                    <Link to="/" className="item">
                        <GoogleAuth />
                    </Link>
                </div>
                
            </div>
        )
    }

    renderButton() {
        const {disabled, checked} = this.props;
        
        return(
            <div style={{ display: 'flex', alignItems: 'stretch' }}>
                <CommandBarButton
                    data-automation-id="test"
                    disabled={disabled}
                    checked={checked}
                    iconProps={{ iconName: 'CollapseMenu' }}
                    text="Zen3 App"
                    menuProps={{
                        items: [
                            {
                                key: 'allStreams',
                                text: 'Show Entries',
                                onClick: () => history.push("/"),
                                iconProps: { iconName: 'BulletedList' },
                                hidden: this.props.isSigned
                            },
                            {
                                key: 'allStreams',
                                text: 'Edit Entries',
                                onClick: () => history.push("/streams"),
                                iconProps: { iconName: 'BulletedList' }
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
};

const mapStateToProps = (state: any) => {
    return {isSigned: state.auth.isSigned };
}

export default connect(mapStateToProps, { signIn })(Header);