import { FastifyPluginAsync } from "fastify";
import { prisma } from "../../prisma/client";

// const val = {
//   schema: {
//     body: {
//       type: 'object',
//       properties: {
//         // startDate: { type: 'date' },
//         // endDate: { type: 'date' },
//         deviceId: { type: 'number' },
//       },
//     }
//   }
// };

const entries: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get<any>('/', async function (request, reply) {
    try {
      let startDate: Date | undefined = undefined;
      let endDate: Date | undefined = undefined;
      let deviceId: number | undefined = undefined;

      if (request.body) {
        if (request.body.startDate) {
          startDate = request.body.startDate
        }
        if (request.body.endDate) {
          endDate = request.body.endDate
        }
        if (request.body.deviceId) {
          deviceId = request.body.deviceId
        }
      }

      const entries = await prisma.entry.findMany({ where: { deviceId, timestamp: { gte: startDate, lt: endDate } } });
      reply.code(200).send(entries);
      return reply;
    } catch (err) {
      reply.internalServerError(JSON.stringify({ status: 'error: ' + err }));
      return reply;
    }
  });
}

export default entries;
