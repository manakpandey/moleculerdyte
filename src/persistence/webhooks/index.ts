import { Schema, model } from 'mongoose';

const webhookSchema = new Schema({
  targetUrl: String,
});

const WebhookModel = model('Webhook', webhookSchema);

interface webhook {
  url: string;
}

const doesExist = async ({ url }: webhook) => {
  const item = await WebhookModel.findOne({ targetUrl: url });
  if (item) {
    return item.id;
  }
  return -1;
};

const create = async ({ url }: webhook) => {
  const hook = new WebhookModel({ targetUrl: url });
  await hook.save();
  return hook.id;
};

const remove = async ({ id }: { id: string }) => {
  try {
    const q = await WebhookModel.findByIdAndDelete(id);
    return q;
  } catch (e) {
    return null;
  }
};

const update = async ({ id, url }: { id: string; url: string }) => {
  try {
    const q = await WebhookModel.findByIdAndUpdate(
      id,
      { targetUrl: url },
      { useFindAndModify: false },
    );
    return q;
  } catch (e) {
    return null;
  }
};

const getAll = async () => WebhookModel.find({});

export default {
  doesExist,
  create,
  remove,
  update,
  getAll,
};
