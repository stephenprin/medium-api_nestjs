import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1613122798443 implements MigrationInterface {
  name = 'SeedDb1613122798443';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('Coffee'), ('Nestjs),('AWS'), ('Software')`,
    );
    await queryRunner.query(
      //passwoord- 12345
      `INSERT INTO users (username, email, password, bio,image) VALUES ('Prince001', 'poo@gmail.com', '$2b$12$sweFefqGiQZ3U.iHSaxXQ.vjXP8tnwEsokJmSJ7J32RCLixABJHLG')`,
    );
    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body,, "tagList", "authorId") VALUES ('first-article', 'First Article', 'First Article  description',
      'First Article body', 'AWS, Software',1),('second-article', 'Second Article', 'Third Article  description', 'Fourth Article body', 'AWS, Software',1)
      `,
    );
  }

  public async down(): Promise<void> {}
}
