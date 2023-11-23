/*
  Warnings:

  - You are about to drop the column `orderDate` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `orderitem` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `orderitem` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `orderitem` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `orderitem` table. All the data in the column will be lost.
  - You are about to drop the column `method` on the `shippinginfo` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `shippinginfo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_userId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_productId_fkey`;

-- DropForeignKey
ALTER TABLE `shippinginfo` DROP FOREIGN KEY `ShippingInfo_orderId_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `orderDate`,
    DROP COLUMN `totalPrice`,
    DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `orderitem` DROP COLUMN `orderId`,
    DROP COLUMN `price`,
    DROP COLUMN `productId`,
    DROP COLUMN `quantity`;

-- AlterTable
ALTER TABLE `shippinginfo` DROP COLUMN `method`,
    DROP COLUMN `orderId`;
