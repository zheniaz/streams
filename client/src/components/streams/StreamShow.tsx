import React from "react";
import { connect } from 'react-redux';
import { fetchStream } from './../../actions/index';
import { IStreamShow } from "../../models";
import { Stack, Separator, ITheme, createTheme } from "office-ui-fabric-react";


class StreamShow extends React.Component<IStreamShow> {
    videRef: any;
    player: any;

    constructor(props: IStreamShow) {
        super(props);

        this.videRef = React.createRef();
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        this.props.fetchStream(id);
    }

    theme: ITheme = createTheme({
        fonts: {
          medium: {
            fontFamily: 'Monaco, Menlo, Consolas',
            fontSize: '30px'
            
          }
        }
    });

    render(){
        if (!this.props.stream) {
            return <div>Loading...</div>
        }

        const { title, description } = this.props.stream;

        const content = 'Stream';

        return (
            <div>
                <div>
                    <Stack gap={12}>
                        <Separator theme={this.theme}>{content}</Separator>
                    </Stack>
                </div>

                title:
                <h1>{title}</h1>
                description:
                <h5>{description}</h5>
            </div>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any) => {
    return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, {fetchStream})(StreamShow);