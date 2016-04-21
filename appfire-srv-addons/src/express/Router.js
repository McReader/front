'use strict';
const express = require('express');


class Router {


  constructor() {
    this.router = express.Router();
  }


  get() {
    this._bind('get', ...arguments);
    return this;
  }


  post() {
    this._bind('post', ...arguments);
    return this;
  }


  put() {
    this._bind('put', ...arguments);
    return this;
  }


  del() {
    this._bind('delete', ...arguments);
    return this;
  }


  options() {
    this._bind('options', ...arguments);
    return this;
  }


  /**
   *  Render view for specified path.
   *  @param {!string} path - Path.
   *  @param {!string} view - View name.
   *  @param {Object} [locals] - Params for rendering.
   *  @returns {Router} middleware.
   * */
  render(path, view, locals) {
    this.router.get(path, (req, res) => {
      res.render(view, locals);
    });
    return this;
  }


  build() {
    return this.router;
  }


  use(middleware) {


    let type = typeof middleware;


    let m;


    if (type === 'function') {
      m = middleware;
    } else if (type === 'string') {


      if (!Object.app.isEventExists(middleware)) {
        throw new Error(`Illegal event ${middleware} provided as middleware`);
      }


      m = (req, res, next) => {
        Object.app.fire(middleware, req, res, next);
      };

    } else {
      throw new Error(`Router.use() requires middleware function but got a ${type}`);
    }


    this.router.use(m);


    return this;

  }


  /**
   *  Bind middleware to route
   * */
  _bind() {


    let method = arguments[0];
    let route = arguments[1];
    let args = [route];


    let middlewareChain = Array.prototype.slice.call(arguments, 2);
    middlewareChain.forEach((middleware) => {


      if (typeof middleware === 'function') {
        return args.push(middleware);
      } else if (typeof middleware === 'string') {


        if (!Object.app.isEventExists(middleware)) {
          throw new Error(`Illegal event ${middleware} provided as middleware`);
        }


        let fn = (req, res, next) => {
          this._respond(Object.app.fire(middleware, req, res, next), res);
        };


        args.push(fn);

      } else {
        throw new Error(`Illegal middleware`);
      }

    });


    this.router[method].apply(this.router, args);

  }


  _respond(promise, res) {


    if (!promise) {
      throw new Error(`Promise is undefined.`);
    }


    promise
        .then(data => res.json(data))
        .catch(err => {


          const result = {error: err.message || err};
          const status = typeof err.status === 'number' ? err.status : 500;


          res
              .status(status)
              .json(result);

        });

  }

}


module.exports = Router;
