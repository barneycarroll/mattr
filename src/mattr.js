import assign from 'lodash.assign'

const transform ( node, transformations ) =>
	Object.keys( transformations )
		.filter( key => key in node.attrs )
		.reduce( ( node, key ) => {
			const transformed = transformations[ key ](
				node,
				node.attrs[ key ],
				node.attrs
			)

			return transformed === undefined
				? node
				: transformed
		}, node )

// Pass in mithril and a custom attribute map.
// Returns an extended version of Mithril.
export default ( m, transformations ) =>
	assign(
		( ...input ) =>
			transform(
				m( ...input ),
				transformations
			),
		m
	)
