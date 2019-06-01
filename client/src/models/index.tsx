import { InjectedFormProps } from 'redux-form';

export interface IAction {
    type: string;
    payload: any;
}

export interface IModal {
    title: string;
    content: string;
}

export interface IGoogleAuth{
    signIn(userId: number): any;
    signOut(): any;
    isSignedIn?: any;
}

export interface IStream {
    match: any;
    stream: any;
}

export interface IStreamCreate extends InjectedFormProps {
    createStream(formValues: any): any;
}

export interface INewStreamCreate {
    createStream(formValues: any): any;
    closeDialog(): any;
    onSubmit(): any;
}

export interface IStreamEdit extends IStream {
    fetchStream(id: number): any;
    editStream(id: number, formValues: any): any;
}

export interface IStreamForm extends InjectedFormProps<any, any, any>, IStream {
    onSubmit(formValues: any): any;
    fetchStream(id: number): any;
    closeDialog(): any;
}

export interface IStreamDelete extends IStream {
    fetchStream(id: number):any;
    deleteStream(id: number): any;
}

export interface IStreamShow extends IStream {
    fetchStream(id: number):any;
}

export interface IDialogTopOffsetFixedExampleState {
    hideDialog: boolean;
    optionSelected: string;
    rating?: number;
    largeStarRating?: number;
    smallStarRating?: number;
    tenStarRating?: number;
    themedStarRating?: number;
}

export enum buttonType {
    edit = "Edit Stream",
    create = "Create Stream",
}

export interface ITodo {
    id: number;
    title: string;
    description: string;
    url: string;
}