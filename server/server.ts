import express from 'express';
import cors from 'cors';

import { dbService, Project } from './database/db';

const app = express();
const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));
app.use(express.json());

/*
const project: Project = {
    name: "Untitled Roguelike",
    description: "Phaser 3 game",
    status: 'active',
    totalTickets: 20,
    completedTickets: 10,
    lastUpdated: "Updated 1 day ago",
    image: 'https://miro.medium.com/v2/resize:fit:1023/1*-R1fpIXRI6JsvpHaykU-gg.png',
};

dbService.insertProject(1, project);
*/

app.post("/api/projects", (req, res) => {
    const { auth0Id } = req.body;

    if (!auth0Id) {
        return res.status(400).json({ error: "Missing auth0Id in request body" });
    }

    const user = dbService.getUserByAuth0Id(auth0Id);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const projects = dbService.getProjectsByUserId(user.id);
    res.json(projects);
});

app.listen(3000, () =>
    console.log('App listening on port 3000!'),
);