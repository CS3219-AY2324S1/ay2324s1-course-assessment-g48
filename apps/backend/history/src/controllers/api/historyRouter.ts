import { Router, NextFunction, Response } from "express";
import History from "../../models/History";
import { Role } from "../../models/enum/Role";
import { AuthenticatedRequest, jwtGuard } from "../../guard/jwtGuard";

export const historyRouter = Router();
    
// Creates or update history in mongodb
historyRouter.post("/", jwtGuard, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const body = req.body;
    const user = req.user;
    const { completed } = body;

    if (!Object.values(Role).includes(user?.role as Role)) {
        res.status(401).json({ error: "Only registered users are allowed to create history." });
        return;
    }
    const isExisting = await History.findOne({ sessionId: body.sessionId });

    if (isExisting) {
      await History.findOneAndUpdate({ sessionId: body.sessionId }, {
        $push: { completed: completed },
        date: Date.now(),
    }, { new: true })
        .then((history) => {
            console.log("Update history");
            res.status(200).json(history);
            return;
        })
        .catch((e) => next(e));
    } else {
    console.log(body);

    const history = new History({
        userIds: body.userIds,
        sessionId: body.sessionId,
        completed: body.completed,
        date: body.date,
    });
    history.save().then((savedHistory) => res.status(201).json(savedHistory))
        .catch((e) => next(e));
  }
});

// Gets all histories from mongodb
historyRouter.get("/", jwtGuard, async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;
    if (user?.role !== Role.Admin) {
        res.status(401).json({ error: "Only admins are allowed to view all histories." });
        return;
    }
    History.find({}).then((history) => {
        res.status(200).json(history);
    });
});

// Gets history from mongodb
historyRouter.get("/:id", jwtGuard, async (req: AuthenticatedRequest, res: Response) => {
    const { questionid } = req.headers;
    const user = req.user;
    console.log(questionid);
    if (!Object.values(Role).includes(user?.role as Role)) {
        res.status(401).json({ error: "Only registered users are allowed to view history." });
        return;
    }
    History.findById(req.params.id).then((history) => {
        if (!history) {
            res.status(404).json({
                error: `A history with id ${req.params.id} does not exist.`,
            });
            return;
        }
        if (questionid) {
            const data = history.completed.filter((element) => element.id === questionid)[0];
            if (!data) {
                res.status(404).json({ error: `A history with history question id ${questionid} does not exist.` });
                return;
            }
            res.status(200).json(data)
            return;
        }
        res.status(200).json(history);
    });
});

// Updates history in mongodb
historyRouter.put("/:id", jwtGuard, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const {  completed  } = req.body;
    const user = req.user;

    if (!Object.values(Role).includes(user?.role as Role)) {
        res.status(401).json({ error: "Only registered users are allowed to update history." });
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
historyRouter.get("/user/:userId", jwtGuard, async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;
    if (!Object.values(Role).includes(user?.role as Role)) {
        res.status(401).json({ error: "Only registered users are allowed to view their own history." });
        return;
    }
    History.find({ userIds: req.params.userId }).then((history) => {
        res.status(200).json(history);
    });
});

// Delete history from mongodb by id
historyRouter.delete("/:id", jwtGuard, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user?.role !== Role.Admin) {
        res.status(401).json({ error: "Only admins are allowed to delete history." });
        return;
    }
    History.findByIdAndDelete(req.params.id)
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

// Delete user's histories from mongodb
historyRouter.delete("/user/:userId", jwtGuard, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!Object.values(Role).includes(user?.role as Role)) {
        res.status(401).json({ error: "Only registered users are allowed to delete their own history." });
        return;
    }
    History.deleteMany({ userIds: req.params.userId })
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

// Gets history using sessionId from mongodb
historyRouter.get("/session/:sessionId", jwtGuard, async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;
    if (!Object.values(Role).includes(user?.role as Role)) {
        res.status(401).json({ error: "Only registered users are allowed to view their session history." });
        return;
    }
    History.find({ sessionId: req.params.sessionId }).then((history) => {
        res.status(200).json(history);
    });
});

