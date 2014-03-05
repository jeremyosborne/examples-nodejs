Node.js: What can we do in ~10 minutes?
=======================================



Intro
-----
Node.js[^node]. The cool kids are using it. My mom is using. My grandma is using it. Even my urbanized chickens are using it. But what are they using it for, and how are they using it? My name is Jeremy Osborne, and if you're like me, you're a nerd. You probably also find yourself wanting to use Node.js but you may not know where to begin.

I'm not here to tell you that you _should_ use Node.js. In fact, I'm often the person telling people not to use Node.js for things it's not good for. For example: please don't write a bunch of commandline shell scripts in Node.js. There are other languages and systems that do that better.

I do assume you are watching this video because you are smart, you are already technical, you have heard of Node.js, and you'd like to just know where to get started. I'd like to provide some suggestions -- in the form of code and some demonstrations -- that will give you an idea of what you can do with Node if you just know where to begin. The code is available to you now. Feel free to get your hands dirty while we talk.

This is not designed to be a one size fits all solution. This is a one-size-gets-you-started solution. By the end of this short video, what I hope is that I save you time, even if it's only a few minutes or a few hours, on your Node learnings and adventures.

Enough talk, let's code!



Node.js install
---------------
To be as general as possible, we'll install `node` from the Node.js downloads[^node-download] page. The version of `node` I'm running is:

    node --version
    v0.10.13

The Node Package Manager (`npm`[^npm]) should come along for free nowadays. The version of `npm` that I'm using is:

    npm --version
    1.3.6



Building our Project
--------------------
No one builds a production app in 10 minutes. That's silly to even assume that with today's tools. But this is a test, and we want to see what we _can_ do in a short amount of time. And to do much at all, we'll need some help from the previous brave developers who've jumped into the Node.js world and have created tools for all of us to use.

Since we want to use the express web framework[^express], let's install it to our project folder:

    mkdir app-sprint
    cd app-sprint
    npm install express@3.3.4

Excellent! Notice that we now have a `node_modules` folder in our directory. By default, `npm` does not install things globally, which is good when you need to have different projects with different dependencies. The express framework comes with a command that we can use to initialize our application. Since we did not install `express` globally, let's run the command using the local script:

    node_modules/express/bin/express

Most excellent! We now have some project scaffolding. One of the most important pieces is the `package.json`[^package-dot-json] file. The `package.json` file is really no just for publishing a finished package to the npm repository. It is a great management tool for dealing with the package dependencies of our project. There are very good resources on the web about how to make the most of a `package.json` file. Learn it, love it.

We want to see if there are any additional dependencies up front that our application needs:

    npm install

When run locally, this installs all of our project and developer dependencies. Righteous!



Hello world -- testing to make sure things work
-----------------------------------------------
Did we screw something up yet? Let's make sure by running the hello world version of our application:

    npm start
    # which is the same as...
    # node app.js

And visit our test application at:

    http://localhost:3000/

Express says hello world to us :) Not bad. We have a running test server, a sample page, and we're pretty sure at this point that node and npm work after just a few minutes work.



Switch the template engine to Handlebars
----------------------------------------
What people call **Template Engines** nowadays are all solutions to getting the HTML out of JavaScript/Python/PHP/Ruby/Insert Other Language here. If you haven't really used a template engine, explore the subject.

What if we want to use a different template engine than the one that comes with express (which is Jade)? It's pretty easy to write our own bootstrap into express, but let's take the easy way out and use one predone for us. I like Handlebars[^handlebars], and to include in our project:

    npm install express3-handlebars@0.5.0 --save

We download the dependency, and along the way `--save` our dependency to our `package.json` file. Righteous, take a look!

    cat package.json

No more editing JSON (okay, at least no more editing it all the time).

As the tagline says, `express3-handlebars`[^express3-handlebars] is:

    A Handlebars view engine for Express which doesn't suck.

