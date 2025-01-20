import { Request, Response } from "express";
import { TodoService } from "../services/todo";

const todoService = new TodoService();

export class TodoController {
  async getAll(req: Request, res: Response) {
    try {
      const todos = await todoService.findAll();
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch todos" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const todo = await todoService.findById(id);

      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }

      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch todo" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { title, color } = req.body;

      if (!title) {
        return res.status(400).json({ error: "Title is required" });
      }

      const todo = await todoService.create({ title, color });
      res.status(201).json(todo);
    } catch (error) {
      res.status(500).json({ error: "Failed to create todo" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { title, color, completed } = req.body;

      const todo = await todoService.update(id, {
        title,
        color,
        completed,
      });
      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: "Failed to update todo" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await todoService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete todo" });
    }
  }
}
