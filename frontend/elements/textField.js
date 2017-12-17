import React from 'react'

import { TextField }from 'material-ui'
import { greenA700, red500 } from 'material-ui/styles/colors'

const focusStyle = {
	color: greenA700,
	borderColor: greenA700
}

const errorStyle = {
	color: red500,
	borderColor: red500
}

const renderInputField = ({
	meta: {
		error, 
		touched
	}, 
	label,
	input,
	...custom }) => (
	<TextField
		floatingLabelText={label}
		floatingLabelFocusStyle={touched && error ? errorStyle : focusStyle}
		underlineFocusStyle={touched && error ? errorStyle : focusStyle}
		errorText={touched && error}
		{...input}
		{...custom}
	/>
)

export default renderInputField