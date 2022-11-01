import sequelize = require('sequelize');
import IUpdateGoals from '../interfaces/IUpdateGoals';
import Teams from '../database/models/TeamModel';
import Matches from '../database/models/MatchModel';
import query from '../utils/homeLeaderBoardQuery';

export default class MatchesService {
  constructor(private _model = Matches) {}

  async getAllMatches() {
    const result = await this._model.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return result;
  }

  async getInProgressMatches(isInProgress:boolean) {
    const inProgressMatches = await this._model.findAll({
      where: {
        inProgress: isInProgress,
      },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return inProgressMatches;
  }

  async postMatches({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }: Matches) {
    const checkHomeTeam = await this._model.findOne({ where: { homeTeam } });
    const checkAwayTeam = await this._model.findOne({ where: { awayTeam } });
    if (checkHomeTeam && checkAwayTeam) {
      const result = await this._model.create({
        homeTeam,
        awayTeam,
        homeTeamGoals,
        awayTeamGoals,
        inProgress: true,
      });
      return result;
    }
    return 'There is no team with such id!';
  }

  async endMatch(id:number) {
    const result = await this._model.update({ inProgress: false }, { where: { id } });
    return result;
  }

  async updateGoals(id:number, { homeTeamGoals, awayTeamGoals }:IUpdateGoals) {
    const result = await this._model.update({
      homeTeamGoals,
      awayTeamGoals,
    }, { where: { id } });
    return result;
  }

  async getHomeLeaderboard() {
    const result = await this._model.sequelize?.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    console.log(result);

    return result;
  }
}
