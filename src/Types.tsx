export type Player = {
  "id": string,
  "position": string,
  "name": string,
  "salary": number,
  "projection": number,
  "value": number
}
export type Player2 = {
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
  [key: string]: Array<Player>
}