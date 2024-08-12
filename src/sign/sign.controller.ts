import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import crypto from 'crypto';
import { DevicesService } from '../devices/devices.service';

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
  constructor(private readonly deviceService: DevicesService) {}

  @Post()
  async signData(@Body() data: SignData) {
    if (!data?.id) {
      throw new BadRequestException('Missing "id" for the device');
    }

    const device = await this.deviceService.findOne(data.id);

    if (device?.active) {
      return {
        status: 403,
        message: 'This device is activated!',
        data: {},
      };
    }

    const dataString = JSON.stringify(data);
    const { privateKey, publicKey } = getKeys();

    const signature = sign(dataString, privateKey);
    console.log('signature :', signature.toString('base64'));

    const isValid = verify(dataString, signature, publicKey);
    console.log('signature is valid:', isValid);

    return {
      status: 200,
      data: { signature: signature.toString('base64') },
      message: 'OK',
    };
  }
}
