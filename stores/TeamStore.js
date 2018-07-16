import { values } from "mobx"
import { types, getParent, flow } from "mobx-state-tree"
import customData from '../public/team.json';
export const Team = types.model("Team", {
    TEAM_ID: types.identifier(types.number),
    TEAM_NAME: types.string,
    Abbreviation:types.string,
    photoUrl : types.optional(types.string, "")
})

export const TeamStore = types
    .model("TeamStore", {
        isLoading: true,
        teams: types.map(Team)
    })
    .views(self => ({
        get shop() {
            return getParent(self)
        },
        get getTeams() {
            return values(self.teams)
        }
    }))
    .actions(self => {
        function markLoading(loading) {
            self.isLoading = loading
        }
        function getPhoto(id){
          //  debugger
           // var test = self.nba.get(id)
           // self.nba.get(id).photoUrl = 'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/' + id + '.png'
        }
        function updateBooks(json) {
            
            values(self.teams).forEach(team => (team))
            json.forEach(teamJson => {

                teamJson.photoUrl = 'https://stats.nba.com/media/img/teams/logos/' + teamJson.Abbreviation + '_logo.svg'
                self.teams.put(teamJson)
            })
        }

        const loadBooks = flow(function* loadBooks() {
            try {
                debugger
                const json =  customData
                
                updateBooks(json)
                markLoading(false)
                

            } catch (err) {
                console.error("Failed to load books ", err)
            }
        })

        return {
            updateBooks,
            loadBooks
            
        }
    })

