/*
		Rubik's Cube Scrambler <http://jnrbsn.github.io/rubiks-cube-scrambler/>
			Copyright (c) 2014 Jonathan Robson <jnrbsn@gmail.com>
			Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:
		The above copyright notice and this permission notice shall be included in
			all copies or substantial portions of the Software.
			THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
			FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
			OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
		THE SOFTWARE.
*/

const cube = {
  // Six faces of cube
  faces: "DLBURF",

  // History of all states in order to avoid repetition
  states: [],

  // Stores which stickers are part of the same layer and should move along with a face
  edges: {
    D: [46, 45, 44, 38, 37, 36, 22, 21, 20, 14, 13, 12],
    L: [24, 31, 30, 40, 47, 46, 0, 7, 6, 20, 19, 18],
    B: [26, 25, 24, 8, 15, 14, 6, 5, 4, 36, 35, 34],
    U: [18, 17, 16, 34, 33, 32, 42, 41, 40, 10, 9, 8],
    R: [28, 27, 26, 16, 23, 22, 4, 3, 2, 44, 43, 42],
    F: [30, 29, 28, 32, 39, 38, 2, 1, 0, 12, 11, 10]
  },

  // Sets cube to solved state
  reset: function() {
    cube.states = ["yyyyyyyyoooooooobbbbbbbbwwwwwwwwrrrrrrrrgggggggg"];
  },

  // Twist the cube according to a move in WCA notation
  twist: function(state, move) {
    let i,
      k,
      prevState,
      face = move.charAt(0),
      faceIndex = cube.faces.indexOf(move.charAt(0)),
      turns = move.length > 1 ? (move.charAt(1) === "2" ? 2 : 3) : 1;

    state = state.split("");

    for (i = 0; i < turns; i++) {
      prevState = state.slice(0);

      // Rotate stickers on face itself
      for (k = 0; k < 8; k++) {
        state[faceIndex * 8 + k] = prevState[faceIndex * 8 + ((k + 6) % 8)];
      }

      // Rotate adjacent stickers that are part of the same layer
      for (k = 0; k < 12; k++) {
        state[cube.edges[face][k]] = prevState[cube.edges[face][(k + 9) % 12]];
      }
    }

    return state.join("");
  },

  // Scramble the cube
  scramble: function() {
    let count = 0,
      total = 25,
      state,
      prevState = cube.states[cube.states.length - 1],
      move,
      moves = [],
      modifiers = ["", "'", "2"];
    while (count < total) {
      // Generate a random move
      move =
        cube.faces[Math.floor(Math.random() * 6)] +
        modifiers[Math.floor(Math.random() * 3)];
      // Don't move the same face twice in a row
      if (count > 0 && move.charAt(0) === moves[count - 1].charAt(0)) {
        continue;
      }
      // Avoid move sequences like "R L R", which is the same as "R2 L"
      if (
        count > 1 &&
        move.charAt(0) === moves[count - 2].charAt(0) &&
        moves[count - 1].charAt(0) ===
          cube.faces.charAt((cube.faces.indexOf(move.charAt(0)) + 3) % 6)
      ) {
        continue;
      }

      state = cube.twist(prevState, move);
      if (cube.states.indexOf(state) === -1) {
        // If this state hasn't yet been encountered, save it and move on
        moves[count] = move;
        cube.states[count] = state;
        count++;
        prevState = state;
      }
    }
    return moves;
  }
};

function generateScramble() {
  cube.reset();
  let i,
    scramble = cube.scramble(),
    len = scramble.length,
    result = "";

  for (i = 0; i < len; i += 5) {
    result += scramble.slice(i, i + 5).join(" ") + " ";
  }

  return result;
}

export default generateScramble;
