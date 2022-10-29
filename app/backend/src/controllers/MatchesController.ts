import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

const matchesService = new MatchesService();

const getAllOrInProgressMatches = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  if (!inProgress) {
    const result = await matchesService.getAllMatches();
    return res.status(200).json(result);
  }
  const strToBool = inProgress === 'true';
  const result = await matchesService.getInProgressMatches(strToBool);
  return res.status(200).json(result);
};

export default getAllOrInProgressMatches;
