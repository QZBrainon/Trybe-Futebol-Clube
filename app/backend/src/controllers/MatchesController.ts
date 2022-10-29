import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

const matchesService = new MatchesService();

const getInProgressMatches = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  const strToBool = inProgress === 'true';
  const result = await matchesService.getInProgressMatches(strToBool);
  return res.status(200).json(result);
};

export default getInProgressMatches;
