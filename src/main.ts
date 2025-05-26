import { web } from "./application/web";
import { logger } from "./application/logging";

const PORT = Number(process.env.PORT) || 3019;

web.listen(PORT, () => {
  logger.info(`Server listening on PORT: ${PORT}`)
})