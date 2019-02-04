import { reasons, maxMisses } from "../constants";
import { areAllLetterSelected } from "../utilities";

// Actions
const START_GAME = "START_GAME";
const SELECT_LETTER = "SELECT_LETTER";

//Initial State
const initialState = {
  started: false,
  misses: 0,
  selectedLetters: [],
  currentReason: 0,
  allReasonsGuessed: false
};
// Action Creators
export function startGame() {
  return { type: START_GAME };
}

export function selectLetter(letter) {
  return { type: SELECT_LETTER, letter };
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case START_GAME:
      newState = { ...initialState };
      newState.started = true;
      return newState;
    case SELECT_LETTER:
      const letter = action.letter;
      newState = { ...state };
      // primer paso: añadir la letra a selected letters
      newState.selectedLetters = [...newState.selectedLetters, letter];
      // segundo paso: chequear si hay que incrementar misses
      //  si ha fallado ver si era su ultimo intento, si si ir a home
      if (reasons[newState.currentReason].indexOf(letter) === -1) {
        newState.misses++;
      }
      if (newState.misses >= maxMisses) {
        newState.started = false;
      }

      // tercer paso: chequear si ha acertado todas las letras de la razon actual
      //              si hay mas razones, ir a la siguiente
      //              si no hay mas razones ir a home
      let guessedWord = areAllLetterSelected(
        reasons[newState.currentReason],
        newState.selectedLetters
      );
      if (guessedWord) {
        if (newState.currentReason < reasons.length - 1) {
          newState.misses = 0;
          newState.selectedLetters = [];
          newState.currentReason++;
        } else {
          newState.allReasonsGuessed = true;
          newState.started = false;
        }
      }
      return newState;
    default:
      return state;
  }
}
