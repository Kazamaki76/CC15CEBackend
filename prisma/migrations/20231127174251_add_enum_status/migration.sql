-- AlterTable
ALTER TABLE `Payment` ADD COLUMN `status` ENUM('PENDING', 'CONFIRM', 'REJECT') NOT NULL DEFAULT 'PENDING';