import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(__dirname, './database.db');

export interface Project {
    id?: number;
    name: string;
    description: string;
    status: 'active' | 'archived' | 'completed';
    totalTickets: number;
    completedTickets: number;
    lastUpdated: string;
    image: string;
}

interface User {
    id: number;
    auth0_id: string;
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
        this.createProjectUsersTable();
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

    private createProjectsTable(): void {
        const sql = `
            CREATE TABLE IF NOT EXISTS projects (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT,
                status TEXT CHECK(status IN ('active', 'archived', 'completed')) DEFAULT 'active',
                total_tickets INTEGER DEFAULT 0,
                completed_tickets INTEGER DEFAULT 0,
                last_updated TEXT,
                image_url TEXT
            )
        `;
        this.db.prepare(sql).run();
    }

    private createProjectUsersTable(): void {
        const sql = `
            CREATE TABLE IF NOT EXISTS project_users (
                project_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                PRIMARY KEY (project_id, user_id),
                FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `;
        this.db.prepare(sql).run();
    }

    public getUserByAuth0Id(auth0Id: string): User {
        const sql = `SELECT * FROM users WHERE auth0_id = ?`;
        let user = this.db.prepare(sql).get(auth0Id);
    
        if (!user) {
            this.insertUserIfNotExists(auth0Id);
            user = this.db.prepare(sql).get(auth0Id);
        }
    
        return user as User;
    }
    
    private insertUserIfNotExists(auth0_id: string): void {
        const sql = `INSERT OR IGNORE INTO users (auth0_id) VALUES (?)`;
        this.db.prepare(sql).run(auth0_id);
    }

    public insertProject(userId: number, project: Project): void {
        const sql = `
            INSERT INTO projects (
                name,
                description,
                status,
                total_tickets,
                completed_tickets,
                last_updated,
                image_url
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const result = this.db.prepare(sql).run(
            project.name,
            project.description,
            project.status,
            project.totalTickets,
            project.completedTickets,
            project.lastUpdated,
            project.image
        );

        const projectId = result.lastInsertRowid;

        this.insertProjectUserAssociation(projectId, userId);
    }

    private insertProjectUserAssociation(projectId: number | bigint, userId: number): void {
        const sql = `
            INSERT INTO project_users (project_id, user_id)
            VALUES (?, ?)
        `;
        this.db.prepare(sql).run(projectId, userId);
    }

    public updateProject(projectId: number, userIds: number[], project: Project): void {
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
            projectId
        );

        this.db.prepare(`DELETE FROM project_users WHERE project_id = ?`).run(projectId);

        userIds.forEach(userId => {
            this.insertProjectUserAssociation(projectId, userId);
        });
    }

    public deleteProject(id: number): void {
        const sql = `DELETE FROM projects WHERE id = ?`;
        this.db.prepare(sql).run(id);
    }

    public deleteUser(id: number): void {
        const sql = `DELETE FROM users WHERE id = ?`;
        this.db.prepare(sql).run(id);
    }

    public getProjectsByUserId(userId: number): Project[] {
        const sql = `
            SELECT projects.*
            FROM projects
            JOIN project_users ON project_users.project_id = projects.id
            WHERE project_users.user_id = ?
            ORDER BY projects.last_updated DESC
        `;
        return this.db.prepare(sql).all(userId) as Project[];
    }
}

export const dbService = new DatabaseService();