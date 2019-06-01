import React from "react";
import { connect } from "react-redux";
import {  Nav } from "office-ui-fabric-react";
import { fetchStreams, fetchTodos } from "../actions"

class StreamsShow extends React.Component<any, any> {

    navLink: any;

    componentDidMount(){
        this.props.fetchStreams();
        this.props.fetchTodos();
        this.navLink = this.renderNavLink();
    }

    componentDidUpdate(prevProps: any, prevState: any){
        this.navLink = this.renderNavLink();
    }

    renderNavLink() {
        if (this.props.todos) {
            return this.props.todos.map((todo: any) => {
                return { key: todo.id, name: todo.title, url: todo.url };
            });
        }
    }

    renderItemText(title: string, description: string): string {
        return `${title.toLocaleUpperCase()}, ${description}`;
    }

    renderNav() {
        if (this.props.isSignedIn) {
            return this.props.streams.map((stream: any) => {
                return (
                    <Nav 
                        expandButtonAriaLabel="Expand or collapse"
                        key={stream.id}
                        ariaLabel="hello"
                        groups={[
                            {
                                name: this.renderItemText(stream.title, stream.description),
                                links: this.navLink,
                                collapseByDefault: true
                            }
                        ]}
                    />
                )
            })
        } else {
            return (
                <div>
                    <h1>Wellcome to the Stream! To see all streams please Sign In!</h1>
                </div>
            )
        }
    }

    render() {
        return(
            <div>
                {this.renderNav()}
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

export default connect(mapStateToProps, { fetchStreams, fetchTodos })(StreamsShow);