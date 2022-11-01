const query = `select team_name as name,
sum(if(home_team_goals<away_team_goals, 1, 0))*3 + 
sum(if(home_team_goals=away_team_goals, 1, 0)) as totalPoints,
count(home_team) as totalGames,
sum(if(home_team_goals<away_team_goals, 1, 0)) as totalVictories,
sum(if(home_team_goals=away_team_goals, 1, 0)) as totalDraws,
sum(if(home_team_goals>away_team_goals, 1, 0)) as totalLosses,
sum(away_team_goals) as goalsFavor,
sum(home_team_goals) as goalsOwn,
sum(away_team_goals-home_team_goals) as goalsBalance, 
ROUND((sum(if(home_team_goals<away_team_goals, 1, 0))*3 + 
sum(if(home_team_goals=away_team_goals, 1, 0)))/(count(away_team)*3)*100,2) as efficiency
from matches 
join teams on matches.away_team = teams.id
where in_progress=0 group by away_team
ORDER BY totalPoints desc, totalVictories desc, goalsBalance desc, goalsFavor desc, goalsOwn`;

export default query;
