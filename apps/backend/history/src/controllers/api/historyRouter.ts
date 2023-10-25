import { Router, NextFunction, Request, Response } from "express";
import History from "../../models/History";
import { Role } from "../../models/enum/Role";

export const historyRouter = Router();

// Gets history from mongodb
historyRouter.get("/", async (req: Request, res: Response) => {
    if (!Object.values(Role).includes(req.headers.role as Role)) {
    res.status(401).json({ error: "Only registered users are allowed to view questions." });
    return;
    }
    History.find({}).then((history) => {
        res.json(history);
    });
});
    
// Creates history in mongodb
historyRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    if (req.headers.role !== Role.Admin) {
        res.status(401).json({ error: "Only admins are allowed to add questions." });
        return;
    }
    const isExisting = await History.findOne({ sessionId: body.sessionId });

    if (isExisting) {
        res
            .status(400)
            .json({ error: "A history with this session already exists." });
        return;
    }
    console.log(body);

    const history = new History({
        userIds: body.userIds,
        sessionId: body.sessionId,
        completed: body.completed,
        date: body.date,
    });
    history.save().then((savedHistory) => res.status(201).json(savedHistory))
        .catch((e) => next(e));
});

// Gets history from mongodb
historyRouter.get("/:id", async (req: Request, res: Response) => {
    if (!Object.values(Role).includes(req.headers.role as Role)) {
        res.status(401).json({ error: "Only registered users are allowed to view questions." });
        return;
    }
    History.findById(req.params.id).then((history) => {
        res.status(200).json(history);
    });
});

// Updates history in mongodb
historyRouter.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const { userIds, sessionId, completed, date } = req.body;

    if (req.headers.role !== Role.Admin) {
        res.status(401).json({ error: "Only admins are allowed to add history." });
        return;
    }

    await History.findByIdAndUpdate(req.params.id, {
        $push: { completed: completed },
        date: Date.now(),
    }, { new: true })
        .then((history) => {
            if (!history) {
                res.status(404).json({
                    error: `A history with id ${req.params.id} does not exist.`,
                });
            }
            res.status(200).json(history);
        })
        .catch((e) => next(e));
});

// Gets history using UserId from mongodb
historyRouter.get("/user/:userId", async (req: Request, res: Response) => {
    if (req.headers.role !== Role.Admin) {
        res.status(401).json({ error: "Only admins are allowed to view history." });
        return;
    }
    History.find({ userIds: req.params.userId }).then((history) => {
        res.status(200).json(history);
    });
});

// Delete history from mongodb

