import Cryptr from "cryptr";

export function encrypt(text: string | undefined) {
   const secretKey : string  = process.env.NEXTAUTH_SECRET ? process.env.NEXTAUTH_SECRET : "";
  const cryptr =  new Cryptr(secretKey);

  const encryptedString = text && cryptr.encrypt(text);
  return encryptedString; 
}

export function decrypt(encryptedString : string | undefined) {
    const secretKey : string  = process.env.NEXTAUTH_SECRET ? process.env.NEXTAUTH_SECRET : "";
   
    
    const cryptr : Cryptr  =  new Cryptr(secretKey);
  
    const text = encryptedString && cryptr.decrypt(encryptedString);
    
    return text;
  }