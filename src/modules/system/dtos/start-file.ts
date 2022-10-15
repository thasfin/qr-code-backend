export interface StartFileProps {
  filePath: string;
  fileType: 'utf-8';
  memoryTotal: number;
  memoryFree: number;
  memoryUsage: number;
  uptime: number;
}

export interface StartLogProps {
  filePath: string;
  fileType: 'utf-8';
}

export type FileType = 'utf-8';

export type StartFileResponse = {
  uptime: string;
  processMemoryUsage: string;
  memoryTotal: string;
  memoryFree: string;
};
