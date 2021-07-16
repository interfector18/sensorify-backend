import AutoLoad from 'fastify-autoload';
import fastify from 'fastify';
// import * as fastifyAutoPush from 'fastify-auto-push';
// import fastifyHelmet from 'fastify-helmet';
// import fastifyCompress from 'fastify-compress';
// import fastifyGracefulShutdown from 'fastify-graceful-shutdown';
// import fs from 'fs';
import path from 'path';

const PORT = 3000;


async function main() {

  const app = fastify({
    logger: true,
  });

  // # Fastify tips
  // ## Promise/async/await resolution
  // > Warning: You can't return undefined.
  // - https://www.fastify.io/docs/latest/Routes/#promise-resolution
  // - https://www.fastify.io/docs/latest/Routes/#async-await

  // > AutoPush should be registered as the first in the middleware chain.
  // app.register(
  //   fastifyAutoPush.staticServe, {
  //     root: STATIC_DIR,
  //     prefix: PUBLIC_DIR,
  //   },
  // );

  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void app.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins')
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  void app.register(AutoLoad, {
    dir: path.join(__dirname, 'routes')
  })

  await app.listen(PORT, "0.0.0.0");
  console.log(`Listening on port ${PORT}`);
}

main().catch((err) => {
  console.error(err);
});
