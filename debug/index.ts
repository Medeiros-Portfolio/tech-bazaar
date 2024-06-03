// import { PostgresMock } from "pgmock"

// (async () => {
//   try {
//     const pgmock = await PostgresMock.create()

//     pgmock.runShellCommand("CREATE DATABASE tech_bazaar")

//     const conn = await pgmock.listen(5432)
    
//     console.log("🚀 ~ conn:", conn)

//     process.on("SIGINT", () => pgmock.destroy())
//   } catch (error) {
//     console.log("🚀 ~ ; ~ error:", error)
//     process.exit(1)
//   }
// })()