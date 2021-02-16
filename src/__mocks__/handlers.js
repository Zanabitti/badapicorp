import {rest} from 'msw';
import mockCategory from '../__mocks__/categoryresp.json';
import mockAvailability from '../__mocks__/availabilityresp.json';


const handlers = [
    rest.get(/products/i, async(req, res, ctx) => {
      return res(ctx.json(mockCategory));
    }),
    rest.get(/availability/i, async(req, res, ctx) => {
      return res(ctx.json(mockAvailability));  
    })
];

export {handlers}