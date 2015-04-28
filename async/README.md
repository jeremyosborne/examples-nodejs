# Usage

    npm install
    node wgetter http://nodejs.org http://github.com

# Purpose
Sometimes we want things to run async but serially. Sometimes we want to launch a batch of things in parallel. The various methods provided by the [async](https://github.com/caolan/async) module help with managing the subtleties and avoiding callback hell.

This example only makes use of `waterfall` and `parallel`.

We use `waterfall` to order normally asynchronous tasks we want done in order and minimize callback hell.

We use `parallel` to launch a set of equivalent but independent and asynchronous tasks.

