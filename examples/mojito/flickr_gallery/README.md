Notes
=====

This file functions as instructor notes and script. It is designed with the instructor of the course in mind, although there is no harm in sharing it with any participants.



Convert Markdown format to HTML or PDF
--------------------------------------

Markdown may, or may not, be pleasant to you. The following is my current method of producing a very pretty .pdf version of this markdown file:

    # Install node.js
    #     http://nodejs.org
    # Install gfms from:
    #     https://github.com/ypocat/gfms
    # with:
    npm gfms -g
    
    # then....
    cd directory/of/file.md
    gfms -p 8080
    
    # Navigate chrome browser to http://localhost:8080
    # select the markdown doc, likely README.md
    #
    # save as html or print as pdf from the browser.
    #
    # I prefer to save with background colors
    # but not with headers and footers. Makes for a nice pdf.

I'd recommend distributing the `notes/README.md` and the `notes/LABS.md` as pdfs.



Distribution of class files
---------------------------

There should be a `class/` folder that gets delivered to the participants as the class starts.

What should be added to the class folder:

* `notes/resources/*` -> `class/resources/`
* `notes/skeletal_files/*` ->  `class/skeletal_files/`
* `notes/LABS.md` -> `class/LABS.md`



Multi-session format and checklist
----------------------------------

This class was designed to be a multi-session class. 3 sessions, to be exact, each of them 2 hours, and each of them virtual/webinar format.

It is difficult to judge the exact timing of each webinar session, as questions are encouraged during the sessions.

**At the end of each session**

* Zip up the `flickr_gallery` with whatever code is in it and distribute to the participants.
* Review the assignment to be done before the next class.
* Come to the next session with questions.

**At the beginning of each session that is not the first**

* Hand out the suggested solution to the assignment.
* Review the suggested solution to the assignment.
* Respond to any questions about the assignment.
* Proceed on the `flickr_gallery` from where we left off in the previous session.



Class Startup
-------------

* Launch `slides/index.html` in a browser and review with the participants. 
    * Information about the slides is contained in `slides/README.md`
* Review the `class/resources/yinst.txt` file to show people how to install Mojito (in case they have not).
* Review the `class/resources/basics.txt` file and point to the various documentation locations. Participants might want them between the class sessions.
* The `skeletal_files` folder contains annotated files that will aid participants of the class at specific moments of the class. Often these files contain comments and notes, even where they shouldn't (for example, .json files do not allow for comments). These files are not necessarily designed to be cut-and-pasted into existing source code, but rather they are included as a reference aid.
* After review of the resources, start coding (and continue on with this document).

:)



A last few notes about the flickr_gallery and about the notes
-------------------------------------------------------------

The flickr_gallery makes use of Jeremy's flickr API Key. For reference, it is:
    
    Mojito Demo Application for Yahoo!
    Key: d603eeba3b0eb45badcac352983d1b10
    Secret: c2795b9ff9a029b5 

It's quite possible that if this key gets abused that it will get revoked. We'll take that chance, and I'll just generate another key if that happens. At the time of this writing, the URL to generate an API key is at:

    http://www.flickr.com/services/api/misc.api_keys.html

Also, in the notes below, when referring to class files, I shorten a lot of the file references by the following rules:

* If the file being modified is inside of the `mojits/` directory, I often leave off the `mojits`. This should become very apparent as it (should) be difficult to mistake one file for another.



flickr gallery, let's code!
---------------------------

The in class walkthrough that will span the entire webinar involves making a flickr gallery, and this (quite long) description will walk through the various steps of using Mojito to build the flickr gallery. This example isn't really about building a flickr gallery, this example is really about exercising Mojito and getting people used to how Mojito works. As with all educational examples, sometimes we won't do things exactly as we would in production because we want to demonstrate the functionality of the Mojito system as much as possible.



Show the completed application
------------------------------

At this point, it is assumed that everyone has a correctly installed Mojito framework, and has a copy of the completed application. I think it's best to show everyone the completed version first. Have everyone navigate to the completed version, and run the following command from the commandline:

    mojito start

This is a good time to note that mojito is not overly picky where you try to run `mojito start` from. Always run `mojito start` from the base of the app directory, and nowhere else, otherwise things will not work.



Starting off
------------

Warn people at this point that the webinar portion of the class will likely need to move too quickly during some portions of the class, as it is assumed that most people are merely viewing the webinar portion. It is the choice of the presenter how they wish to run things, but one thing I'd suggest doing is publishing the steps that you use to make your flickr gallery application for each section of the webinar. That way, during a recap before turning people loose to try things on their own, they can have a list of commands and a reference point, as well as code that they can cut and paste and modify vs. starting truly from a blank slate.



Creating our application
------------------------

Mojito comes with a `mojito` commandline tool that we've already seen. We want to use that tool to create our new application. You, and anyone following along, will want to run this command in a directory where it is okay for Mojito to create some folders and files.

Once you are in a safe location, from the commandline run:

    mojito create app flickr_gallery
    cd flickr_gallery
    mojito create mojit composite

This does some things.

* We get a folder named `flickr_gallery` that contains a basic set of files for building our Mojito app.
* It creates our first mojit named composite.
* It gives us some code to run.
    
Before anything else, let's try out the code that Mojito created for us. This is the equivalent of a hello world program for mojito. Making sure we are located in the newly created `flickr_gallery` directory, run:

    mojito start

And we should see some console output. As long as mojito started correctly, open up a web browser and go to the following URL:

    http://localhost:8666/@composite/index

Note that this isn't the usual way that we'll have people access our mojito application, but is a way we can make sure that mojito is at least working. If people are curious what we are doing, we are hitting the mojito server, and requesting that an anonymous instance of the composite mojit be created (indicated by the '@' sign), and that we access the index method of the composite mojit.



Defining our application routes
-------------------------------

