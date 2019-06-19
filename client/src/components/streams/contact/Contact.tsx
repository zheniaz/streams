import React from 'react';
import {  CompoundButton, IButtonProps, DialogFooter, DefaultButton, Dialog, PrimaryButton, ChoiceGroup, TextField, Rating  } from 'office-ui-fabric-react';
import { IDialogTopOffsetFixedExampleState } from '../../../models';


class Contact extends React.Component<IButtonProps> {

    public state: IDialogTopOffsetFixedExampleState = {
        hideDialog: true,
        optionSelected: 'A'
      };
              
    render() {
        

        return(
            <div>
                <div>
                    <div>
                        {this.renderButtons()}
                        {this.renderDialogContact()}
                        {this.renderAboutUsButton()}
                    </div>
                </div>
            </div>
        )
    }

    renderButtons() {
        const { disabled, checked } = this.props;
        return(
            <div>
                <CompoundButton 
                styles={contactStyles} 
                href="https://www.google.com/maps/search/?api=1&query=4014+148th+Ave+NE%2C+Redmond%2C+WA+98052%2C+USA" 
                primary={true} secondaryText="Open in Google Map" 
                disabled={disabled} 
                checked={checked}>
                    4014 148th Ave NE,
                    Redmond, WA 98052, USA
                </CompoundButton>
                <CompoundButton 
                    styles={contactStyles} 
                    onClick={this._showDialog} 
                    secondaryText="You can write a new letter here or give feedback." 
                    disabled={disabled} checked={checked}>
                        Write a letter or leave Feedback
                </CompoundButton>
                <CompoundButton 
                    styles={contactStyles} 
                    onClick={this._showDialog} 
                    secondaryText="About us" 
                    disabled={disabled} checked={checked}>
                        About us
                </CompoundButton>
                <CompoundButton 
                    styles={contactStyles} 
                    onClick={this._showDialog} 
                    secondaryText="Our contacts" 
                    disabled={disabled} checked={checked}>
                        Our contacts
                </CompoundButton>
                <CompoundButton 
                    styles={contactStyles} 
                    onClick={this._showDialog} 
                    secondaryText="You can write a new letter here or give feedback." 
                    disabled={disabled} checked={checked}>
                        Write a letter or leave Feedback
                </CompoundButton>
                <CompoundButton 
                    styles={contactStyles} 
                    onClick={this._showDialog} 
                    secondaryText="About us" 
                    disabled={disabled} checked={checked}>
                        About us
                </CompoundButton>
                <CompoundButton 
                    styles={contactStyles} 
                    onClick={this._showDialog} 
                    secondaryText="Our contacts" 
                    disabled={disabled} checked={checked}>
                        Our contacts
                </CompoundButton>
                <CompoundButton 
                    styles={contactStyles} 
                    onClick={this._showDialog} 
                    secondaryText="You can write a new letter here or give feedback." 
                    disabled={disabled} checked={checked}>
                        Write a letter or leave Feedback
                </CompoundButton>
                <CompoundButton 
                    styles={contactStyles} 
                    onClick={this._showDialog} 
                    secondaryText="About us" 
                    disabled={disabled} checked={checked}>
                        About us
                </CompoundButton>
                <CompoundButton 
                    styles={contactStyles} 
                    onClick={this._showDialog} 
                    secondaryText="Our contacts" 
                    disabled={disabled} checked={checked}>
                        Our contacts
                </CompoundButton>
                <CompoundButton 
                    styles={contactStyles} 
                    onClick={this._showDialog} 
                    secondaryText="You can write a new letter here or give feedback." 
                    disabled={disabled} checked={checked}>
                        Write a letter or leave Feedback
                </CompoundButton>
                <CompoundButton 
                    styles={contactStyles} 
                    onClick={this._showDialog} 
                    secondaryText="About us" 
                    disabled={disabled} checked={checked}>
                        About us
                </CompoundButton>
                <CompoundButton 
                    styles={contactStyles} 
                    onClick={this._showDialog} 
                    secondaryText="Our contacts" 
                    disabled={disabled} checked={checked}>
                        Our contacts
                </CompoundButton>
                <CompoundButton 
                    styles={contactStyles} 
                    onClick={this._showDialog} 
                    secondaryText="You can write a new letter here or give feedback." 
                    disabled={disabled} checked={checked}>
                        Write a letter or leave Feedback
                </CompoundButton>
                <CompoundButton 
                    styles={contactStyles} 
                    onClick={this._showDialog} 
                    secondaryText="About us" 
                    disabled={disabled} checked={checked}>
                        About us
                </CompoundButton>
                <CompoundButton 
                    styles={contactStyles} 
                    onClick={this._showDialog} 
                    secondaryText="Our contacts" 
                    disabled={disabled} checked={checked}>
                        Our contacts
                </CompoundButton>
                <CompoundButton 
                    styles={contactStyles} 
                    onClick={this._showDialog} 
                    secondaryText="You can write a new letter here or give feedback." 
                    disabled={disabled} checked={checked}>
                        Write a letter or leave Feedback
                </CompoundButton>
                <CompoundButton 
                    styles={contactStyles} 
                    onClick={this._showDialog} 
                    secondaryText="About us" 
                    disabled={disabled} checked={checked}>
                        About us
                </CompoundButton>
                <CompoundButton 
                    styles={contactStyles} 
                    onClick={this._showDialog} 
                    secondaryText="Our contacts" 
                    disabled={disabled} checked={checked}>
                        Our contacts
                </CompoundButton>
                <CompoundButton 
                    styles={contactStyles} 
                    onClick={this._showDialog} 
                    secondaryText="Our contacts" 
                    disabled={disabled} checked={checked}>
                        Our contacts
                </CompoundButton>
            </div>
        )
    }

