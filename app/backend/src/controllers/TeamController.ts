import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

const teamService = new TeamService();

const getAllTeams = async (_req: Request, res: Response) => {
  const allTeams = await teamService.getAllTeams();
  return res.status(200).json(allTeams);
};

const getTeamById = async (req:Request, res: Response) => {
  const { id } = req.params;
  const team = await teamService.getTeamById(Number(id));
  return res.status(200).json(team);
};

export { getAllTeams, getTeamById };
