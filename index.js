// UMD for plugins
// https://github.com/umdjs/umd/blob/master/README.md
// https://github.com/umdjs/umd/blob/master/jqueryPluginCommonjs.js
( function umd( factory ){
	if( typeof define === 'function' && define.amd ){
		define( [ 'mithril' ], factory)
	}
	else if( typeof exports === 'object' ){
		module.exports = factory( require( 'mithril' ) )
	}
	else {
		factory( m )
	}
}( function factory( m ){
	// Assign all properties of subsequent arguments to the first
	function assign( target ){
		for( var i = 1, l = arguments.length; i < l; i++ )
			for( var key in arguments[ i ] )
				if( arguments[ i ].hasOwnProperty( key ) )
					target[ key ] = arguments[ i ][ key ]
	}

	// Pass virtual DOM node through each of the available transformations in node.attrs
	function transform( node, transformations ){
		for( var key in node.attrs )
			if( transformations.hasOwnProperty( node.attrs[ key ] ) ){
				var transformed = transformations[ key ](
					node,
					node.attrs[ key ],
					node.attrs
				)

				if( transformed !== undefined )
					node = transformed
			}

		return node
	}

	// Core public API: accepts a map of transformations,
	// returns an enhanced mithril which processes them
	function mattr( transformations ){
		transformations = transformations || {}

		return assign(
			function(){
				return transform(
					m.apply( undefined, arguments ),
					transformations
				)
			}, m, {
				attrs : transformations
			} )
	}

	var attrs = {}

	// If you want a globally enhanced mithril, use this.
	// Transformations can be assigned via attrs property
	build.m = assign( mattr( attr ), {
		attrs : attrs
	} )

	return mattr
} ) )
