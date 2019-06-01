import React from "react";
import { Field, reduxForm } from "redux-form";
import { IStreamForm } from "../../models";
import { Stack, TextField, PrimaryButton, IStackProps, CompoundButton, DefaultButton } from 'office-ui-fabric-react';
import { DialogFooter } from 'office-ui-fabric-react/lib/Dialog';

class StreamForm extends React.Component<any, IStreamForm> {
    description: string = "";
    title: string = "";

    columnProps: Partial<IStackProps> = {
        tokens: { childrenGap: 15 },
        styles: { root: { width: "auto" } }
    };

    renderFabricInput = ({ input, label, meta }: any) => {

        if(!input.value){
            input.value = "" || meta.initial;
        }
        return (
            <div>
                <TextField 
                    label={label}
                    {...input}
                    underlined 
                    required 
                    name="description"
                    placeholder="Enter text here" 
                    autoComplete="off"
                />
            </div>
        )
    }

    onSubmit = (formValues: any) => {
        this.props.onSubmit(formValues);
    }

    closeDialog = () => {
        this.props.onSubmit();
    }

    render() {

        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>

                    <Stack horizontal tokens={{ childrenGap: 50 }} styles={{ root: { width: "auto" } }}>
                        <Stack {...this.columnProps}>
                            <Field name="title" component={this.renderFabricInput} label="Title" />
                            <Field name="description" component={this.renderFabricInput} label="Description" />
                        </Stack>
                    </Stack>

                    <div>
                        <DialogFooter>
                            <PrimaryButton
                                data-automation-id="test"
                                text="Submit"
                                allowDisabledFocus={true}
                                type="submit"
                            />
                            <DefaultButton 
                                onClick={this.closeDialog} 
                                text="Cancel" 
                                type="button"
                            />
                        </DialogFooter>
                    </div>
                </form>
            </div>
        )
    }
};

const validate = (formValues: any) => {
    const errors: any = {};

    if (!formValues.title) {
        errors.title = "You must enter a title";
    }

    if (!formValues.description) {
        errors.description = "You must enter a description";
    }

    return errors;
}


export default reduxForm({
    form: "streamForm",
    validate
})(StreamForm);
