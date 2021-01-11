import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  user_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ user_id, year, month }: IRequest): Promise<IResponse> {
    const apppointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id: user_id,
        year,
        month,
      },
    );

    return [{ day: 1, available: false }];
  }
}

export default ListProviderMonthAvailabilityService;
