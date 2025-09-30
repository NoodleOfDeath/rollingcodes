import axios from 'axios';
import ec from 'elliptic';

export type RewardClaim = {
  success?: boolean;
};

export const ADMOB_PKS = 'https://gstatic.com/admob/reward/verifier-keys.json';

export type AdmobPublicKey = {
  keyId: string; 
  pem: string;
  base64: string 
};

export class AdmobService {
  
  public static async acquirePublicKeys() {
    try {
      const res = await axios.get(ADMOB_PKS, { headers: { 'Content-Type': 'application/json' } });
      return (res.data as { keys: AdmobPublicKey[] }).keys.reduce((prev, curr) => ({
        ...prev,
        [curr.keyId]: curr,
      }), {} as Record<string, AdmobPublicKey>);
    } catch (e) {
      console.error(e);
    }
  }
  
  public static async verify(
    query: string,
    signature: string,
    key_id: string
  ) {
    try {
      const keys = await this.acquirePublicKeys();
      const base64Key = keys[key_id]?.base64;
      if (!base64Key) {
        console.log(key_id, keys);
        throw new Error('Unable to get key');
      }
      const publicKey = Buffer.from(base64Key, 'base64').toString('ascii');
      const ecdsa = new ec.ec('p256');
      const key = ecdsa.keyFromPublic(publicKey, 'pem');
      return { success: !!key?.verify(query, signature) };
    } catch (e) {
      console.error(e);
    }
  }
  
}