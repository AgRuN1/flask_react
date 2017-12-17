import React from 'react'
import Loadable from 'react-loadable'

import Loading from 'elements/Loading'

const Loader = getComponent => (
	Loadable({
		loader: getComponent,
		loading: Loading,
		delay: 500
	})
)

export default Loader