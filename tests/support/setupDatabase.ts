import { execSync } from "child_process";

export async function setupDatabase() {
  if(process.env.CI === "true") {
    return
  }

  console.log("Setting up the database...")
  try {
    execSync("docker-compose up -d", { stdio: "inherit" });

    await healthCheck();

    execSync("npx prisma migrate deploy", { stdio: "inherit" });
  } catch (error) {
    console.log("ERROR:: ", error)
    process.exit(1)
  } finally {
    console.log("Database setup complete!")
  }
}

export async function teardownDatabase() {
  if(process.env.CI === "true") {
    return
  }

  console.log("Tearing down the database...")
  
  try {
    execSync("docker-compose down", { stdio: "inherit" });
  } catch (error) {
    console.log("ERROR:: ", error)
    process.exit(1)
  } finally {
    console.log("Database teardown complete!")
  }
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function healthCheck(retries = 5, interval = 2000) {
  while (retries > 0) {
    try {
      execSync("docker-compose exec db pg_isready -U postgres", { stdio: "inherit" });
      console.log("PostgreSQL is ready.");
      break;
    } catch (error) {
      retries -= 1;
      console.log("PostgreSQL is not ready yet. Retrying...");
      await sleep(interval);
    }
  }
}