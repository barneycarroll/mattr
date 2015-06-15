**Alpha status. Code written off the cuff, untested. Use at own peril.**

[![Join the chat at https://gitter.im/barneycarroll/mattr](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/barneycarroll/mattr?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# What's the mattr?

Mattr allows you to extend the Mithril view language with custom attributes.

UMD compliant, so you can include as a raw script, require using Node or Browserify, or via RequireJS, SystemJS, etc.

# How to

<!-- The point of custom attributes (more on this later) is to reduce boilerplate and make your Mithril application code leaner and more descriptive by abstracting common idioms into key / value pairs. So the recommended approach is to have a global map of custom attributes which can be assigned once and then used throughout your application. This approach means that you will use an extended version of Mithril provided by Mattr whose custom attributes are defined on the `attr` property of the extended Mithril object: -->

### Umodular, plain JS
```html
<script src="/path/to/mithril.min.js"></script>
<script src="/path/to/mattr.js"></script>
<script>
	m = mattr.m
</script>
```

In package-managed applications, you must make sure to include Mithril in your `package.json`: Mattr invokes it internally:

### CommonJS (Node, Browserify, etc)
```javascript
var m = require( 'mattr' ).m
```

### ES6
```javascript
import { m } from 'mattr'
```

***

Custom attributes should be assigned to the `attrs` property of the Mattr-extended Mithril. For the sake of example, here's a naive but simple custom attribute for bi-di binding:

```javascript
m.attr.bidi = function( node, value ){
	node.value   = value()
	node.oninput = m.withAttr( 'value', value )
}

// Then in your application code, instead of this:
var password = m.prop()

m( 'input[type=password]', {
	value   : password,
	oninput : m.withAttr( 'value', password )
} )

// ...you'd write this:
var password = m.prop()

m( 'input[type=password]', {
	bidi : password
} )
```

# Custom attributes?

Mithril only has one custom attribute by default – `config` – which gives you access to the raw DOM element after redraw. The most obvious use case for `config` is to invoke 3rd party plugins to work on the rendered DOM element: these plugins presumably abstract some complicated task into a simple API so you don't have to write complex DOM functions yourself. But when you want to write a large and ambitious Mithril application, you'll probably encounter all sorts of situations where you want to abstract _virtual_ DOM patterns into plugins. [The Mithril blog expands on this idea in more detail](http://lhorie.github.io/mithril-blog/extending-the-view-language.html).

Mattr offers a generic API for writing such plugins in an idiomatic and painless way.

# Custom attribute conflicts

The default scenario for custom attributes is an application codebase where you have full control of what attributes are used. But if you're writing a Mithril component (for example) destined for use in other codebases, there's a risk you might use a custom attribute with the same name as one being used in the external codebase, at which point one will override the other. If you're writing code destined for 3rd party use, you should create a new instance of extended Mithril for use in your application that doesn't infringe on the external codebase.

You can create a new extended Mithril with it's own set of custom attributes by using the core API function:

```javascript
// Closures are used to demonstrate scope isolation
( function plugin(){
	// Attributes can be passed in directly:
	// They will still be available @ m.attr
	var m = mattr( {
		bidi : bidiTransform
	} )
}() )

// Later, in the user's code...
m.attrs.bidi = usersOwnBidiPlugin
```
