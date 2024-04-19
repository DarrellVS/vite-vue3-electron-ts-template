import { join } from 'path';

export const handleRequest = (channel: string, ...args: any[]) => {
  const path = channel.replaceAll(':', '/');

  // Import the correct module and run the default export
  return import(join(__dirname, path)).then((module) =>
    module.default(...args)
  );
};
