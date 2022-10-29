import Matches from '../database/models/MatchModel';

export default interface IMatches extends Matches{
  id: number
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  teamHome: { teamName:string }
  teamAway: { teamName:string }
}
