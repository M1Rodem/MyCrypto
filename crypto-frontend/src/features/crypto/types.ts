export type Mode = "encrypt" | "decrypt";

export interface CryptoState {
  text: string;
  key: string;
  result: string;
  mode: Mode;
  loading: boolean;
}