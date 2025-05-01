import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(__dirname, './database.db');

export interface Project {
    id: number;
    name: string;
    description: string;
    status: 'active' | 'archived' | 'completed';
    totalTickets: number;
    completedTickets: number;
    lastUpdated: string;
    image: string;
}

interface User {
    id: number,
    auth0_id: string
}

class DatabaseService {
    private db: Database.Database;

    constructor() {
        this.db = new Database(dbPath);
        this.db.pragma('journal_mode = WAL');
        this.initializeDatabase();
    }

    private initializeDatabase(): void {
        this.createUsersTable();
        this.createProjectsTable();
        console.log(`Database initialized at: ${dbPath}`);
    }

    private createUsersTable(): void {
        const sql = `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                auth0_id TEXT NOT NULL UNIQUE
            )
        `;
        this.db.prepare(sql).run();
    }

    public getUserByAuth0Id(auth0Id: string): any {
        const sql = `
            SELECT * FROM users
            WHERE auth0_id = ?
        `;
        let user = this.db.prepare(sql).get(auth0Id);
    
        if (!user) {
            this.insertUserIfNotExists(auth0Id);
            user = this.db.prepare(sql).get(auth0Id);
        }
    
        return user;
    }
    
    private insertUserIfNotExists(auth0_id: string): void {
        const sql = `
            INSERT OR IGNORE INTO users (auth0_id)
            VALUES (?)
        `;
        this.db.prepare(sql).run(auth0_id);
    }

    private createProjectsTable(): void {
        const sql = `
            CREATE TABLE IF NOT EXISTS projects (
                id INTEGER PRIMARY KEY,
                user_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                description TEXT,
                status TEXT CHECK(status IN ('active', 'archived', 'completed')) DEFAULT 'active',
                total_tickets INTEGER DEFAULT 0,
                completed_tickets INTEGER DEFAULT 0,
                last_updated TEXT,
                image_url TEXT,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `;
        this.db.prepare(sql).run();
    }

    public insertProject(userId: number, project: Project): void {
        const sql = `
            INSERT INTO projects (
                id,
                user_id,
                name,
                description,
                status,
                total_tickets,
                completed_tickets,
                last_updated,
                image_url
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        this.db.prepare(sql).run(
            project.id,
            userId,
            project.name,
            project.description,
            project.status,
            project.totalTickets,
            project.completedTickets,
            project.lastUpdated,
            project.image
        );
    }    

    public getProjectsByUserId(userId: number): Project[] {
        const sql = `SELECT * FROM projects WHERE user_id = ? ORDER BY last_updated DESC`;
        return this.db.prepare(sql).all(userId) as Project[];
    }

    public updateProject(project: Project): void {
        const sql = `
            UPDATE projects SET
                name = ?,
                description = ?,
                status = ?,
                total_tickets = ?,
                completed_tickets = ?,
                last_updated = ?,
                image_url = ?
            WHERE id = ?
        `;
        this.db.prepare(sql).run(
            project.name,
            project.description,
            project.status,
            project.totalTickets,
            project.completedTickets,
            project.lastUpdated,
            project.image,
            project.id
        );
    }
    
    public deleteProject(id: number): void {
        const sql = `DELETE FROM projects WHERE id = ?`;
        this.db.prepare(sql).run(id);
    }

    public deleteUser(id: number): void {
        const sql = `DELETE FROM users WHERE id = ?`;
        this.db.prepare(sql).run(id);
    }
}

export const dbService = new DatabaseService();