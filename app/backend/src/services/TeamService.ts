import Teams from '../database/models/TeamModel';

export default class TeamService {
  constructor(private _model = Teams) {}

  async getAllTeams() {
    const allTeams = await this._model.findAll();
    return allTeams;
  }
}
