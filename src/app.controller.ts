import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { PayoutDto } from './Payout.dto';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get('payout')
  @Render('payout')
  getPayout() {
    return { errors: [] };
  }

  @Post('payout')
  postPayout(@Body() payoutDto: PayoutDto, @Res() response: Response) {
    const name = payoutDto.name;
    const accountNumber = payoutDto.accountNumber;
    const terms = payoutDto.terms;

    const regex = /^(\d{8}-\d{8}|\d{8}-\d{8}-\d{8})$/;

    const errors = []

    if (name.length < 1 || name == " ") {
      errors.push("Nincs név megadva.")
    }

    if (!regex.test(accountNumber)) {
      errors.push("Nem megfelelő kártya formátum.")
    }

    if (!terms) {
      errors.push("Nem fogadta el a szerződési feltételeket.")
    }

    if (errors.length > 0) {
      response.render('payout', { errors: errors })
    }
    else {
      response.redirect('/success')
    }
  }

  @Get('success')
  @Render('success')
  success() {
    return;
  }
}

