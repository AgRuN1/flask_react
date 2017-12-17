const validate = value => {
	const errors = {}
	if(!value.login)
		errors.login = 'Обязательное поле'
	if(!value.password)
		errors.password = 'Обязательное поле'
	return errors
}

export default validate