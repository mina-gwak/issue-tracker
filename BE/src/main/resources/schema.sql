-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `image` VARCHAR(255) NULL,
  `nickname` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `milestone`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `milestone` ;

CREATE TABLE IF NOT EXISTS `milestone` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(255) NULL,
  `due_date` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `issue`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `issue` ;

CREATE TABLE IF NOT EXISTS `issue` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NULL,
  `content` TEXT NULL,
  `is_opened` TINYINT NOT NULL,
  `written_time` DATETIME NULL,
  `modification_time` DATETIME NULL,
  `user_id` BIGINT NOT NULL,
  `milestone_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_issue_user_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_issue_milestone1_idx` (`milestone_id` ASC) VISIBLE,
  CONSTRAINT `fk_issue_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_issue_milestone1`
    FOREIGN KEY (`milestone_id`)
    REFERENCES `milestone` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `comment` ;

CREATE TABLE IF NOT EXISTS `comment` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `content` TEXT NULL,
  `written_time` DATETIME NULL,
  `user_id` BIGINT NOT NULL,
  `issue_id` BIGINT NOT NULL,
  `editable` TINYINT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_comment_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_comment_issue1_idx` (`issue_id` ASC) VISIBLE,
  CONSTRAINT `fk_comment_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_issue1`
    FOREIGN KEY (`issue_id`)
    REFERENCES `issue` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `label`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `label` ;

CREATE TABLE IF NOT EXISTS `label` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(255) NULL,
  `label_color` VARCHAR(45) NULL,
  `text_color` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `assigned_issue`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `assigned_issue` ;

CREATE TABLE IF NOT EXISTS `assigned_issue` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL,
  `issue_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_assigned_issue_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_assigned_issue_issue1_idx` (`issue_id` ASC) VISIBLE,
  CONSTRAINT `fk_assigned_issue_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_assigned_issue_issue1`
    FOREIGN KEY (`issue_id`)
    REFERENCES `issue` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `attached_label`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `attached_label` ;

CREATE TABLE IF NOT EXISTS `attached_label` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `issue_id` BIGINT NOT NULL,
  `label_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_attached_label_issue1_idx` (`issue_id` ASC) VISIBLE,
  INDEX `fk_attached_label_label1_idx` (`label_id` ASC) VISIBLE,
  CONSTRAINT `fk_attached_label_issue1`
    FOREIGN KEY (`issue_id`)
    REFERENCES `issue` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_attached_label_label1`
    FOREIGN KEY (`label_id`)
    REFERENCES `label` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `image`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `image` ;

CREATE TABLE IF NOT EXISTS `image` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `image_url` VARCHAR(255) NULL,
  `issue_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_image_issue1_idx` (`issue_id` ASC) VISIBLE,
  CONSTRAINT `fk_image_issue1`
    FOREIGN KEY (`issue_id`)
    REFERENCES `issue` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
