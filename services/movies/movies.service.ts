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

const movies = [
  {id: 1, title: 'Sharknado'},
  {id: 2, title: 'Roma'},
];

module.exports = {
  name: 'movies',

  actions: {
    listAll(ctx) {
      return Promise.resolve({ movies: movies });
    },
    getById(ctx) {
      const id = Number(ctx.params.id);
      return Promise.resolve(movies.find(movie => movie.id === id));
    },
    create(ctx) {
      const lastId = Math.max(...movies.map(movie => movie.id));
      const movie = {
        id: lastId + 1,
        ...ctx.params.payload,
      };
      movies.push(movie);
      this.broker.emit('movie.created', movie);
      return Promise.resolve(movie);
    }
  },
};