A mojito application, as with most web applications, are defined by the URLs that access them, as well as the way different URLs are handled. To define how our application handles urls, we make changes to the `routes.json` file. JSON files are very stringent on what they allow inside of them (despite that the Mojito doc says they allow regular JavaScript comments, which in my testing they don't).

Open up the `routes.json` file and make the file look like the following:

```json
[
    {
        "settings": ["master"],
        "flickr_gallery entrypoint": {
            "verbs": ["get"],
            "path": "/(index\\.htm[l]?|)",
            "call": "composite.index"
        }
    }
]
```

The label `flickr_gallery entrypoint` is arbitrary and for our own documentation
purposes.

With routes.json, we are telling the mojito server to: 

* Handle HTTP GET requests to the following paths (via regex):
    * /
    * /index.htm
    * /index.html
* Forward these to the index method on our composite mojit.

Note that verbs is an array of strings, and `get` and `post` are supported out of the box. Also note the double backslash-escape in the path. Path can be a regular expression, and if it is, and it uses backslashes, we need to double backslash (once for the JSON string, once for the RegEx engine).

Restart the mojito server and go to our much easier to remember url:
    
    http://localhost:8666/

And notice the error we get. This is expected, because we haven't yet created an instance of the composite mojit in our application configuration.



Defining our application hierarchy
----------------------------------

The `application.json` file allows us to configure the hierarchy of our mojits within our application. (Note: the only change is the "spec" object, and it is assumed that, unless the facilitator is super facile with Mojito that they'll copying-pasting all of the .json changes):

```json
[
    {
        "settings": [ "master" ],
        "appPort": "8666",
        "specs": {
            "composite": {
                "type": "composite",
                "config": {
                    
                }
            }
        }
    },
    {
        "settings": [ "environment:development" ], 
        "staticHandling": {
            "forceUpdate": true
        }
    }
]
```

Hierarchically we've created an instance of our `composite` mojit and given it the same name as our mojit using the `type` keyword. All mojits can be `config`ured, and we will configure our container in the upcoming future.

Try running mojito again and see what happens when we visit:

    http://localhost:8666/

We should see the same definition list that we saw awhile ago in our hello world. Excellent! That's exactly what we should see.



The Mojito MVC
--------------

Mojito enforces a Model View Control type of software architecture, and this is expressed keenly in the mojits. We can think of the app that we created with `mojito create app flickr_gallery` as our server that is in charge of our page.

We can think of each mojit we create with `mojito create mojit composite` as one module (hence "mojit", pronounced like "modjit", like "module"), and the modules are where the majority of Mojito's MVC is prescribed.

In general, and in our examples, all mojits will be located in the `mojits` directory. Each mojit will have its own directory, as such our composite mojit is located in `mojits/composite`.

Let's take a look at how our current composite mojit is working. Open up the file `composite/controller.server.js` and make note of a few things.

* Every mojit should have one controller.
* The naming convention for the controller is controller.{affinity}.js where {affinity} can be `common`, `server`, or `client`.
* The affinity determines where our file runs, and we'll take a look at it later. For now, we note that this code will only run on the server side.

Inside of the file we should see something that looks like the following (note, I stripped the comments out, and anyone following along will see extra comments, as will you if you're doing this from scratch):

```javascript
YUI.add('composite', function(Y, NAME) {
    
    Y.namespace('mojito.controllers')[NAME] = {
        index: function(ac) {
            ac.models.get('compositeModelFoo').getData(function(err, data) {
                if (err) {
                    ac.error(err);
                    return;
                }
                ac.assets.addCss('./index.css');
                ac.done({
                    status: 'Mojito is working.',
                    data: data
                });
            });
        }
    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'compositeModelFoo']});
```

Some things should stand out:

* Mojito uses the YUI framework on the client and server. This:
    * Makes the code more familiar to YUI users (hence, the Yahoo! employees).
    * Makes the code more (although not perfectly by anymeans) transferrable between client and server. (This is due to the inherent and purposeful fact that while Node.js and the browser both speak ECMAScript, Node.js doesn't know what the DOM is, and the browser doesn't know what file IO is, among other things.)
* The controller is a YUI module, and we are requiring mojito specific libraries (more on that in the near future).
* There is a certain, although not enforced, naming convention within the modules. The controller carries the module name of our mojit.
* We can finally see the index method that is handling our request that we defined in routes.json.
* Every HTTP request is (ideally) passed off to a method on one of our mojit controllers.
* While there might be many functions called and objects created along the way to serving a response to an HTTP request, the initial function is where we receive an `ActionContext`, which is often abbreviated as `ac`. The ActionContext wraps up request, response, configuration, and essentially acts as our [god object](http://en.wikipedia.org/wiki/God_object) so that we don't need too many global variables, or need to create additional modules during the life cycle of our request.

That's the Controller part of our mojito MVC, let's take a look at the Model part. Open up the `composite/models/foo.server.js` file. We should see something like this:

```javascript
YUI.add('compositeModelFoo', function(Y, NAME) {

    Y.namespace('mojito.models')[NAME] = {

        init: function(config) {
            this.config = config;
        },

        getData: function(callback) {
            callback(null, { some: 'data' });
        }

    };

}, '0.0.1', {requires: []});
```

Some things to note:

* The naming convention for our model file is {model_name}.{affinity}.js,  where {model_name} is the name we use to refer to our model in mojit, and where {affinity} can be common, server, or client.
* The naming convention is not enforced for the module, but is suggested.
* While this code is synchronous, it is assumed that the model will likely employ asynchronous data fetching, and as such we (might) pass a callback to the model retrieval system.
* The callback methodology is inspired by a standard Node.js pattern: if there is an error it is passed back as the first parameter, and any actual data is returned in the second and beyond parameters.

Let's change the object that gets passed back so that our code looks like:

```javascript
YUI.add('compositeModelFoo', function(Y, NAME) {

    Y.namespace('mojito.models')[NAME] = {

        init: function(config) {
            this.config = config;
        },

        getData: function(callback) {
            // BEGIN CHANGED CODE
            callback(null, { name: 'hello world', age: 'fossil' });
            // END CHANGED CODE
        }

    };

}, '0.0.1', {requires: []});
```

Now that we've modified our model a bit, let's take a look at what Mojito calls views.

Views are traditionally located in the `views` folder of the mojit. The views use [Handlebars](http://handlebarsjs.com/), specifically [YUI Handlebars](http://yuilibrary.com/yui/docs/handlebars/). Handlebars is a superset of [Moustache](https://github.com/janl/mustache.js).

Essentially views in Mojito terminolgy are string templates, where what we are templating out is our HTML that will be viewed on the page. In the MVC world, why we don't write HTML in our JavaScript is merely to support a separation of concerns, and realistically because maintaining HTML written in JavaScript is horrid.

Let's open up the `composite/views/index.hb.html` file. It should look something like this:

```html
<div id="{{mojit_view_id}}">
    <dl>
        <dt>status</dt>
        <dd id="dd_status">{{status}}</dd>
        <dt>data</dt>
        <dd id="dd_data">
            <b>some:</b> {{#data}}{{some}}{{/data}}
        </dd>
    </dl>
</div>
```

Some things to note:

* The name of the file is traditionally {congtroller_method}.{rendering_engine}.html. The name is meaningful, and in this case the prefix `index` ties this file to the `index` method in the `controller.server.js`. In other words, it is the default template for the method named `index`.
* Being Handlebars, which is a Moustache derivative, tokens that are meant to be replaced are surrounded by two sets of curly braces. 
* Traditionally mojits views are wrapped in a div with an implicitly provided `id={{mojit_view_id}}`. This is something you'll want to do if you are taking advantage of binders (we will talk about soon).
* Data that are not wrapped in curly braces simply falls through. So all the HTML here will show up in the output no matter what data we pass in.

Let's modify our code to use the information supplied by our model:

```html
<div id="{{mojit_view_id}}">
    <span class="label">{{data.name}}</span>: {{data.age}}
</div>
```
    
Awesome! Now let's go back to our controller and just take a glance at everything before we fire this up again. Note the flow of the controller:

* Right now, everytime our server gets an HTTP request to one of our basic urls, the request is redirected to the composite.index function.
* The function is called, and an instance of ActionContext is passed to the function.
* The ActionContext, being a god object, has access to everything we need. We take advantage of that by calling the method `ac.models.get('compositeModelFoo').getData` and pass it a callback function.
* In the callback, which is a bit overkill for us, we check for errors (which will never happen in our code).
* Since we have no error, our code attempts to attach a CSS file (we'll look at this in a bit).
* Finally, we call the all powerful `done` method on the ActionContext. We pass an object to this method, and here we see a couple of things happen.
* The fact that our function is named `index` automatically ties our output to the Handlebars view `index.hb.html`.
* The context object that Handlebars uses to search and replace data is passed in as the first argument. Since we're attaching our model data to the `data` property, this is how we get the reference to `{{data.name}}` and `{{data.age}}` in our view.
* Our view will search and replace `{{data.name}}` and `{{data.age}}` with their respective values (`status` gets harmless ignored in our current example).
* This processed HTML is what gets passed back to the client.

Try this out and make sure it works. Excellent work! That's the basic flow of how mojito works as a web server/web service.



Adding assets, and the HTMLFrameMojit
-------------------------------------

We can have global assets and per mojit assets. As we saw in our `controller.server.js`, we were calling the method `ac.assets.addCss('./index.css');`. Per mojit assets are located in the `mojits/{mojit_name}/assets` folder. 

Let's open up our `composite/assets/index.css` file. Whatever is in there, delete it and add:

```css
.label {
    font-size: 300%;
    color: pink;
}
```

We're not using this because it is pretty, we just want to make sure things are working. 

Fire up mojito, and see if anything has changed. It hasn't? What gives? Well, there's a couple of things going on with the automaticity of Mojito.

* If we open up a debugger and look at the DOM view of the page, notice that we really don't have an HTML page. We have the literal output of our mojit view, but that is all. No title, no nothing.
* The reason we aren't seeing our CSS is because there is no place for it to be injected into our page.
* What we are missing is a framework HTML scaffolding the Mojito expects.

The default, out of the box scaffolding is called the `HTMLFrameMojit`. It's probably a poor choice of names, but don't worry, it has nothing to do with iframes or Framesets. The HTMLFrameMojit is an included mojit that we can make use of in our `application.json` file, so lets do that. Open up the file and update the file to look like the following:

```json
[
    {
        "settings": [ "master" ],
        "appPort": "8666",
        "specs": {
            "frame": {
                "type": "HTMLFrameMojit",
                "config": {
                    "deploy": true,
                    "title": "flickr gallery",
                    "child": {
                        "type": "composite",
                        "config": {
                            
                        }
                    }
                }
            }
        }
    },
    {
        "settings": [ "environment:development" ], 
        "staticHandling": {
            "forceUpdate": true
        }
    }
]
```

As always, things to note:

* The HTMLFrameMojit provides the basic HTML scaffolding for our page that we were previously missing.
* We didn't `mojito create mojit HTMLFrameMojit` because it is a default mojit (one of the very few).
* The name `frame` is arbitrary. I'm using it here because it shows up in the docs a lot, that is all.
* All mojits can have a config, and the HTMLFrameMojit is no exception. Here we make two special declarations that the HTMLFrameMojit makes use of:
    * `"deploy": true` tells mojito to push client side code to the client. Also important for binders.
    * `"title": "flickr gallery"` is consumed by the HTMLFrameMojit and is placed in the title tag of the HTML page.
    * HTMLFrameMojits can have a single child. Any request passed to the HTMLFrameMojit are simply passed on to the child mojit.
    * We don't refer to the composite mojit by name anymore, merely as a reference as the child of the HTMLFrameMojit.

Let's try running this but we'll get an error. Any guesses why?

If anyone guessed because the `routes.json` is now incorrectly configured is correct. Let's go back and change `routes.json` to correctly point to our defined mojit of "frame" which is an instance of the HTMLFrameMojit.

```json
[
    {
        "settings": ["master"],
        "flickr_gallery entrypoint": {
            "verbs": ["get"],
            "path": "/(index\\.htm[l]?|)",
            "call": "frame.index"
        }
    }
]
```

Note that the only thing we changed was the call value from `"composite.index"` to `"frame.index"`.

Try running mojito again, and all should work. Not only does it work, but our CSS asset is now able to be included in the page.

Summary: while you don't have to use the HTMLFrameMojit in production (there is an example in the doc about rolling your own HTMLFrameMojit), Mojito does expect some sort of page scaffolding/framework to hold our assets and our client side JavaScript code.



Running basic client side code via binders
------------------------------------------

Many content heavy applications only need basic client side JavaScript interactions. Mojito uses what it calls binders, which I see as simply part of the View when kept simple. 

Let's open up the `composite/binders/index.js` file in the composite mojit and change it so that it looks like the following.

```javascript
YUI.add('compositeBinderIndex', function(Y, NAME) {

    Y.namespace('mojito.binders')[NAME] = {

        init: function(mojitProxy) {
            this.mojitProxy = mojitProxy;
        },

        // CODE CHANGE
        // Complete change to the bind code.
        bind: function(node) {
            node.one(".label").on("mouseenter", function(e) {
                this.transition({
                    backgroundColor: "pink",
                    color: "white"
                });
            });
            node.one(".label").on("mouseleave", function(e) {
                this.transition({
                    backgroundColor: "white",
                    color: "pink"
                });
            });
        }

    };
// CODE CHANGE
// We added the 'transition' module. Any YUI modules can be added.
// It is assumed the 'event-mouseenter' module is there from the default
// template, otherwise we would need to add it.
}, '0.0.1', {requires: ['transition', 'event-mouseenter', 'mojito-client']});
```

Some things to know about binders.
* Binders need to be "deployed" to the client, and hence why we set `"deploy": true` in application.json.
* Binders are client side only code. They do not have affinities like controllers and models.
* The name of the binder is significant. If the `index` method is servicing our request (as indicated in `routes.json`), than the `index.js` binder will automatically be sent to the client to run.
* The binder runs after the content is ready, and is handed the containing node of our mojit within the bind method (this happens automatically). This node is whatever node contains the `id="{{mojit_view_id}}"` attribute.

Run the code. Mouse over the label, and things should work.



Summary so far
--------------

That was a very fast review of Mojito and many of its pieces. So far we have seen:

* Mojito is an amalgam of YUI + Node.js + Handlebars + other things.
* Mojito is very web centric.
* There is a mojito commandline that can create the basic files we need to structure our application.
* A mojito application defines our server and how it interacts with HTTP requests via the `routes.json` file.
* A mojit is a module of our application.
* We define the basic layout of modules in our application through the `application.json` file, along with expected as well and custom configurations.
* Each mojit has a central controller defined by the controller.{{affinity}}.js file. The controller is the first stop for incoming HTTP requests.
* Each mojit can have N number of models, and these models ideally define the atomic data units of our application.
* Each mojit has a set of views that are simple Handlebar templates. The views are tied to the controller method being called by default.
* Each mojit can have a set of client side only code called binders that are also tied to the controller metho being called by default. 
* Mojito supplies some basic implicit behavior, but that implicit behavior still needs to be guaranteed by us the developers (using things like the HTMLFrameMojit and id'ing our mojit containers).

Knowing the division of labor, let's get to work building a fuller sample application.



Setting up for the future
-------------------------

Let's go back to our application folder and set ourselves up with the mojits that we'll be using before we go any further. Some of these mojits we won't immediately use, but let's create them all now:

    mojito create mojit gallery
    mojito create mojit detail
    mojito create mojit comment

The purpose of our composite mojit is going to become clearer in just a moment. The idea of composite mojit in mojito is a mojit that contains children. We're going to use our composite mojit as the general layout of our page. What we want to do is to setup the relationships between all of our mojtis, and we'll do that within the `application.json` file. Open it now and make the following changes (**note: the changes are only to the config of the already existing composite mojit, although the entire application.json file is listed below**):

```json
[
    {
        "settings": [ "master" ],
        "appPort": "8666",
        "specs": {
            "frame": {
                "type": "HTMLFrameMojit",
                "config": {
                    "deploy": true,
                    "title": "flickr gallery",
                    "child": {
                        "type": "composite",
                        "config": {
// BEGIN CHANGES. Remember, JSON files don't allow comments....
                            "children": {
                                "gallery": {
                                    "type": "gallery"
                                },
                                "detail": {
                                    "type": "detail"
                                },
                                "comment": {
                                    "type": "comment"
                                }
                            }
// END CHANGES.
                        }
                    }
                }
            }
        }
    },
    {
        "settings": [ "environment:development" ], 
        "staticHandling": {
            "forceUpdate": true
        }
    }
]
```

A couple of notes to remember.

* The names we give the instances of our mojits in the `application.json` file do not have to match the names of the mojits, even though they do in our case (our mojits are more like singletons than multi-use classes).
* All three of our mojits are now manageable by our composite mojit, but they are not yet used by our composite mojit.



Changing our composite mojit into a real composite mojit
--------------------------------------------------------

Let's open up our `composite/controller.server.js` file and make the changes noted below:

```javascript
YUI.add('composite', function(Y, NAME) {
    
    Y.namespace('mojito.controllers')[NAME] = {
        index: function(ac) {
            // CODE CHANGE
            // Remove all the currently existing code inside of index.
            // replace with just the following.
            ac.composite.done();
        }
    };
// CODE CHANGE
// We need to include a new module: 'mojito-composite-addon'
}, '0.0.1', {requires: ['mojito', 'mojito-composite-addon', 'mojito-assets-addon', 'mojito-models-addon', 'compositeModelFoo']});
```

What we did here:

* We changed our composite mojit into a real composite mojit, in which we delegate most of the work to our child mojits.
* The mojito team is continually working on performance improvements. One way to improve performance is to only load modules that are absolutely needed, so mojito modules have moved towards an "ask for permission" approach. In other words, if you need functionality, you'll likely need to include it. (As can be seen with the mojito-assets-addon and the 'mojito-models-addon' that is already included.)

The changes we have made aren't visible yet, because the mojits are structured according to our `composite/views/index.html` file. Let's open that file up right now and make the following changes to it (which is almost a complete rewrite of the file):

```html
<div id="{{mojit_view_id}}">
    <h1 id="header">flickr gallery</h1>
    <div id="main">
        <div class="column">{{gallery}}</div>
        <div class="column">{{detail}}{{comment}}</div>
    </div>
    <div id="footer">Produced by us. If there is a bug, we'll fix it (eventually).</div>
</div>
```

There's a minor bug here, but it gives us a chance to see another way handlebars works.

* When we call `ac.composite.done()` we are dispatching a call to each of our child mojits own `.index()` methods.
* Each of our child mojits, right now, are returning HTML to the parent mojit.
* The composite mojit determines where this html goes by the names given to the child mojits, and lays out the template according to their names.
* For safety reasons, handlebars by default escapes HTML strings, and we have to tell Handlebars to show the HTML as is.

Since our HTML is good (since we know because we are writing it), let's rewrite our mojit template to be the following:

```html
<div id="{{mojit_view_id}}">
    <h1 id="header">flickr gallery</h1>
    <div id="main">
        <div class="column">{{{gallery}}}</div>
        <div class="column">{{{detail}}}{{{comment}}}</div>
    </div>
    <div id="footer">Produced by us. If there is a bug, we'll fix it (eventually).</div>
</div>
```

Note the "triple-stache". That's all we have to do to get the unescaped HTML to display correctly.

If you were watching the debugger carefully, we will have a bug an need to turn off our old binder. For now, open `composite/binders/index.js` and comment out the entire contents of the `.bind()` method like so:

```javascript
YUI.add('compositeBinderIndex', function(Y, NAME) {

    Y.namespace('mojito.binders')[NAME] = {

        init: function(mojitProxy) {
            this.mojitProxy = mojitProxy;
        },

        bind: function(node) {
        // BEGIN CODE CHANGE
            // node.one(".label").on("mouseenter", function(e) {
                // this.transition({
                    // backgroundColor: "pink",
                    // color: "white"
                // });
            // });
            // node.one(".label").on("mouseleave", function(e) {
                // this.transition({
                    // backgroundColor: "white",
                    // color: "pink"
                // });
            // });
        // END CODE CHANGE
        }

    };
}, '0.0.1', {requires: ['transition', 'event-mouseenter', 'mojito-client']});
```

And run things again. We should be good to go and error free again.



Defining some page level configuration
--------------------------------------

All web applications will require some pixel pushing. Let's add in a minor CSS reset that should apply to our entire application. To do so, let's create a file `flickr_gallery/assets/reset.css`. Inside of this file, let's add a very simple CSS reset:

```css
* {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

body, html {
    padding: 0;
    margin: 0;
}

p, h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
}

a {
    text-decoration: none;
}
```

By itself, this won't do anything. Let's inform our HTMLFrameMojit that it should include our asset at the top level:

```json
[
    {
        "settings": [ "master" ],
        "appPort": "8666",
        "specs": {
            "frame": {
                "type": "HTMLFrameMojit",
                "config": {
                    "deploy": true,
                    "title": "flickr gallery",
// BEGIN JSON CONFIG CHANGE (remember to not add these comments).
                    "assets": {
                        "top": {
                            "blob": [
                                "<meta name='viewport' content='width=device-width, initial-scale=1.0'>"
                            ],
                            "css": [
                                "/static/flickr_gallery/assets/reset.css"
                            ]
                        }
                    },
// END JSON CONFIG CHANGE
                    "child": {
                        "type": "composite",
                        "config": {
                            "children": {
                                "gallery": {
                                    "type": "gallery"
                                },
                                "detail": {
                                    "type": "detail"
                                },
                                "comment": {
                                    "type": "comment"
                                }
                            } 
                        }
                    }
                }
            }
        }
    },
    {
        "settings": [ "environment:development" ], 
        "staticHandling": {
            "forceUpdate": true
        }
    }
]
```

We have just told mojito to add:

* A link tag containing this CSS file to the top of our page (in the head tag).
* Use a mapping to our existing file. Mojito can make use of the following mappings for assets:

        /static/{application_name}/assets/{asset_file}
        and
        /static/{mojit_name}/assets/{asset_file}

* The blob argument is a way of directly injecting things into the head tag as is. Here we add a meta viewport tag that can aid us when doing responsive layout on mobile devices.

Try out the code. Use a DOM explorer to see if the meta viewport tag was added (which it should have been).



Modularization of our page with Handlebars partials
---------------------------------------------------

It's a bit overkill for our application, let's modularize the HTML templating a bit for our application. Handlebars, and Mojito, use the concept of parials, which are partial templates that can be reused in our templates. Partials go in the following locations:

    global partials go here:
    {app_dir}/views/partials/
    
    mojit specific partials go here:
    {app_dir}/mojits/{mojit_name}/views/partials/

Let's make a copyright partial in a file that we're about to create here:

    flickr_gallery/views/partials/copyright.hb.html

Add the small amount of template code:

```html
<small>Copyright &copy; {{copyrightYear}}</small>
```
    
Modify our `composite/views/index.hb.html` to include it:

```html
<div id="{{mojit_view_id}}">
    <h1 id="header">flickr gallery</h1>
    <div id="main">
        <div class="column">{{{gallery}}}</div>
        <div class="column">{{{detail}}}{{{comment}}}</div>
    </div>
    {{! NEW CODE: Add the copyright partial. }}
    <div id="footer">{{> copyright}} We don't always test our code, but when we do, we test it in production.</div>
    {{! END NEW CODE }}
</div>
```
    
Modify our `composite/controller.server.js` to include the date:

```javascript
YUI.add('composite', function(Y, NAME) {
    
    Y.namespace('mojito.controllers')[NAME] = {
        index: function(ac) {
            // BEGIN CODE CHANGE
            // We pass data to our parent template by doing the
            // following.
            ac.composite.done({
                copyrightYear: new Date().getFullYear()
            });
            // END CODE CHANGE
        }
    };
}, '0.0.1', {requires: ['mojito', 'mojito-composite-addon', 'mojito-assets-addon', 'mojito-models-addon', 'compositeModelFoo']});
```

In summary:

* Partials fragment our template code, but can be very useful when we need to repeat a lot of template information and we don't want to rewrite it (DRY method).
* Partials can be global (as in our example), or local to a particular mojit. Global partials are just that: global across our app and any template can use them.
* The usage of a partial has slightly different handlebars syntax.

        {{> partialName}}

* Partials have access to the context content where they're used.
* We can pass information to composite mojit templates through ac.composite.done, as we did above.



Configuring our Mojits
----------------------

Mojits can read arbitrary configuration that we set in our `application.json` file. Let's add the following, which despite sounding official, is an arbitrary key:value pair in Mojito:

```json
[
    {
        "settings": [ "master" ],
        "appPort": "8666",
        "specs": {
            "frame": {
                "type": "HTMLFrameMojit",
                "config": {
                    "deploy": true,
                    "title": "flickr gallery",
                    "assets": {
                        "top": {
                            "blob": [
                                "<meta name='viewport' content='width=device-width, initial-scale=1.0'>"
                            ],
                            "css": [
                                "/static/flickr_gallery/assets/reset.css"
                            ]
                        }
                    },
                    "child": {
                        "type": "composite",
                        "config": {
// BEGIN CODE CHANGE (remember, no comments in JSON files)
                            "header": "flickr gallery",
// END CODE CHANGE
                            "children": {
                                "gallery": {
                                    "type": "gallery"
                                },
                                "detail": {
                                    "type": "detail"
                                },
                                "comment": {
                                    "type": "comment"
                                }
                            } 
                        }
                    }
                }
            }
        }
    },
    {
        "settings": [ "environment:development" ], 
        "staticHandling": {
            "forceUpdate": true
        }
    }
]
```

In `composite/controller.server.js` let's make use of this:

```javascript
YUI.add('composite', function(Y, NAME) {
    
    Y.namespace('mojito.controllers')[NAME] = {
        index: function(ac) {
            ac.composite.done({
                // BEGIN CODE CHANGE
                // Add another key:value pair (plus comma)
                // Access the config through the action context.
                copyrightYear: new Date().getFullYear(),
                header: ac.config.get("header")
                // END CODE CHANGE
            });
        }
    };
// ADD ANOTHER MODULE
// this time it's 'mojito-config-addon'
}, '0.0.1', {requires: ['mojito', 'mojito-config-addon', 'mojito-composite-addon', 'mojito-assets-addon', 'mojito-models-addon', 'compositeModelFoo']});
```

In `composite/views/index.hb.html` let's make use of the setting:

```html
<div id="{{mojit_view_id}}">
    {{! CODE CHANGE: Replace the hard coded header with this.}}
    <h1 id="header">{{header}}</h1>
    {{! END CODE CHANGE.}}
    <div id="main">
        <div class="column">{{{gallery}}}</div>
        <div class="column">{{{detail}}}{{{comment}}}</div>
    </div>
    <div id="footer">{{> copyright}} We don't always test our code, but when we do, we test it in production.</div>
</div>
```

Summary:

* The configuration is accessible to any mojit via the `mojit-config-addon` and the `actionContext.config.get()` method.
* We only made use of our own config setting, but we could make use of any and all part of the configuration.



Styling our page
----------------

Mojits can also have some per mojit styling. Let's open up our `composite/assets/index.css` again. Delete what is there and add the following:

```css
#header {
    padding: 1em;
    text-align: right;
    background-color: #ee22ee;
    color: #eee;
    
    box-shadow: 0 3px 4px #bbb, 0 2px 1px #aaa;
}

#main {
    width: 90%;
    margin: 1em auto;
    overflow: auto;
}

.column {
    width: 50%;
    float: left;
    padding: 0.3em;
}

#footer {
    color: #888;
    text-align: center;
}

@media only screen and (max-width: 768px) {
    #main {
        width: 95%;
    }
    .column {
        width: 100%;
        float: none;
    }
}
```

Open up our `composite/controller.server.js` and make the following change:

```javascript
YUI.add('composite', function(Y, NAME) {
    
    Y.namespace('mojito.controllers')[NAME] = {
        index: function(ac) {
            // BEGIN CODE CHANGE
            // This code was actually here previously. We're adding it
            // back in to make correct use of it.
            ac.assets.addCss('./index.css');
            // END CODE CHANGE
            ac.composite.done({
                copyrightYear: new Date().getFullYear(),
                header: ac.config.get("header")
            });
        }
    };
}, '0.0.1', {requires: ['mojito', 'mojito-config-addon', 'mojito-composite-addon', 'mojito-assets-addon', 'mojito-models-addon', 'compositeModelFoo']});
```

Summary of what just happened:

* We included our mojit specific css, which ends up getting injected as a link tag in the head.
* The name of the mojit specific CSS can actually be anything, the fact that it is index.css is arbitrary.
* Mojito is all about mobile, but it enables mobile in the world of network connectivity (and this will be fulfilled as time goes on). Mobile layouts are up to us.
* We make use of a very simple media query with our very simple CSS to allow us to have a two column page in larger views and a 1 column page in smaller views.
* This is just enough CSS to get us moving in the right direction.
* That earlier meta viewport we added now makes a difference. It will allow mobile devices, in particular hi-rez and iPhones to drop down to a single column by default.

If we haven't tried out the code, try out the code, and make sure to shrink the browser down to see things drop from 2 columns to 1 column.



Retrieving detailed flickr data from YQL
----------------------------------------

The Yahoo!/Mojito suggested method for getting data from a web service into your Mojito application is YQL (Yahoo! Query Language). Granted, in real life you might develop your own, direct access web service (maybe you need the extra speed, maybe you are working on a secret project, etc.), but for this example we will use YQL to get us some image data from flickr and display the detailed content in the detailed mojit.

Depending on our application constraints, our models might be lightweight or more complex extensions of YUIs Module module.

First stop `gallery/models/foo.server.js`. In real life, I'd change the model name, but for this example, foo is just fine. Make the following changes (which is essentially a rewrite of the getData command):

```javascript
YUI.add('galleryModelFoo', function(Y, NAME) {

    Y.namespace('mojito.models')[NAME] = {

        init: function(config) {
            this.config = config;
        },

        // We changed the signature. The first argument is the callback
        // for this async query. The second is our query string that
        // we are not passing in yet.
        getData: function(callback, query) {
            // Please note that this is my API key for this class.
            // Please get your own API key if you wish to play with flickr
            // outside of this class.
            // Note the array join that adds spaces where we need them.
            // Note the {query} token. This is not Handlebars, but we'll
            // use replace this token with our query.
            var yql = ["select farm,server,id,secret",
                "from flickr.photos.search where",
                "text='{query}'", 
                "and api_key='d603eeba3b0eb45badcac352983d1b10'",
                "limit 10"].join(" ");
            
            // YQL is async and we need to handle the response in a
            // callback. For now, we write this so we can make sure
            // the query works.
            var yqlCallback = function(response) {
                // Node version 0.8 util.inspect API signature.
                // first null means don't show hidden.
                // second null means crawl the entire object, no matter what.
                // Note: Since we are on the server, we can make full use
                // of node.js modules.
                console.log(require("util").inspect(response, null, null));

                // If we do not respond to the controller, our query
                // will not complete and we'll hang/timeout.
                callback(null, {});
            };

            // For our example, use a default of chicken.
            query = query || "chicken";
            // Replace the query token with our own token.
            yql = Y.Lang.sub(yql, { "query": query });
            
            // Initiate the YQL call.
            Y.YQL(yql, yqlCallback);
        }

    };

// Need to add the yql module to get things working.
}, '0.0.1', {requires: ['yql']});
```

The summary of what we are doing is located up in the code comments.

Run this and take a look at the console output in the terminal. We should be able to see what the YQL response object looks like, and we can get a sense of how to put together our template.

If everything is working, let's make the model do what we really want it to do. Modify the yqlCallback to be the following:

```javascript
YUI.add('galleryModelFoo', function(Y, NAME) {

    Y.namespace('mojito.models')[NAME] = {

        init: function(config) {
            this.config = config;
        },

        getData: function(callback, query) {
            var yql = ["select farm,server,id,secret",
                "from flickr.photos.search where",
                "text='{query}'", 
                "and api_key='d603eeba3b0eb45badcac352983d1b10'",
                "limit 10"].join(" ");
                
            // CHANGED CODE
            // Signature is the same, but now we respond to the controller.
            var yqlCallback = function(response) {
                try {
                    callback(null, response.query.results.photo);
                }
                catch(e) {
                    callback(new Error("Unable to reqtrieve yql results from: " + yql), null);
                }
            };

            query = query || "chicken";
            yql = Y.Lang.sub(yql, { "query": query });
            
            Y.YQL(yql, yqlCallback);
        }

    };

}, '0.0.1', {requires: ['yql']});
```

The summary of what we're doing:

* This is a very Node.js way of handling async requests. If the request fails, pass back an error object. If it succeeds, pass back null for error and send the results back.
* We now have enough data to put together our template.



Building the gallery template
-----------------------------

Time to allow the data back from the model through our `gallery/controller.server.js`:

```javascript
YUI.add('gallery', function(Y, NAME) {
    Y.namespace('mojito.controllers')[NAME] = {

        index: function(ac) {
            // BEGIN CODE CHANGES
            // Basically a rewrite of the callback.
            var query = "chicken";
            ac.models.get('galleryModelFoo').getData(function(err, data) {
                ac.assets.addCss('./index.css');
                if (!err) {
                    ac.done({
                        query: query,
                        err: null,
                        photos: data
                    });
                }
                else {
                    ac.done({
                        query: query,
                        err: err,
                        photos: null
                    });
                }
            // remember to pass in our query string.
            }, query);
            // END CODE CHANGES
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'galleryModelFoo']});
```

In summary, we should note that by now what we're doing is pretty obvious but we consciously got rid of calling ac.err(). We don't want to return a broken page, we want our template to be able to respond appropriately.

There isn't anything to test yet, we need to get our template working. Open up `gallery/views/index.hb.html` and change it to:

```html
{{! Entire rewrite. Note the addition of a class to the container. }}
<div id="{{mojit_view_id}}" class="gallery">
    {{#if err}}
    <h2>Sorry, the query for "{{query}}" generated an error: {{err}}</h2>
    {{else}}
        {{#if photos}}
    <h2>Showing {{photos.length}} photos for query "{{query}}"</h2>
    <ul>
            {{#each photos}}
        <li>
            <img 
            src="http://farm{{farm}}.staticflickr.com/{{server}}/{{id}}_{{secret}}_s.jpg"
            data-photo_id="{{id}}"
            width="75" height="75"/>
        </li>
            {{/each}}
    </ul>
        {{else}}
    <h2>Sorry, there were no photos for the query "{{query}}".</h2>
        {{/if}}
    {{/if}}
</div>
```

This is a more complex Handlebars template, and is slightly more akin to what one would use in real life.

* We are using Handlebars built in helpers if and each.
* Any helper that "fails" will default to an else block if it exists.
* Helpers are prefixed with a hash.
* Helpers must have a closing block, like {{/if}}.
* Handlebars increases what it considers falsey compared to JavaScript. For exmple, if the photos array is empty, it will be falsey and fail an if check.
* The data-photo_id="{{id}}" will be useful later.

The way we are building the flickr image url is described at:

    http://www.flickr.com/services/api/misc.urls.html

In the image src URL we are generating, the trailing "_s" is a signal to flicker to give us back a small, square image 75x75 pixel dimensions.

Let's add a bit of styling to `gallery/assets/index.css`:

```css
/* Complete file change. */
.gallery h2 {
    text-align: center;
    background-color: #333;
    color: white;
    padding: 0.5em;
}
.gallery ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
.gallery li {
    text-align: center;
    padding: 0.3em;
}
.gallery li img {
    vertical-align: middle;    
}
.gallery li:nth-child(odd) {
    background-color: rgba(200, 0, 200, 0.5);
}
.gallery li:hover img {
    -moz-transition: -moz-transform 1s;
    -o-transition: -o-transform 1s;
    -webkit-transition: -webkit-transform 1s;
    transition: transform 1s;
    
    -moz-transform: scale(2);
    -ms-transform: scale(2);
    -o-transform: scale(2);
    -webkit-transform: scale(2);
    transform: scale(2);
}
```

A lot of these items are just for fun and aren't backwards compatible with older browsers. Then again, most of the things we are doing won't break older browsers. 

* Browsers will just ignore the nth:child(odd) CSS3 selector and we'll lose the tiger striping.
* The transitions will be ignored by IE9 and below (IE9 supports transforms, but not transitions).
* Images are technically inline elements, so we add a bit of vertical alignment to them to get rid of a bit of unsightly extra whitespace.

Spin this up and try it. Nice work! You now have a gallery.



Watching for user interactions
------------------------------

Our gallery will be relatively simple. If we click on an image, we want to show some details about the image in the details mojit. First, we need to modify the `gallery/binders/index.js` code to publish an event for other mojits when a user clicks on a particular image list:

```javascript
YUI.add('galleryBinderIndex', function(Y, NAME) {
    Y.namespace('mojito.binders')[NAME] = {

        init: function(mojitProxy) {
            this.mojitProxy = mojitProxy;
        },

        // REWRITE the bind method.
        bind: function(node) {
            var mp = this.mojitProxy;
            node.delegate("click", function() {
                var photo_id = this.one("img").getData("photo_id");
                // Broadcast an event to anyone listening.
                // The first argument is the event name.
                // The second argument is the data payload which will
                // be passed to listeners.
                mp.broadcast("image-clicked", {
                    id: photo_id
                });
            }, "li");
        }
    };
// UNNECESSARY CHANGE
// We got rid of the event-mouseenter module. This is not
// needed for our example, but it is good to remember that we should
// cut down on the number of modules loaded on the client side in
// real apps.
}, '0.0.1', {requires: ['mojito-client']});
```

Summary:

* We wait for a click on the list items in our gallery mojit view.
* Since the photo_id is stored in the data-photo_id attribute, we need to use the getData method on YUI.
* The mojitProxy has a few uses on the client side. It acts as an inter-mojit publisher/subscriber event broadcaster. If anyone clicks on our image, we broadcast an "image-clicked" event. The event name is arbitrary.
    * If no one is listening, nothing happens.
    * If another mojit is listening for this event, it can respond to it.
    
Let's set up our second mojit: a details mojit, which we can use to display the details of our flickr image.



Intermojit communication
------------------------

When a user clicks on a particular image, we want to grab and display more detailed information on the client. We will be working inside of our detail mojit to do this.

Let's start with setting up our `detail/models/foo.server.js` model with a YQL request that will garner us the details of a particular image id.

```javascript
YUI.add('detailModelFoo', function(Y, NAME) {

    Y.namespace('mojito.models')[NAME] = {

        init: function(config) {
            this.config = config;
        },
        
        // NOTE: The changes here are very similar to what we did in
        // the gallery foo.server.js. It might be easier to just cut
        // and paste from that and make changes.
        
        // Signature is callback, id.
        getData: function(callback, id) {
            // We request, and get back, a load of data about the image.
            var yql = ["select *",
                "from flickr.photos.info where",
                "photo_id='{id}'", 
                "and api_key='d603eeba3b0eb45badcac352983d1b10'"].join(" ");
            
            var yqlCallback = function(response) {
                // Show the mass amount of data on the first run, if you
                // wish, by using the following Y.log.
                //Y.log(response.query.results.photo);
                try {
                    callback(null, response.query.results.photo);
                }
                catch(e) {
                    callback(new Error("Unable to reqtrieve yql results from: " + yql), null);
                }
            };

            // The id here is a real ID used by the YQL dev console
            // in their example. Use this in a test.
            //id = id || "2439864402";
            // What we really need to use is the following, though,
            // because here we don't want any generic results.
            id = id || "";
            yql = Y.Lang.sub(yql, { "id": id });
            
            Y.YQL(yql, yqlCallback);
        }

    };
// REMEMBER to require yql.
}, '0.0.1', {requires: ['yql']});
```

This should be pretty straight forward by now. We retrieve JSON data asynchronously from a web service and make use of it.

Let's modify our `detail/controller.server.js` to make use of this correctly:

```javascript
YUI.add('detail', function(Y, NAME) {

    Y.namespace('mojito.controllers')[NAME] = {

        index: function(ac) {
            // FUTURE Planning
            // We are going to enable searching for photos via URL
            // paramaters.
            var photo_id = ac.params.getFromMerged("photo_id");
            ac.models.get('detailModelFoo').getData(function(err, data) {                
                ac.assets.addCss('./index.css');
                ac.done({
                    err: err,
                    detail: data
                });
            // By default, this will be an empty string.
            }, photo_id);
        }

    };

// ADD THE MODULE
// mojito-params-addon to allow for retrieval of parameters passed
// to this action.
}, '0.0.1', {requires: ['mojito', 'mojito-params-addon', 'mojito-assets-addon', 'mojito-models-addon', 'detailModelFoo']});
```

Some notes:

* We are getting prepared to return details via a parameterized request.
*  We have simplified our controller in this case because the contract with our model is that the error should always be returned if the request fails (we don't get any details). Our template will actually handle the display logic for us.

Next change `detail/views/index.hb.html`:

```html
<div id="{{mojit_view_id}}" class="detail">
    <h2>Details</h2>
    <ul>
    {{#unless err}}
        <li><strong>Image Details</strong></li>
        {{#with detail}}
        {{#if title}}<li>Title: {{{title}}}</li>{{/if}}
        {{#if description}}<li>Description: {{{description}}}</li>{{/if}}
        {{#if owner.realname}}<li>Owner: {{{owner.realname}}}</li>{{/if}}
        {{#if owner.location}}<li>Location: {{{owner.location}}}</li>{{/if}}
        {{/with}}
    {{/unless}}
    </ul>
</div>
```

* Our details is pretty simple. On the initial view, we should have no details (id="") and as such we show the no details message.
* The #unless helper is equivalent to an `if (!err) {}` in the way we are using it, since there is no `#if not err` helper.
* The #with helper is new, and allows us to change the context of our references. Essentially, for verbose json documents, like a YQL response, this allows us to type less.

Right now if we click on anything, nothing changes. We need to setup our client side to respond to the broadcast event from the gallery. Open up `detail/binders/index.js` and make the changes:

```javascript
YUI.add('detailBinderIndex', function(Y, NAME) {

    Y.namespace('mojito.binders')[NAME] = {

        init: function(mp) {
            mp.listen("image-clicked", function(e) {
                mp.refreshView({ 
                    params: { 
                        url: { photo_id: e.data.id } 
                    } 
                });
            });
        },
        bind: function(node) {}
    };

}, '0.0.1', {requires: ['mojito-client']});
```

Some notes:

* We got rid of the unnecessary libraries and any notion of bindings.
* We listen for inter-mojit communication via the `mp.listen()` method.
* If this is ever triggered, we respond by refreshing our view. The refreshView actually calls the index method of on the controller, which triggers a redraw of the page.
* We pass url parameters to the index method, and on this time, when the index method is called, it will receive the ID of the photo that we are searching for. If any details come up, we'll get them displayed in our view.

Finally let's add a bit of styling inside of our `detail/assets/index.css` file:

```css
.detail h2 {
    text-align: center;
    background-color: #333;
    color: white;
    padding: 0.5em;
}
.detail ul {
    list-style: none;
    padding: 1em;
    margin: 0;
}
.detail li {
    padding: 0.3em;
}
.detail li:nth-child(odd) {
    background-color: #ddd;
}
```

Nothing overly special here. Just formatting our details.

And that is a great chunk of our work, but there is still a bit more to do.



Using client side mojits for the comments
-----------------------------------------

Comments would normally be stored in a database on a server some where, but that wouldn't give us a chance to write a client side mojit, which we want to do before we are done. We'll make use of Web Storage on the client side to act as our database of comments on images.

Let's setup the view of our comments first in the `comment/views/index.hb.html`:

```html
<div id="{{mojit_view_id}}" class="comment">
    <h2>Comments</h2>
    <form action="javascript:void(0);">
        <textarea placeholder="leave your thoughts"></textarea>
        <input type="submit"/>
        <input type="hidden" data-photo_id="{{#if photo_id}}{{photo_id}}{{/if}}"/>
    </form>
    <ul>
    {{#if comments}}
        {{#each comments}}
        <li>
            <div class="date">{{date}}</div>
            <div class="comment">{{comment}}</div>
        </li>
        {{/each}}
    {{else}}
        <li>No comments</li>    
    {{/if}}
    </ul>
</div>
```

And some CSS:

```css
.comment h2 {
    text-align: center;
    background-color: #333;
    color: white;
    padding: 0.5em;
}
.comment ul {
    list-style: none;
    margin: 0;
    padding: 0;
    margin-top: 1em;
}
.comment li {
    padding: 0.3em;
    position: relative;
}
.comment li:nth-child(odd) {
    background-color: #ddd;
}
.comment textarea {
    display: block;
    width: 100%;
    resize: none;
}
.comment .date {
    font-size: 80%;
    color: #888;
    position: absolute;
    bottom: 1px;
    right: 1px;
}
.comment .comment {
    font-weight: strong;
    font-family: sans-serif;
}
```

Once we check and make sure everything loads up, let's make our first client side mojit. In a production application, there are cleaner, more AJAXy ways of building what we're going to build, but the Mojito way of doing things will at least make this example easier. For reference, we are going to use what Mojito calls the `LazyLoadMojit`. Information about this mojit can be found here:

    http://developer.yahoo.com/cocktails/mojito/docs/topics/mojito_frame_mojits.html#lazyloadmojit

NOTE IN ADVANCE: Right now, it appears that the developer cannot modify the `Loading...` message that pops up unless they create their own LazyLoadMojit, which isn't that difficult. This is a concept exercise, nothing more.

First stop, modify the `application.json` file. Let's make a small change to just the configuration of our comment mojit:

```json
        "comment": {
            "type": "comment",
            "defer": true
        }
```

All we did was add the `"defer": true` flag. Because this mojit exists in a composite mojit that exists in the default HTMLFrameMojit, we will "lazy load" the mojit on the client.

Make the following file name changes:

    comment/controller.server.js
    # change to
    comment/controller.client.js
    
    comment/models/foo.server.js
    # change to
    comment/models/foo.client.js

Start up mojito and refresh the page. You might see the flash of the lazy load mojit loading the client code, but we have now deployed our first client side mojit. The key difference here is that the mojit only lives on the client now.

Let's make some changes to our code so that we can see our comments in action. The code will be a bit loose, but will prove a good point.

First stop, let's modify the `comment/binders/index.js`:

```javascript
YUI.add('commentBinderIndex', function(Y, NAME) {

    // NEW CODE
    // Closure reference for mp, make our life easier.
    var mp;

    Y.namespace('mojito.binders')[NAME] = {

        // REWRITE
        // The first thing we make sure to do is listen
        // for any image selection. When an image is selected,
        // we refresh our view and write the id into the form.
        // All this happens on the client side, no call to the server.
        init: function(mojitProxy) {
            mp = mojitProxy;
            mp.listen("image-clicked", function(e) {
                mp.refreshView({ 
                    params: { 
                        url: { photo_id: e.data.id } 
                    }
                });
            });
        },
        // NEW CODE
        // We're doing two things:
        // Setting real binders (events).
        // Refreshing the view.
        // Whenever we refresh the view, we need to rebind our events or
        // things will break, because we get a whole new node to play with.
        onRefreshView: function(node) {
            this.bind(node);
        },
        // REWRITE
        bind: function(node) {
            // When the form is submitted...
            node.one("form").on("submit", function(e) {
                var comment = this.one("textarea").get("value");
                var id = this.one("input[type='hidden']").getData("photo_id");
                
                e.preventDefault();
                
                //...if we have a comment and an associated photo_id...
                if (comment && id) {
                    // ...call the save action on our controller...
                    mp.invoke("save",
                        { 
                            params: { 
                                // ...pass the comment and the associated id...
                                url: { photo_id: id, comment: comment } 
                            } 
                        },
                        // ...wait for the callback...
                        function(err, json) {
                            // ...warn in case of an error...
                            if (err) {
                                alert("Sorry, you had an error saving: " + err);
                            }
                            else {
                                // ...but if there is no error, refresh our view...
                                mp.refreshView({
                                    params: { 
                                        url: { photo_id: id } 
                                    }
                                });
                            }
                        }
                    );
                }     
            });
        }
    };

}, '0.0.1', {requires: ['mojito-client']});
```

And let's modify the `comment/controller.client.js`:

```javascript
YUI.add('comment', function(Y, NAME) {

    Y.namespace('mojito.controllers')[NAME] = {

        // CHANGED CODE
        // Our index method is rewritten to be much like the detail mojit.
        // We make sure our currently selected photo_id can be placed in
        // the form when it is selected.
        index: function(ac) {
            var photo_id = ac.params.getFromMerged("photo_id");
            ac.assets.addCss('./index.css');
            ac.models.get('commentModelFoo').getData(function(err, data) {                
                ac.done({
                    err: err,
                    photo_id: photo_id,
                    comments: data
                });
            }, photo_id);
        },
        
        // TOTALLY NEW CODE
        // This controller has a new action on it that will allow us to
        // save any comment saved.
        save: function(ac) {
            var photo_id = ac.params.getFromMerged("photo_id");
            var comment = ac.params.getFromMerged("comment");

            ac.models.get('commentModelFoo').saveData(function(err) {
                ac.done({
                    err: err
                }, "json");
            }, photo_id, comment);
        }

    };

// NEW CODE
// We need the mojito-params-addon.
}, '0.0.1', {requires: ['mojito', 'mojito-params-addon', 'mojito-assets-addon', 'mojito-models-addon', 'commentModelFoo']});
```

All that's missing is the associated `comment/models/foo.client.js`:

```javascript
YUI.add('commentModelFoo', function(Y, NAME) {

    Y.namespace('mojito.models')[NAME] = {

        init: function(config) {
            this.config = config;
        },

        // REWRITE
        // This is all client side code and we get the information from
        // the localStorage, since it exists on the client.
        // Comments are tied to photo ids.
        getData: function(callback, photo_id) {
            var comments;
            try {
                comments = JSON.parse(localStorage[photo_id]);
            }
            catch(e) {};
            
            if (!Y.Lang.isArray(comments)) {
                callback(null, [])
            }
            else {
                console.log(comments);
                callback(null, comments);
            }
        },
        
        // NEW CODE
        // Allow use to save a comment attached to a photo_id.
        saveData: function(callback, photo_id, comment) {
            var existingComments;
            try {
                existingComments = JSON.parse(localStorage[photo_id]);
            }
            catch(e) {}
            if (!Y.Lang.isArray(existingComments)) {
                existingComments = [];
            }
            existingComments.unshift({ date: new Date(), comment: comment});
            
            try {
                localStorage[photo_id] = JSON.stringify(existingComments);
                callback(null);
            }
            catch(e) {
                callback(new Error("Could not save comments."));
            }
        } 

    };

}, '0.0.1', {requires: []});
```

And there you have it. A large glob of mojito that attempts to exercise as much of the mojito code base as possible.



Push our app to Manhattan
-------------------------

Manhattan is Yahoo!'s cloud hosting for Node.js and Mojito applications. As our final exercise, we'll push our app to a dev production.

Follow the instructions in `resources\manhattan_dev_deployment.txt`. As a reminder, we'll need to do a couple of things:

* Make sure we have a Manhattan dev account (very easy, see the other file).
* Make sure we have our yroot setup. Remember, the thing we probably haven't been using? we need it now.
* We _are_ using Mojito above version 0.4.8, so that section of instructions applies to us. Luckily the file we need is located in `skeletal_files/index.js`.
* We will need to update our `package.json` file, which is also outlined in the instructions, but this is a good reminder.



