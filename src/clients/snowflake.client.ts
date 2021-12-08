import { registerProvider } from '@tsed/di';
import {UniqueID} from 'nodejs-snowflake';

export class SnowflakeID extends UniqueID {
}

registerProvider({
  provide: SnowflakeID,
  useValue: new SnowflakeID(),
})