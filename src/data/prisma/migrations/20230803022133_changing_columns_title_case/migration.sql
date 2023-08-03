/*
  Warnings:

  - You are about to drop the column `lastOrderDate` on the `OrderFetchHistory` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `OrderProducts` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `OrderProducts` table. All the data in the column will be lost.
  - You are about to drop the column `lastProductDate` on the `ProductFetchHistory` table. All the data in the column will be lost.
  - Added the required column `order_id` to the `OrderProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `OrderProducts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderProducts" DROP CONSTRAINT "OrderProducts_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderProducts" DROP CONSTRAINT "OrderProducts_productId_fkey";

-- AlterTable
ALTER TABLE "OrderFetchHistory" DROP COLUMN "lastOrderDate",
ADD COLUMN     "last_order_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "OrderProducts" DROP COLUMN "orderId",
DROP COLUMN "productId",
ADD COLUMN     "order_id" TEXT NOT NULL,
ADD COLUMN     "product_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductFetchHistory" DROP COLUMN "lastProductDate",
ADD COLUMN     "last_product_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "OrderProducts" ADD CONSTRAINT "OrderProducts_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProducts" ADD CONSTRAINT "OrderProducts_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
