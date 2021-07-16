import { ServiceBroker } from 'moleculer';
import webhook from '../persistence/webhooks';
import network from '../utils/network';

const broker = new ServiceBroker();

broker.createService({
  name: 'webhooks',
  actions: {
    async register(ctx) {
      const exists = await webhook.doesExist({ url: ctx.params.targetUrl });
      if (exists !== -1) {
        return exists;
      }
      const hook = await webhook.create({ url: ctx.params.targetUrl });
      return hook;
    },
    async delete(ctx) {
      const res = await webhook.remove({ id: ctx.params.id });
      return res ? 200 : 404;
    },
    async update(ctx) {
      const res = await webhook.update({
        id: ctx.params.id,
        url: ctx.params.targetUrl,
      });
      return res ? 200 : 404;
    },
    async list() {
      return webhook.getAll();
    },
    async trigger(ctx) {
      const data = { ipAddress: ctx.params.ipAddress };
      const urls = await webhook.getAll();
      const ln = urls.length;
      const batchSize = 10;
      const batch = [];
      for (let i = 0; i < ln; i += batchSize) {
        const b = urls.slice(i, i + batchSize);
        batch.push(b);
      }

      for (let i = 0; i < batch.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await Promise.all(
          batch[i].map((d: { targetUrl: string }) => network.postWithRetries(d.targetUrl, data, 5)),
        );
      }
    },
  },
});

export default broker;
