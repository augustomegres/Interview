/*
  Warnings:

  - You are about to drop the column `orderId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_orderId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "orderId";

-- CreateTable
CREATE TABLE "ProductFetchHistory" (
    "id" TEXT NOT NULL,
    "lastProductDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductFetchHistory_pkey" PRIMARY KEY ("id")
);
