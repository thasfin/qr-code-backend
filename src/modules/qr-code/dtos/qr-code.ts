export type options = {
  type?: types;
  errorCorrectionLevel?: errorCorrectionLevel;
  maskPattern?: maskPattern;
  version?: version;
  margin?: number;
  small?: boolean;
  width?: number;
  scale?: number;
  color?: { dark?: string; light?: string };
};

export type qrCodeBody = {
  text?: string;
  url?: string;
};

export type qrCodeRequest = {
  content: qrCodeBody;
  options?: options;
};
type types = 'png' | 'svg' | 'utf8';
type errorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
type maskPattern = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
type version =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40;
