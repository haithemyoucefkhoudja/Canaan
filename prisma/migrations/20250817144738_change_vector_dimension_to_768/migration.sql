CREATE EXTENSION IF NOT EXISTS vector; -- <<< ADD THIS LINE AT THE TOP

-- Step 1: Clear all existing vector data from the column.
-- This is a DESTRUCTIVE but NECESSARY step before changing the dimension.
UPDATE "documents" SET "embedding" = NULL;

-- Step 2: Alter the column to use the new vector dimension.
-- This command will now succeed because the column is empty.
ALTER TABLE "documents"
ALTER COLUMN "embedding" TYPE vector(768);