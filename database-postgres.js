import { randomUUID } from "node:crypto";
import { sql } from "./db.js";

export class DataBasePostgres {
  async list(search) {
    let videos;

    if (search) {
      videos = await sql`select * from videos where title ilike ${
        "%" + search + "%"
      }`;
    } else {
      videos = await sql`select * from videos `;
    }

    return videos;
  }

  async get(id) {
    const video = await sql`select * from videos where id = ${id}`;
    return video;
  }

  async create(video) {
    const videoId = randomUUID();
    const { title, description, duration } = video;

    await sql`insert into videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`;
  }

  async update(id, video) {
    const { title, description, duration } = video;

    await sql`UPDATE videos SET title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id};`;
  }

  async delete(id) {
    await sql`delete from videos where id = '${id}'`;
  }
}

//https://www.youtube.com/watch?v=hHM-hr9q4mo 1:13:12
