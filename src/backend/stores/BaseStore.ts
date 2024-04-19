import { BaseStoreState } from '../../types/stores';
import { join } from 'path';
import fs from 'fs';

export class BaseStore<T extends BaseStoreState> {
  #name: string;

  constructor(name: string) {
    this.#name = name;

    this.createFileIfNotExists();
  }

  private get filePath() {
    return join(__dirname, `files/${this.#name}.json`);
  }

  private createFileIfNotExists() {
    if (!fs.existsSync(join(__dirname, 'files'))) {
      fs.mkdirSync(join(__dirname, 'files'));
    }

    if (fs.existsSync(this.filePath)) return false;

    fs.writeFileSync(this.filePath, '{}');
    return true;
  }

  private readFileAsync(): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, (err, data) => {
        if (err) reject(err);
        resolve(data.toString());
      });
    });
  }

  private writeFileAsync(data: string) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.filePath, data, (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  private async getFromFile() {
    const state = await this.readFileAsync();
    if (!state) throw new Error(`Invalid state file for ${this.#name}`);

    return JSON.parse(state) as T;
  }

  public async get() {
    return await this.getFromFile();
  }

  public async update(partialState: Partial<T>) {
    const state = await this.getFromFile();
    const newState = { ...state, ...partialState };

    await this.writeFileAsync(JSON.stringify(newState));
  }

  public async set(state: T) {
    await this.writeFileAsync(JSON.stringify(state));
  }
}
