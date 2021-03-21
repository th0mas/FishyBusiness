import _ from "lodash";

const gameReducer = (state, event) => {
  switch (event.event) {
    case 'playing':
      return { ...state, playing: event.payload }
    case 'name-change':
      return { ...state, me: { ...state.me, name: event.payload } }
    case 'presence_state':
      let players = [];
      for (let key in event.payload) {
        players.push(event.payload[key].metas[0]);
      }
      return {
        ...state, lobby_players: players
      }
    case 'presence_diff':
      let p = [];
      for (let key in event.payload.joins) {
        p.push(event.payload.joins[key].metas[0]);
      }
      return {
        ...state, lobby_players: (state.lobby_players.concat(p))
      }
    case 'items_update':
      return { ...state, me: { ...state.me, items: event.payload } }
    case 'money_update':
      return { ...state, me: { ...state.me, money: event.payload } }
    case 'init_game':
      return { ...state, ...event.payload }
    case 'update_state':
      return Object.assign({}, _.merge(state, event.payload))
    case 'update_region_active':
      return {...state, regions: event.payload.regions}
    default:
      return state
  }
}

export default gameReducer;