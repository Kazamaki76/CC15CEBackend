/*
  Warnings:

  - Added the required column `orderDate` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` ADD COLUMN `orderDate` DATETIME(3) NOT NULL,
    ADD COLUMN `totalPrice` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `OrderItem` ADD COLUMN `price` DECIMAL(65, 30) NOT NULL;
