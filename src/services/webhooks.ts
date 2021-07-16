import { ServiceBroker } from 'moleculer';
import webhook from '../persistence/webhooks';

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
      const res = await webhook.update({ id: ctx.params.id, url: ctx.params.targetUrl });
      return res ? 200 : 404;
    },
    async list() {
      interface IResp{
        id: string;
        targetUrl: string;
      }

      const res = await webhook.getAll();
      const resp:IResp[] = [];
      res.map((r:IResp) => resp.push((({ id, targetUrl }) => ({ id, targetUrl }))(r)));
      return resp;
    },
    trigger(ctx) {},
  },
});

export default broker;
