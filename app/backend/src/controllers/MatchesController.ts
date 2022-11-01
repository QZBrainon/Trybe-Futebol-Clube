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
    if (match.homeTeam === match.awayTeam) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }
    const result = await matchesService.postMatches(match);
    if (result === 'There is no team with such id!') {
      res.status(404).json({ message: result });
    }
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

const updateGoals = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;
    await matchesService.updateGoals(Number(id), body);
    return res.status(200).json({ message: 'score updated' });
  } catch (e) {
    return res.status(500).send({ message: 'Could not update scores' });
  }
};

const getHomeLeaderboard = async (req: Request, res: Response) => {
  try {
    const result = await matchesService.getHomeLeaderboard();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).end();
  }
};
const getAwayLeaderboard = async (req: Request, res: Response) => {
  try {
    const result = await matchesService.getAwayLeaderboard();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).end();
  }
};

export {
  getAllOrInProgressMatches,
  postMatches,
  endMatch,
  updateGoals,
  getHomeLeaderboard,
  getAwayLeaderboard,
};
