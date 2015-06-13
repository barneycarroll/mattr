import m      from 'mithril'
import mattr  from './mattr'
import assign from 'lodash.assign'

const attrs = {}

// Import this instead of mithril to get a persistent extended version.
// Custom attributes are persisted through the attrs hash key.
export default assign(
	mattr( m, attrs ),
	{ attrs }
)
