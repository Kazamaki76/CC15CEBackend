-- AlterTable
ALTER TABLE `order` ADD COLUMN `paymentImage` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `orderitem` ADD COLUMN `paymentImage` VARCHAR(191) NULL;
