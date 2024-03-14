import { mutation } from './_generated/server';
import { query } from './_generated/server';
import { v } from 'convex/values';

export const getFarmer = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Called getFarmer without authentication present');
    }
    const farmer = (await ctx.db.get) < 'farmers' > identity.tokenIdentifier;

    return farmer;
  },
});

export const getAllFarmers = query({
  args: {},
  handler: async (ctx, args) => {
    const farmers = await ctx.db.query('farmers').collect();
    return farmers;
  },
});

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Called createFarmer without authentication present');
    }

    const farmer = await ctx.db
      .query('farmers')
      .withIndex('by_token', (q) =>
        q.eq('tokenIdentifier', identity.tokenIdentifier)
      )
      .unique();
    if (farmer !== null) {
      return farmer._id;
    }

    return await ctx.db.insert('farmers', {
      name: identity.name,
      tokenIdentifier: identity.tokenIdentifier,
    });
  },
});
