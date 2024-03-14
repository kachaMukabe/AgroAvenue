import { query } from './_generated/server';
import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const get = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    console.log(identity);
    if (!identity) {
      throw new Error('Called Get Vouchers without authentication present');
    }
    const vouchers = await ctx.db
      .query('vouchers')
      .filter((q) => q.eq(q.field('farmer_id'), identity.tokenIdentifier))
      .collect();
    return vouchers;
  },
});

export const adminGet = query({
  args: { tokenIdentifier: v.string() },
  handler: async (ctx, args) => {
    const vouchers = await ctx.db
      .query('vouchers')
      .filter((q) => q.eq(q.field('farmer_id'), args.tokenIdentifier))
      .collect();
    return vouchers;
  },
});

export const adminGetAll = query({
  args: {},
  handler: async (ctx, args) => {
    const vouchers = await ctx.db.query('vouchers').collect();
    return vouchers;
  },
});

export const adminPost = mutation({
  args: {
    amount: v.float64(),
    issuer: v.string(),
    expirationDate: v.string(),
    farmerId: v.string(),
  },
  handler: async (ctx, args) => {
    const voucherId = await ctx.db.insert('vouchers', {
      amount: args.amount,
      issuer: args.issuer,
      expirationDate: args.expirationDate,
      farmer_id: args.farmerId,
      issued_at: new Date().toISOString(),
      status: 'unused',
    });
    return voucherId;
  },
});

export const adminUpdate = mutation({
  args: { id: v.id('vouchers'), status: v.string() },
  handler: async (ctx, args) => {
    const { id, status } = args;
    await ctx.db.patch(id, { status: status });
    const voucher = await ctx.db.get(id);
    return voucher;
  },
});

export const adminDelete = mutation({
  args: { id: v.id('vouchers') },
  handler: async (ctx, args) => {
    const response = await ctx.db.delete(args.id);
    return response;
  },
});
