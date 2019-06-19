import React from "react"
import { Router, Route, Switch } from "react-router-dom";
import StreamDelete from './streams/StreamDelete';
import StreamShow from './streams/StreamShow';
import StreamEdit from './streams/StreamEdit';
import Header from "./Header";
import history from "../history";
import Contact from './streams/contact/Contact';
import NewStreamList from "./streams/new/NewStreamList";
import { connect } from "react-redux";
import StreamsShow from "./StreamsShow";
import { mergeStyleSets } from "@uifabric/merge-styles";
import CompoundList from "./streams/new/CompoundTraineeList";


class App extends React.Component<any> {
    
    render() {
        return (
            <div className={appStyle.container}>
                <Router history={history}>
                    <div>
                        <Header isSigned={this.props.isSigned} />
                        <Switch>
                            <Route path="/" exact component={StreamsShow} />
                            <Route path="/streams" exact component={NewStreamList} />
                            <Route path="/streams/compound" exact component={CompoundList} />
                            <Route path="/streams/edit/:id" exact component={StreamEdit} />
                            <Route path="/streams/delete/:id" exact component={StreamDelete} />
                            <Route path="/streams/:id" exact component={StreamShow} />
                            <Route path="/streams/contact/zen3" exact component={Contact} />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
};

const mapStateToProps = (state: any) => {
    return {isSigned: state.auth.isSigned };
}

export default connect(mapStateToProps, { })(App);

const appStyle = mergeStyleSets({
        container: {
            minWidth: "320px",
            maxWidth: "1150px",
            margin: "auto",
        }
});