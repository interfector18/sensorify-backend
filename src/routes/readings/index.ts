import { FastifyPluginAsync } from "fastify";
import { prisma, PrismaPromise } from "prisma/client";

const val = {
  schema: {
    body: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        key: { type: 'number' },
        values: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              value: { type: 'number' },
              timestamp: { type: 'number' }
            }
          }
        }
      },
    }
  }
};

const reading: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post<any>('/', val, async function (request, reply) {
    try {
      const devices = await prisma.device.findMany({ where: { name: request.body.deviceName, schoolName: request.body.schoolName }, take: 1 })
      if (devices.length) {
        const device = devices[0];
        const promises: PrismaPromise<any>[] = [];
        for (const val of request.body.values) {
          promises.push(prisma.entry.create({ data: { value: val.value, timestamp: new Date(val.timestamp * 1000).toISOString(), deviceId: device.id, sensorType: 'light' } }))
        }

        try {
          await prisma.$transaction(promises)
          reply.code(200).send({ status: 'ok' });
          return reply;
        } catch (err) {
          reply.code(500).send({ status: 'error writing entries ' + err });
          return reply;
        }

      } else {
        const device = await prisma.device.create({ data: { name: request.body.deviceName, schoolName: request.body.schoolName } });

        const promises: PrismaPromise<any>[] = [];
        for (const val of request.body.values) {
          promises.push(prisma.entry.create({ data: { value: val.value, timestamp: new Date(val.timestamp * 1000).toISOString(), deviceId: device.id, sensorType: 'light' } }))
        }

        try {
          await prisma.$transaction(promises)
          reply.code(200).send({ status: 'ok' });
          return reply;
        } catch (err) {
          reply.code(500).send({ status: 'error writing entries ' + err });
          return reply;
        }
      }

    } catch (err) {
      reply.internalServerError(JSON.stringify({ status: 'error: ' + err }));
      return reply;
    }
  });
}

export default reading;
