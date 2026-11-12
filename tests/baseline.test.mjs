import {checkAvailability} from '../baseline/src/validation.ts';
import {registerRegression} from './regression-cases.mjs';
registerRegression(checkAvailability,'baseline');
