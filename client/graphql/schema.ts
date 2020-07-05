import { use, server } from "nexus";
import { auth } from "nexus-plugin-jwt-auth";
import { prisma } from "nexus-plugin-prisma";
import { TEMP_APP_SECRET } from "../graphql/User";

// use(cors({}))

use(
  auth({
    appSecret: TEMP_APP_SECRET,
  })
);
use(prisma());
