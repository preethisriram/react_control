import * as React from 'react';
import { Stack, IStackTokens } from '@fluentui/react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { TextField } from '@fluentui/react/lib/TextField';

/*
export interface IButtonExampleProps extends React.AllHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | HTMLSpanElement> {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}
*/
export interface IButtonExampleProps {
	// These are set based on the toggles shown above the examples (not needed in real code)
	disabled?: boolean;
	checked?: boolean;
  }

// Example formatting
const stackTokens: IStackTokens = {  };

export const ButtonDefaultExample: React.FunctionComponent<IButtonExampleProps> = props => {
	const { disabled, checked } = props;
  
	return (
	  <Stack horizontal tokens={stackTokens}>
	   <TextField  readOnly defaultValue="I am read-only" />
		<PrimaryButton text="Copy" onClick={_alertClicked} allowDisabledFocus disabled={disabled} checked={checked} />
	  </Stack>
	);
  };

function _alertClicked(): void {
  alert('Clicked');
}