To save time, I'm stealing the basic views that are provided and I'm going to dump the JADE views that are included:

    rm views/*.jade
    cp -R node_modules/express3-handlebars/examples/basic/views/* views/

Mainly because our application is going to be tiny.

Express needs to know about the view engine, and our main script is `app.js`. Let's open it up and:

```javascript
// Add this include
var exphbs  = require('express3-handlebars');

// ... some other code ...

// Comment out Jade.
//app.set('view engine', 'jade');
// Add in express3-handlebars.
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// ... some other code ...

// Get rid of routes.
//app.get('/', routes.index);
//app.get('/users', user.list);
// For example, just code in our stuff..
app.get('/', function (req, res) {
    res.render('home');
});
```

And try things out:

    node app.js

Awesome, Handlebars works!



Adding the magic check in button
--------------------------------
This application that really isn't an application will be really simple. We're going to click a button, find out where we're located at (as best as the browser can determine), and save all of the places that we've checked into.

Let's make our big button. Open `views/home.handlebars` and change the code to be:

    <h1>Where have I been?</h1>
    <form action="/" method="POST">
        <input type="hidden" name="latitude" value=""/>
        <input type="hidden" name="longitude" value=""/>
        <button type="submit" class="btn btn-primary btn-lg" disabled>Check In!</button>
    </form>

But that's to plain. Let's make it better with `Twitter Bootstrap`[^twitter-bootstrap]. This is a bit old fashioned, but effective.

    # grab the file
    wget http://getbootstrap.com/2.3.2/assets/bootstrap.zip
    unzip bootstrap.zip
    # Move everything
    cp -R bootstrap/css/* public/stylesheets/
    # Get rid of what we don't need.
    rm -rf bootstrap bootstrap.zip

Let's plug it into our templates. Open `views/layouts/main.handlebars` and add to the head tag:

```html
<link rel='stylesheet' href='/stylesheets/bootstrap.min.css'/>
<link rel='stylesheet' href='/stylesheets/bootstrap-responsive.min.css'/>
<link rel='stylesheet' href='/stylesheets/style.css'/>
```

Refresh the application (or start it again with `node app.js` and reload) and make sure things look a bit different. Awesome!

Side note: The default express settings treat the `public/` folder as the document root and will attempt to serve static files from there. That's why we only need to alter our handlebars template to make things work.



Geolocation: a usable HTML5 API
-------------------------------
One of the easiest APIs to take advantage of in the browser is the Geolocation API[^geolocation-api]. It's what we will use to track ourselves. We will plug this into a client side JavaScript file at `public/javascripts/client.js`:

```javascript
(function() {
    var noGeolocation = function() {
        alert("For some reason we are unable to find your location. Sorry.");
    };

    if (!navigator.geolocation || !document.querySelector) {
        noGeolocation();
    }
    else {
        navigator.geolocation.getCurrentPosition(
            function(p) {
                document.querySelector("[name='latitude']").value = p.coords.latitude;
                document.querySelector("[name='longitude']").value = p.coords.longitude;
                document.querySelector("[type='submit']").removeAttribute("disabled");
            },
            function(err) {
                noGeolocation();
            }
        );
    }
})();
```

And then include the script at the bottom of `views/home.handlebars`:

```html
<script src="javascripts/client.js"></script>
```

Test it out! Right now, the only visible change is that the submit button will go from disabled to enabled. If we open the debugger, we can see that the form coordinate fields, the hidden ones, now have guesstimated latitude and longitude.



Geolocation: not very human friendly, let's make it human friendly
------------------------------------------------------------------
Latitudes and longitudes are for machines. I want to know where the computer thinks I'm at, so I'm going to use the `Yahoo Query Language`[^yql] and their `geo.placefinder` endpoint. The `geo.placefinder` acts as a reverse geocoder, which means we can turn a latitude/longitude into an address (best guess, of course). Let's make a `routes/index_post.js` file, and add the following to it:

```javascript
var request = require("request");

// Proxy through YQL.
var whereURL = 'http://query.yahooapis.com/v1/public/yql?format=json&q=select * from geo.placefinder where gflags="R" and text="{LAT},{LON}"';

// express extends the Node concept of request/response HTTP architecture,
// but also keeps true to the basic idea.
var revgeo = function(lat, lon, callback) {
    var url = whereURL.replace("{LAT}", lat).replace("{LON}", lon);

    request(url, function(error, response, contentBody) {
        // Attempt to build the interpoloated address, or fail.
        var address;
        try {
            address = JSON.parse(contentBody).query.results.Result;
            address = Array.isArray(address) ? address[0] : address;
            address = address.line1 + " " + address.line2;
        }
        catch(e) {
            callback("Could not retrieve the location at "+lat+", "+lon);
            return;
        }

        if (error || response.statusCode != 200) {
            callback("Error contacting the reverse geocoding service.");
        }
        else {
            callback(null, address);
        }
    });
};

module.exports = function(req, res) {
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;

    revgeo(latitude, longitude, function(err, address) {
        // diagnostic
        console.log(latitude, longitude, err, address);

        res.render('home', {
            error: err,
            location: {
                latitude: latitude,
                longitude: longitude,
                address: address
            }
        });
    });
};
```

Let's make use of this in our `app.js`:

```javascript
// After the app.get('/', ....) code...

// Handle form posts:
app.post('/', require('./routes/index_post.js'));
```

Restart and attempt to run.... Aw snap! We're using a library we haven't downloaded yet called `request`[^request]. No matter, let's fix it:

    npm install request@2.27.0 --save

Let's try again... DY-NO-MITE! We have an address output to our console.log. Who knows how good it is, shall we ask the NSA?



Update the found address, and errors if any
-------------------------------------------
Templates are great. When we want to update them, we can. We have an error and an address that we want to show on the page. Once again, let's modify `views/home.handlebars` and add the following:

```html
{{! below the form, above the script tag }}


{{#if error}}
<p class="text-warning">{{error}}</p>
{{/if}}
{{#if location}}
<p>
    The browser says you are at <strong>{{location.latitude}}, {{location.longitude}}</strong>.
</p>
<p>
    This lat/lon seems to equate to:
    <blockquote>{{location.address}}</blockquote>
</p>
{{/if}}
```

Try it out. You can now track yourself. Groovy!



Simple persistence with sqlite and an ORM package
-------------------------------------------------
How much more fun would it be if we could track ourselves and one up the NSA? Yeah baby! To do that, let's use an ORM package for Node called `node-orm2`[^node-orm2]. We'll need a few things, so let's grab the package:

    # The node ORM package.
    npm install orm@2.1.0 --save

We're going to use a simple sqlite3[^node-sqlite3] database, so we also need to include that package:

    # The sqlite3 driver.
    npm install sqlite3@2.1.7 --save

Since most things in Node tend to be non-blocking, we need to start managing the flow of our app with more callbacks. Let's make a very, very simple database module that handles just what we need. Create `src/db.js` and drop the following in it:

```javascript
var orm = require("orm");

// Will be set on init, null == not set.
module.exports.Breadcrumb = null;

// Callback will be called when done.
module.exports.init = function(done) {
    orm.connect("sqlite://breadcrumbs.db3", function (err, db) {
    var Breadcrumb = db.define("breadcrumb", {
        date: Date,
        latitude: Number,
        longitude: Number,
        address: String,
    });
    // Make the database.
    Breadcrumb.sync(function(err) {});
        if (err) {
            done("Error: could not create the database: " + err);
        }
        else {
            // Export our object for basic interactions.
            module.exports.Breadcrumb = Breadcrumb;
            // We're done.
            done(null);
        }
    });
};
```

And in `app.js` let's make sure we create our database before anything else happens:

```javascript
// ...with the rest of the includes at the top of the file...

// Our simple database.
var db = require("./src/db");

// ... at the bottom of the file ...

// Initialize the database before starting the server.
db.init(function(err) {
    if (err) {
        console.log(err);
    }
    else {
        http.createServer(app).listen(app.get('port'), function(){
          console.log('Express server listening on port ' + app.get('port'));
        });
    }
});
```

Run our application. Nothing should be different on the web side, but we should now have a database file within the base folder.



Tracking ourselves
------------------
Let's feed each of our checkins into a database. Crack open `routes/index_post.js` and modify:

```javascript

// ...at the top of the file...

// Access to the database.
var db = require("../src/db");

// ...in the revgeo function before the success callback...

var revgeo = function(lat, lon, callback) {
    // ...code...

    request(url, function(error, response, contentBody) {
        // ...more code...
        else {
            // Save an address.
            db.Breadcrumb.create([
                {
                    date: new Date(),
                    latitude: lat,
                    longitude: lon,
                    address: address
                }
            ], function (err, items) {
                // err - description of the error or null
                // items - array of inserted items
                // Pass back both err and address at this point.
                callback(err, address);
            });
        }
    });
};
```

Check out the database. Getting populated with the most exciting places we've ever been!



Displaying places we've been
----------------------------
Now that we're storing our checkins, let's display our trail of breadcrumbs whenever we checkin. Open up `routes/index_post.js` one more time and:

```javascript
// ...in the call to revgeo...

revgeo(latitude, longitude, function(err, address) {
    // diagnostic
    console.log(latitude, longitude, err, address);

    db.Breadcrumb.find(function(err, items) {
        res.render('home', {
            error: err,
            location: {
                latitude: latitude,
                longitude: longitude,
                address: address
            },
            // Make the breadcrumbs available on checkin.
            breadcrumbs: items
        });
    });
});
```

And let's make the breadcrumbs available in our `views/home.handlebars`:

```html
{{! ...below everything else we've added but above the script tag... }}

{{#if breadcrumbs}}
<h4>You appear to have also checked in at:</h4>
<ul>
    {{#each breadcrumbs}}
    <li>({{date}}): we visited {{address}}</li>
    {{/each}}
</ul>
{{/if}}
```

Track yourself. You are now PRISM. Be proud.

And there we have it, a rudimentary application in ~10 minutes that can get you in trouble, and give you lots of fun.



Managing our project with grunt
-------------------------------
Projects can get large very quickly, and this project, for a web project, is something I'd consider on the cusp of getting out of control. Even without a compilation step, there's unit testing, static analysis, packaging, and many other parts of the software development process to worry about. Although we won't worry about it here, what does Node have in terms of task management? My favorite is Grunt[^grunt], an excellent task management tool. To use Grunt, we need to install a global commandline task runner, which we can do with:

    npm install -g grunt-cli@0.1.9

Let's als0 get the Grunt project scaffolding[^grunt_init] builder... thing-a-ma-jig:

    # The grunt init tool.
    npm install -g grunt-init@0.2.1
    # A grunt config template.
    git clone https://github.com/gruntjs/grunt-init-gruntfile.git ~/.grunt-init/gruntfile

Before we outro, let's setup a simple task that checks our code via grunt using JSHint[^jshint].

    # Build our basic Gruntfile
    grunt-init gruntfile

    # ... answer the questions ...

    # Install our tools as devDependencies
    npm install grunt@0.4.1 --save-dev
    npm install grunt-contrib-jshint@0.6.3 --save-dev
    npm install grunt-contrib-watch@0.5.3 --save-dev

And let's setup our code to go through static analysis every time we save anything. Open up the newly formed `Gruntfile.js` and change it to the following:

```javascript
/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      all: {
        src: ['Gruntfile.js', 'app.js', 'src/**/*.js', 'routes/**/*.js',],
      },
    },
    watch: {
      scripts: {
        files: ['Gruntfile.js', 'app.js', 'src/**/*.js', 'routes/**/*.js'],
        tasks: ['jshint'],
      },
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint']);

};
```

And let's try out our Makefile... I mean our Gruntfile:

    grunt

Holy cow! We have some changes to make to make JSHint happy! Static analysis is great, it's like compiler warnings when we use a compiled language, and we can now make these code changes.



Outro
-----
As we've seen, taking advantage of what Node.js is good at, and then augmenting it with packages from npm can make for a very rich development environment for web-centric applications. Node.js has matured over it's brief lifetime, and while I feel it appropriate to say that Node still has more maturing to do, I think we've seen that we're finally at the point where the question isn't should I use Node.js, but what should I use it for?

I do hope this video saved you some time, and I wish you great luck in your coding adventures. Good night, and good bugs.



References
----------

[^node]: [Node.js](http://nodejs.org/)
[^node-download]: [Node.js download](http://nodejs.org/download/)
[^npm]:  [Node Package Manager (npm) and package repo](https://npmjs.org/)
[^express]: [express web framework for node](http://expressjs.com/)
[^package-dot-json]: [A package.json cheat sheet](http://package.json.nodejitsu.com/)
[^handlebars]: [Handlebars: Template Engine](http://handlebarsjs.com/)
[^express3-handlebars]: [A Handlebars view engine for Express which doesn't suck.](https://npmjs.org/package/express3-handlebars)
[^twitter-bootstrap]: [Twitter Bootstrap](http://getbootstrap.com/)
[^geolocation-api]: [Browser based geolocation API](http://dev.w3.org/geo/api/)
[^yql]: [Yahoo Query Language](http://developer.yahoo.com/yql/)
[^request]: [Simplified HTTP requests for Node](https://npmjs.org/package/request)
[^node-orm2]: [An ORM package for Node](https://github.com/dresende/node-orm2)
[^node-sqlite3]: [sqlite3 bindings for Node](https://npmjs.org/package/sqlite3)
[^grunt]: [Grunt: JavaScript Task Runner](http://gruntjs.com/)
[^grunt_init]: [Grunt project scaffolding](http://gruntjs.com/project-scaffolding)
[^jshint]: [JSHint static analysis for JavaScript](http://www.jshint.com/docs/)

