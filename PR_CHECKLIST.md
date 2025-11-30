# PR Checklist: E-Bidding MVP

## Summary of Changes

- **Database:** Added `RFX`, `BidVersion`, `RFXInvite` models.
- **UI:** Created `ProductCard`, `BidTimeline`, `CredibilityBadge` components.
- **Marketplace:** Implemented Listing and Detail pages with mock data.
- **Bidding:** Implemented `BidModal` and API routes for creating RFXs and Bids.
- **Dashboards:** Added Buyer and Seller dashboards.
- **Tests:** Added unit tests for validation logic.

## How to Test

1. **Seed Database:**

   ```bash
   npx prisma db push
   # Optional: npx prisma db seed (if seed script exists)
   ```

2. **Run Dev Server:**

   ```bash
   npm run dev
   ```

3. **Manual Verification Steps:**
   - Login as `buyer@chem.com` / `secure123`.
   - Navigate to `/marketplace`.
   - Click on a product.
   - Click "Create RFX" and submit the form.
   - Verify success toast.
   - Check `/dashboard` to see the new dashboard view.

4. **Run Automated Tests:**

   ```bash
   npm test
   # or
   npx vitest run
   ```

## Deployment Notes

- Ensure `DATABASE_URL` is set in production.
- Run `npx prisma migrate deploy` during build.
