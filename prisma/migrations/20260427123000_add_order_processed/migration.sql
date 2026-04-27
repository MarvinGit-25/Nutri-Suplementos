-- Add processed flag for webhook idempotency
ALTER TABLE "Order"
ADD COLUMN IF NOT EXISTS "processed" BOOLEAN NOT NULL DEFAULT false;
