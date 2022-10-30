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

const postMatches = async (req: Request, res: Response) => {
  try {
    const match = req.body;
    const result = await matchesService.postMatches(match);
    return res.status(201).json(result);
  } catch (e) {
    return res.status(500).send({ message: 'invalid body format' });
  }
};

const endMatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await matchesService.endMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  } catch (e) {
    res.status(500).send();
  }
};

export { getAllOrInProgressMatches, postMatches, endMatch };
