import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import crypto from 'crypto';

function getKeys(): { privateKey: string; publicKey: string } {
  return {
    privateKey: process.env.PRIVATE_KEY,
    publicKey: process.env.PUBLIC_KEY,
  };
}

function sign(data, privateKey) {
  return crypto.sign(null, Buffer.from(data), privateKey);
}

function verify(data, signature, publicKey) {
  return crypto.verify(null, Buffer.from(data), publicKey, signature);
}

interface SignData {
  id: string;
  [key: string]: any;
}

@Controller('api/v1/sign')
export class SignController {
  @Post()
  signData(@Body() data: SignData) {
    if (!data.id) {
      throw new BadRequestException('Missing "id" for the device');
    }

    const dataString = JSON.stringify(data);
    const { privateKey, publicKey } = getKeys();

    const signature = sign(dataString, privateKey);
    console.log('signature :', signature.toString('base64'));

    const isValid = verify(dataString, signature, publicKey);
    console.log('signature is valid:', isValid);

    return { signature: signature.toString('base64') };
  }
}
