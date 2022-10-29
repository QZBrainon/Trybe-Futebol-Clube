import Teams from '../database/models/TeamModel';

export default class TeamService {
  constructor(private _model = Teams) {}

  async getAllTeams() {
    const allTeams = await this._model.findAll();
    return allTeams;
  }

  async getTeamById(id:number) {
    const team = await this._model.findOne({ where: { id } });
    return team;
  }
}
