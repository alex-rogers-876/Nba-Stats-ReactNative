import { values } from "mobx"
import { types, getParent, flow } from "mobx-state-tree"

export const Nba = types.model("Nba", {
    player_id: types.number,
    season_id: types.identifier(),
    league_id: types.string,
    team_id: types.number,
    team_abbreviation: types.string,
    player_age: types.number,
    gp: types.number,
    gs: types.number,
    min: types.number,
    fgm: types.number,
    fga: types.number,
    fg_pct: types.number,
    fg3m: types.number,
    fg3a: types.number,
    fg3_pct: types.number,
    ftm: types.number,
    fta: types.number,
    ft_pct: types.number,
    oreb: types.number,
    dreb: types.number,
    reb: types.number,
    ast: types.number,
    stl: types.number,
    blk: types.number,
    tov: types.number,
    pf: types.number,
    pts: types.number,
    photoUrl : types.optional(types.string, "")
})

export const NbaStore = types
    .model("NbaStore", {
        isLoading: true,
        nba: types.map(Nba),
        photoUrl: ""
    })
    .views(self => ({
        get shop() {
            return getParent(self)
        },
        get sortedAvailableNba() {
            return values(self.nba)
        }
    }))
    .actions(self => {
        function markLoading(loading) {
            self.isLoading = loading
        }
        function getPhoto(id){
            debugger
            var test = self.nba.get(id)
            self.nba.get(id).photoUrl = 'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/' + id + '.png'
        }
        function updateBooks(json) {
            debugger;
            values(self.nba).forEach(book => (book))
            json.forEach(bookJson => {
                debugger
                self.nba.put(bookJson)
            })
        }

        const loadBooks = flow(function* loadBooks(playerId) {
            try {
                const json = yield fetch("http://localhost:63486/api/nbastats/" +  playerId)
                debugger
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

