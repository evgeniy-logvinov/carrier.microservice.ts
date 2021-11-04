/**
 * Copyright (c) evgeniy.logvinov.k
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
module.exports = {
  name: 'gateway',
  settings: {
    port: process.env.PORT || 3000,
  },
  methods: {
    initRoutes(app) {
      app.get('/movies', this.getMovies);
      app.get('/movies/:id', this.getMovie);
      app.post('/movies', this.createMovie);
    },
    getMovies(req, res) {
      return Promise.resolve()
          .then(() => {
            return this.broker.call('movies.listAll').then(movies => {
              res.send(movies);
            });
          })
          .catch(this.handleErr(res));
    },
    getMovie(req, res) {
      const id = req.params.id;
      return Promise.resolve()
          .then(() => {
            return this.broker.call('movies.getById', {id: id}).then(movie => {
              res.send(movie);
            });
          })
          .catch(this.handleErr(res));
    },
    createMovie(req, res) {
      const payload = req.body;
      return Promise.resolve()
          .then(() => {
            return this.broker.call('movies.create', { payload }).then(movie =>
              res.send(movie)
            );
          })
          .catch(this.handleErr(res));
    },
    handleErr(res) {
      return err => {
        res.status(err.code || 500).send(err.message);
      };
    }
  },
  created() {
    const app = express();
    app.use(bodyParser());
    this.initRoutes(app);
    this.app = app;
  }
};
