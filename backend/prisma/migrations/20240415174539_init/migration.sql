-- CreateTable
CREATE TABLE `packs` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `pack_id` BIGINT NOT NULL,
    `product_id` BIGINT NOT NULL,
    `qty` BIGINT NOT NULL,

    INDEX `pack_id`(`pack_id`),
    INDEX `product_id`(`product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `code` BIGINT NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `cost_price` DECIMAL(9, 2) NOT NULL,
    `sales_price` DECIMAL(9, 2) NOT NULL,

    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `packs` ADD CONSTRAINT `packs_ibfk_1` FOREIGN KEY (`pack_id`) REFERENCES `products`(`code`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `packs` ADD CONSTRAINT `packs_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products`(`code`) ON DELETE NO ACTION ON UPDATE NO ACTION;
