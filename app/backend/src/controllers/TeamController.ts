import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

const teamService = new TeamService();

const getAllTeams = async (_req: Request, res: Response) => {
  const allTeams = await teamService.getAllTeams();
  return res.status(200).json(allTeams);
};

export default getAllTeams;
