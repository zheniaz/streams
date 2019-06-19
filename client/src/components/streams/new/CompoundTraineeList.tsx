import React, { useState, useEffect } from "react";
import Axios from "axios";
import { CompoundButton, mergeStyleSets, IconNames } from "office-ui-fabric-react";
import Guid from "../../../shared/Guid";
import { ModelType } from "../../../models";

const CompoundList = (): any => {
    const trainees = useTraineeList();   
    const todos = useTodosList();

    return(
        <div>
            {renderCompoundList(trainees, ModelType.Trainee)}
            {renderCompoundList(todos, ModelType.Todo)}
        </div>
    );
}

function useTraineeList() {
    const[streams, setStreams] = useState([]);
    useEffect(() => {
        (async () => {
            const response = await Axios.get(`http://localhost:3001/streams`);
            setStreams(response.data);
        })();
    }, []);
    return streams;
}

function useTodosList() {
    const[todos, setTodos] = useState([]);
    useEffect(() => {
        (async () => {
            const response = await Axios.get(`http://localhost:3001/todos`);
            setTodos(response.data);
        })();
    }, []);
    return todos;
}

const renderCompoundList = (items: any[] = [], modelType: ModelType): any => {
    let styles = {};
    let secondaryText = "";
    let iconProps = {};
    if (modelType === ModelType.Trainee) {
        styles = compoundTraineeButtonStyles;
        secondaryText = ModelType.Trainee;
        iconProps = {
            iconName: "UserFollowed"
        }
    }
    else if (modelType === ModelType.Todo) {
        styles = compoundTodoButtonStyles;
        secondaryText = ModelType.Todo;
        iconProps = {
            iconName: "Work"
        }
    }

    return items.map((item: any) => {
        return(
            <CompoundButton
                styles={styles}
                secondaryText={secondaryText}
                key={Guid.newGuid()}
                iconProps={iconProps}
            >
                    {`${item.title} ${item.description}`}
            </CompoundButton>
        );
    });
}

export default CompoundList;

const compoundTraineeButtonStyles = mergeStyleSets({
    root: [
        {
            height: 90,
            width: "20%",
            textColor: "blue",
            color: "white",
            backgroundColor: "#4d5155"
        },
    ],
    rootHovered: [
        {
            color: "#d3cddf",
            backgroundColor: "#3a3d41"
        }
    ]
});

const compoundTodoButtonStyles = mergeStyleSets({
    root: [
        {
            height: 90,
            width: "15%",
            textColor: "blue",
            color: "white",
            backgroundColor: "#757373"
        },
    ],
    rootHovered: [
        {
            color: "#d3cddf",
            backgroundColor: "#3a3d41"
        },
    ],
    menuProps: [

    ]
});

