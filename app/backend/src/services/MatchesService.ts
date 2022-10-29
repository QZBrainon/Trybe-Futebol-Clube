// import Teams from '../database/models/TeamModel';
import Matches from '../database/models/MatchModel';

export default class MatchesService {
  constructor(private _model = Matches) {}

  async getInProgressMatches(isInProgress:boolean) {
    const inProgressMatches = await this._model.findAll({
      where: {
        inProgress: isInProgress,
        include: 'teamHome',
      },
    });
    return inProgressMatches;
  }
}
