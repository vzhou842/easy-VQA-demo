// Returns a random integer in [min, max] INCLUSIVE (to match Python's randint()).
export function randint(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}
