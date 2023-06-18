import mongoose, { Schema, Document } from 'mongoose';

export interface IClient extends Document {
  client_name: string;
  client_location: string;
}

const clientSchema: Schema<IClient> = new Schema<IClient>({
  client_name: String,
  client_location: String,
});

const Client = mongoose.model<IClient>('Client', clientSchema);

export default Client;
