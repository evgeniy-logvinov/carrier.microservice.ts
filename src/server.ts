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
require('dotenv').config();
import { resolve } from 'path';
import { ServiceBroker } from 'moleculer';
import { config } from './moleculer.config';

const {
  SERVICES,
  NODE_ENV,
} = process.env;

const broker = new ServiceBroker(config);

broker.loadServices(
    resolve(__dirname, 'services'),
    SERVICES
      ? `*/@(${SERVICES.split(',').map(i => i.trim()).join('|')}).service.js`
      : '*/*.service.js',
);

broker.start().then(() => {
  if (NODE_ENV === 'development')
    broker.repl();
});
