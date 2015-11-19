# Rigatoni

Rigatoni is an HTML-specific template system designed around safety, unity between use cases, simplicity and ease of use. Hopefully it will be useful outside of Inspire, and I’m definitely trying to keep it from being specific to our infrastructure in any way. However, that primary use case will drive a lot of the design motivation.

Before you go any further, you should read: http://www.workingsoftware.com.au/page/Your_templating_engine_sucks_and_everything_you_have_ever_written_is_spaghetti_code_yes_you

## Components of a Rigatoni template

A Rigatoni template is, fundamentally, just plain HTML. No inline markup for data binding. In fact, put dummy data in there if you like. One of the intended uses is for this static HTML to be used by the design team.

But obviously there’s more to life than one specific set of dummy data. So how do we get what we actually want (structure templated with the correct data)? We start with the original and programmatically replace content via in-memory DOM structure. This can be accomplished with an arbitrary series of transformation functions, which can be mixed and matched reusably. Rigatoni can be agnostic to both the details of transformation, and the outer environment calling it.

Therefore Rigatoni Templates are effectively a combination of initial structure, and transformations fed from a single input.

## Grooves

We provide a handy binding facility for partial function application. Effectively, there’s just the one function used by everything:

```javascript
rigatoni(root, path, selector, [transforms], element, data);
```

That’s a lot of parameters to duplicate in a lot of places, which is why the parameters are carefully ordered by design, and we provide a function attribute called “groove”.

```javascript
// Specify one param
var rig = rigatoni.groove("/static/templates");

// Further specify path, selector, and transforms.
var user_tmpl = rig.groove("/user.html", "body", [user_transform]);

// Use our new groove in place
user_tmpl($('.user'), { 'nickname': 'JeanRalphio' });
```

## Idempotence

Transformations, or rather transformation lists, should be idempotent given the same target element and input data, because despite intermediate changes, you still achieve the same result. Rigatoni doesn’t enforce this, for performance.

For that matter, we cache templates indefinitely once loaded. You don’t need to worry about your browser cache. You don’t need to worry about deriving multiple grooves from a single template file - for example, with different selectors. On the frontend, it persists for the lifetime of the page. On the backend, it persists for the lifetime of the server. It’s exactly as natural, boring and predictable as you could possibly ask for.

## Data binding/Events (not our problem)

Rigatoni does not care about this, or events. It’s an incredibly minimal wrapper for fundamental template-animation functionality. You’ll generally want to handle this through the outer framework - for example, Backbone, which has a pretty nice system for event binding and view lifetime management. We certainly don’t get all up in the “onchange in this input, update everywhere across the page”, but we also get along well (or at least try to) with the technologies you might mix in to do that. Of course, if you’re using a framework that doesn’t support custom templating solutions at all, you’ve already opted out of having much use for Rigatoni ;)

As an alternative, you could use transforms for this, but remember, the tricky bit is keeping it idempotent - only binding these events once. And since we’re not in this business, we provide you no facilities to help you not shoot off your foot. You’re on your own. For that matter, this approach may introduce challenges with seamlessly reusing templates across frontend and backend.

## Unity

### Frontend

This topic is mostly covered by other items, but it’s worth pointing out fundamental design choices like the use of JS as the language of template population. We also require JQuery as a dependency, which is what most people will be using for template population anyways.

### Backend

But… DOM manipulation? JQuery? How is this done on the backend? Well, here we depend on [Cheerio][cheerio], a minimal NodeJS implementation of the JQ API, with all the browser support stripped out. The Rigatoni Server Framework is very unopinionated - really more a collection of helpers for:

 * Figuring out what you need on the page
 * Acquiring all that data in parallel where possible, through promises
 * Assembling it into a finished page

This is a matter of active research - the primary concern is that the backend and frontend behave identically for different URLs, and the most promising possibility is that you specify everything in a format or structure that can be used directly (or specialized) for either. But that common format is still completely hypothetical yet.

[cheerio]: https://www.npmjs.com/package/cheerio

### Design

You can do your design in any language you want. The unity here is the pristine-source model for collecting structure from the design repo/server/whatever. The basic model is a table of:

 * Source location
 * Element selector
 * Template output location

Remember, templates are just plain HTML. They are in fact derived directly and exactly from the design sources, and the entire rebuild loop is simply retrieving each source (deduplicating where the same source is used multiple times), extracting the relevant elements, and printing them to the specified output location.

There are a couple uniform properties of a build. There’s the mechanism for deriving a source, given a location string (that may be querying a server, it may be reading a file, it may be something even more exotic - we specify this as an arbitrary command with interpolation). There’s also the root of the output directory.
