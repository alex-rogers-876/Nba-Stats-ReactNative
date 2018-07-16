import { types, getParent } from "mobx-state-tree"

export const ViewStore = types
    .model({
        page: "books",
        selectedBookId: "",
        selectedTeamId: "",
        selectedPlayerId: ""
    })
    .views(self => ({
        get shop() {
            return getParent(self)
        },
        get isLoading() {
            return self.shop.isLoading
        },
        get currentUrl() {
            switch (self.page) {
                case "books":
                    return "/"
                case "book":
                    return "/book/" + self.selectedBookId
                case "cart":
                    return "/cart"
                case "nba":
                    return "/nba"
                case "teams":
                    return "/teams"
                case "team":
                    return "/team/" + self.selectedTeamId
                default:
                    return "/404"
            }
        },
        get selectedBook() {
            return self.isLoading || !self.selectedBookId
                ? null
                : self.shop.books.get(self.selectedBookId)
        },
        get selectedTeam() {
            debugger
            return self.isLoading || !self.selectedTeamId
                ? null
                : self.shop.teams.get(self.selectedTeamId)
        },
        get selectedPlayer() {
            debugger
            return self.isLoading || !self.selectedPlayerId
                ? null
                : self.shop.players.get(self.selectedPlayerId)
        }
    }))
    .actions(self => ({
        openBooksPage() {
            self.page = "books"
            self.selectedBookId = ""
        },
        openBookPage(book) {
            self.page = "book"
            self.selectedBookId = book.id
        },
        openBookPageById(id) {
            self.page = "book"
            self.selectedBookId = id
        },
        openTeamPagebyId(id){
            debugger
            self.page = "team"
            self.selectedTeamId =id
            self.shop.updatePlayers(self.selectedTeamId)
        },
        openCartPage() {
            self.page = "cart"
            self.selectedBookId = ""
        },
        openNbaPage() {
            self.page = "nba"
            self.selectedBookId = ""
        },
        openPlayerPage(player) {
            debugger
            self.page = "player"
            self.selectedPlayerId = player.player_id.toString()
            self.shop.updatePlayerStats(self.selectedPlayerId)
        },
        openTeamsPage() {
            self.page = "teams"
            self.selectedTeamId =""
        },
        openTeamPage(book) {
            debugger
            self.page = "team"
            self.selectedTeamId =book.TEAM_ID.toString()
            self.shop.updatePlayers(self.selectedTeamId)
        }
    }))
