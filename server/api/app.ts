import { use } from "nexus";
import { auth } from "nexus-plugin-jwt-auth";
import { prisma } from "nexus-plugin-prisma";
import { TEMP_APP_SECRET } from "./graphql/User";

use(
  auth({
    appSecret: TEMP_APP_SECRET,
  })
);
use(prisma());