    renderDialogContact() {

        const { optionSelected, hideDialog } = this.state;

        return(
            <div>
        <Dialog
          hidden={hideDialog}
          onDismiss={this._closeDialog}
          modalProps={{
            isBlocking: true,
            topOffsetFixed: true
          }}
        >
          <ChoiceGroup
            label="Write a letter or lease Feedback"
            options={[
              {
                key: 'A',
                iconProps: { iconName: 'Mail' },
                text: 'Write a Mail',
                checked: optionSelected === 'A'
              },
              {
                key: 'B',
                iconProps: { iconName: 'FeedBack' },
                text: 'Leave Feedback',
                checked: optionSelected === 'B'
              }
            ]}
            onChange={this._onChange}
            required={true}
          />
          {optionSelected === 'A' && (
            <div>
              <div>
                <TextField label="Write us" multiline rows={3} />
              </div>
            </div>
          )}
          {optionSelected === 'B' && (
            <div>
              <div>
                Rating
                <Rating
                    min={1}
                    max={10}
                    rating={this.state.tenStarRating}
                    onChange={this._onTenStarChange}
                    getAriaLabel={this._getRatingComponentAriaLabel}
                    onFocus={this._onFocus}
                    onBlur={this._onBlur}
                    ariaLabelFormat={'{0} of {1} stars selected'}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <PrimaryButton onClick={this._closeDialog} text="Save" />
            <DefaultButton onClick={this._closeDialog} text="Cancel" />
          </DialogFooter>
        </Dialog>
      </div>
        )
    }

    renderAboutUsButton() {
        return(
            <div>
                <h3>
                Zen3 is an AI-first, data-driven, cloud-native organization. We work with several leading companies in the world to solve some of their unique challenges. We aim to help our clients lead their industry in innovation, increase operational efficiencies, reduce costs and outdo their competition.
                </h3>
            </div>
        )
    }
    
    private _onChange = (e: undefined | React.FormEvent<HTMLElement | HTMLInputElement>, option: any): void => {
        this.setState({ optionSelected: option.key });
    };

    private _showDialog = (): void => {
        this.setState({ hideDialog: false });
    };

    private _onTenStarChange = (e: undefined | React.FocusEvent<HTMLElement | HTMLInputElement>, rating: undefined | number): void => {
        this.setState({ tenStarRating: rating });
    };

    private _closeDialog = (): void => {
        this.setState({ hideDialog: true });
    };

    private _onFocus = () => {
        console.log('onFocus called');
      };
    
      private _onBlur = () => {
        console.log('onBlur called');
      };
    
      private _getRatingComponentAriaLabel(rating: number, maxRating: number): string {
        return `Rating value is ${rating} of ${maxRating}`;
      }
}

export default Contact;



const contactStyles = {
    root: [
        {
            height: 90,
            width: "20%",
        }
    ]
}