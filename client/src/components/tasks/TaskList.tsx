import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { taskStyles } from './TaskStyle';
import { connect } from "react-redux";
import { fetchTodos } from '../../actions';
import { ITodo } from '../../models/index';
import { fetchStream } from '../../actions/index';

export interface IDetailsListBasicExampleItem {
  key: number;
  title: string;
}

export interface ITaskList {
    todos: any[];
    selectionDetails?: {};
    selectedTodos?: any[];
    filtered?: any[];
}

class TaskList extends React.Component<ITaskList, any> {
    private _selection: any;
    private _allItems: any[] = [];
    private _columns: IColumn[] = [];
    public filtered = [];

    constructor(props: any) {
        super(props);

        this._selection = new Selection({
            onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() })
        });
    
        this._allItems = JSON.parse(JSON.stringify(this.props.todos));
    
        this._columns = [
            { key: 'column1', name: 'Title', fieldName: 'title', minWidth: 100, maxWidth: 200, isResizable: true },
        ];
    
        this.state = {
            todos: this._allItems,
            selectionDetails: this._getSelectionDetails(),
            filtered: null,
        };
    }

  public render(): JSX.Element {
    const { todos, selectionDetails } = this.state;

    return (
      <Fabric>
        <div className={taskStyles.taskTextField}>{selectionDetails}</div>
        <TextField
          className={taskStyles.taskTextField}
          onChange={this._onFilter}
          styles={{ root: { maxWidth: '300px' } }}
          placeholder="Filter by name:"
        />
        <MarqueeSelection selection={this._selection}>
          <DetailsList
            items={this.state.todos}
            columns={this._columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.fixedColumns}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            onItemInvoked={this._onItemInvoked}
          />
        </MarqueeSelection>
      </Fabric>
    );
  }

  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + (this._selection.getSelection()[0] as ITodo).title;
      default:
        return `${selectionCount} items selected`;
    }
  }

    private _onFilter = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string | undefined): void => {
        this.setState({
            todos: text ? this._allItems.filter(i => i.title.toLowerCase().indexOf(text) > -1) : this._allItems
        });
    };

  private _onItemInvoked = (item: ITodo): void => {
    alert(`Item invoked: ${item.title}`);
  };
}

const mapStateToProps = (state: any) => {
    return { 
        stream: Object.values(state.streams),
        todos: Object.values(state.todos),
    }
}

export default connect(mapStateToProps, { fetchTodos, fetchStream })(TaskList);