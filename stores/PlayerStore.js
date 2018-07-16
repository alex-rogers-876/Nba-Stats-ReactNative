import { values } from "mobx"
import { types, getParent, flow } from "mobx-state-tree"

export const Player = types.model("Player", {
    teamID: types.number,
    season: types.string,
    leagueID: types.string,
    player: types.string,
    num: types.string,
    position: types.string,
    height: types.string,
    weight: types.string,
    birth_date: types.string,
    age: types.number,
    exp: types.string,
    school: types.string,
    player_id: types.identifier(types.number),
    photoUrl : types.optional(types.string, "")
})

export const PlayerStore = types
    .model("PlayerStore", {
        isLoading: true,
        players: types.map(Player),
        photoUrl: ""
    })
    .views(self => ({
        get shop() {
            return getParent(self)
        },
        get sortedAvailablePlayers() {
            return values(self.players)
        }
    }))
    .actions(self => {
        function markLoading(loading) {
            self.isLoading = loading
        }
        function getPhoto(id){
            debugger
            var test = self.players.get(id)
            self.nba.get(id).photoUrl = 'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/' + id + '.png'
        }
        function updatePlayers(teamId){
            debugger
            try {
                const json =  self.shop.fetch("http://localhost:63486/api/players/" + teamId, {mode: 'cors'})
                debugger
                updateBooks(json)
                markLoading(false)
                

            } catch (err) {
                console.error("Failed to load books ", err)
            }
        }

        function updateBooks(json) {
            debugger;
            
            values(self.players).forEach(book => (book))
            json.forEach(bookJson => {
                bookJson.photoUrl = 'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/' + bookJson.player_id + '.png'
                self.players.put(bookJson)
            })
        }

        const loadBooks = flow(function* loadBooks(teamId) {
            try {
                self.players.clear()
                debugger
                const json = yield self.shop.fetch("http://localhost:63486/api/players/" + teamId, {mode: 'cors'})
                debugger
                updateBooks(json)
                markLoading(false)
                

            } catch (err) {
                console.error("Failed to load books ", err)
            }
        })

        return {
            updateBooks,
            loadBooks,
            updatePlayers
        }
    })

