import { MigrationInterface, QueryRunner } from "typeorm";

export class TitleColumnArticleModify1727738168955 implements MigrationInterface {
    name = 'TitleColumnArticleModify1727738168955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" RENAME COLUMN "tittle" TO "title"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" RENAME COLUMN "title" TO "tittle"`);
    }

}
