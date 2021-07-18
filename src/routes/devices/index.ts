import { FastifyPluginAsync } from "fastify";
import { prisma } from "../../prisma/client";

const entries: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get<any>('/', async function (request, reply) {
    try {
      const devices = await prisma.device.findMany();
      reply.code(200).send(devices);
      return reply;
    } catch (err) {
      reply.internalServerError(JSON.stringify({ status: 'error: ' + err }));
      return reply;
    }
  });
}

export default entries;
