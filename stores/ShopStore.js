import { types, getEnv } from "mobx-state-tree"
import { BookStore } from "./BookStore"
import { CartStore } from "./CartStore"
import { ViewStore } from "./ViewStore"
import { NbaStore } from "./NbaStore"
import { TeamStore } from "./TeamStore"
import { PlayerStore } from "./PlayerStore"

export const ShopStore = types
    .model("ShopStore", {
        bookStore: types.optional(BookStore, {
            books: {}
        }),
        nbaStore: types.optional(NbaStore, {
            nba: {}
        }),
        playerStore: types.optional(PlayerStore, {
            players: {}
        }),
        teamStore: types.optional(TeamStore, {
            teams: {}
        }),
        cart: types.optional(CartStore, {
            entries: []
        }),
        view: types.optional(ViewStore, {})
    })
    .views(self => ({
        get fetch() {
            return getEnv(self).fetch
        },
        get alert() {
            return getEnv(self).alert
        },
        get isLoading() {
            return self.bookStore.isLoading
        },
        get books() {
            return self.bookStore.books
        },
        get teams() {
            return self.teamStore.teams
        },
        get players() {
            return self.playerStore.players
        },
        get sortedAvailableBooks() {
            return self.bookStore.sortedAvailableBooks
        },
        get sortedAvailableNba() {
            return self.playerStore.sortedAvailablePlayers
        },
        get getTeams(){
            debugger
            return self.teamStore.getTeams
        },
        get stats(){
            return self.nbaStore.sortedAvailableNba
        },

    }))
    .actions(self => ({
        afterCreate() {
            
            self.teamStore.loadBooks()
           
        },
         updatePlayers(teamId){
             debugger
             self.playerStore.loadBooks(teamId)
         },
         updatePlayerStats(playerId){
             self.nbaStore.loadBooks(playerId)
         }
    }))
