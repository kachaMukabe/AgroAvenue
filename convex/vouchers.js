import { query } from './_generated/server';
import { mutation } from './_generated/server';

export const get = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Called getFarmer without authentication present');
    }
    const vouchers = await ctx.db
      .query('vouchers')
      .filter((q) => q.eq(q.field('farmer_id'), identity.tokenIdentifier))
      .collect();
    return vouchers;
  },
});
