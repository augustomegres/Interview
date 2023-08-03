-- CreateTable
CREATE TABLE "OrderFetchHistory" (
    "id" TEXT NOT NULL,
    "lastOrderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderFetchHistory_pkey" PRIMARY KEY ("id")
);
