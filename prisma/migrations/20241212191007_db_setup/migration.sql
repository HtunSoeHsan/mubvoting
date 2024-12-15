-- CreateTable
CREATE TABLE `tbl_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `profile` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `otp` INTEGER NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `type` ENUM('STUDENT', 'TEACHER', 'OTHER', 'ADMIN', 'DINE') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `tbl_user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_selection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `king` INTEGER NOT NULL DEFAULT 0,
    `queen` INTEGER NOT NULL DEFAULT 0,
    `popular` INTEGER NOT NULL DEFAULT 0,
    `innocent` INTEGER NOT NULL DEFAULT 0,
    `dob` DATETIME(3) NULL,
    `address` VARCHAR(500) NOT NULL,
    `selection_year` VARCHAR(4) NULL,
    `selected` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_voting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `selection_id` INTEGER NOT NULL,
    `vote_type` ENUM('KING', 'QUEEN', 'POPULAR', 'INNOCENT') NOT NULL,
    `voting_year` VARCHAR(4) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `tbl_voting_user_id_selection_id_voting_year_vote_type_key`(`user_id`, `selection_id`, `voting_year`, `vote_type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_voting` ADD CONSTRAINT `tbl_voting_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `tbl_user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_voting` ADD CONSTRAINT `tbl_voting_selection_id_fkey` FOREIGN KEY (`selection_id`) REFERENCES `tbl_selection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
