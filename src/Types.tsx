export type Player = {
  NAME: string,
  POSITION: string,
  SALARY: string
}
export type PlayerProj = {
  Name: string,
  Salary: number,
  Projection: number
}
export type DK = {
  NBA: ["PG","SG","SF","PF","C","G","F","UTIL"],
  NFL: ["QB","RB","WR","TE","Flex","DEF"]
}
export type FD = {
  NBA: ["PG","SG","SF","PF","C"],
  NFL: ["QB","RB","WR","TE","Flex","DEF"]
}
export type LineUp = {
  C: Array<PlayerProj>,
  PF: Array<PlayerProj>,
  SF: Array<PlayerProj>,
  SG: Array<PlayerProj>,
  PG: Array<PlayerProj>
}
export type LineUp2 = {
  C: Array<PlayerProj>,
  PF: Array<PlayerProj>,
  SF: Array<PlayerProj>,
  SG: Array<PlayerProj>,
  PG: Array<PlayerProj>,
  G: Array<PlayerProj>,
  F: Array<PlayerProj>,
  UTIL:Array<PlayerProj>
}

// export type LineUp2 = {
//   C: Array<PlayerProj>,
//   PF: Array<PlayerProj>,
//   SF: Array<PlayerProj>,
//   SG: Array<PlayerProj>,
//   PG: Array<PlayerProj>,
//   G: Array<PlayerProj>,
//   F: Array<PlayerProj>,
//   UTIL:Array<PlayerProj>
// }

